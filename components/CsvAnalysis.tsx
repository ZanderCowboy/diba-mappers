import React, { useEffect, useState } from "react";

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// Read from environment variables
const GEMINI_API_KEY = ((import.meta as any).env?.VITE_GEMINI_API_KEY || "" ||         (process.env.API_KEY as string | undefined) ||
(process.env.GEMINI_API_KEY as string | undefined));

const GUARDRAIL = `
You are a strict CSV analyst. Use ONLY the attached CSV data.
Do NOT use outside knowledge.
If an answer cannot be derived strictly from the CSV, reply with: NOT_FOUND.
When giving numeric results, reference the rows used (SOE name + Year/Quarter).
Return JSON only.
`;

// Safer UTF-8 → Base64 in the browser
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

async function generateFromCSV({
  apiKey,
  question,
  csvText,
}: {
  apiKey: string;
  question: string;
  csvText: string;
}) {
  const csvB64 = utf8ToBase64(csvText);

  const body = {
    generationConfig: { temperature: 0 },
    contents: [
      {
        role: "user",
        parts: [
          { text: GUARDRAIL },
          {
            inline_data: {
              mime_type: "text/csv",
              data: csvB64,
            },
          },
          {
            text:
              `Question: ${question}\n` +
              `Respond as JSON with fields: { "answer": <string|number|array|object>, ` +
              `"used_rows": [ { "SOE name": string, "Year/Quarter": string } ] }`,
          },
        ],
      },
    ],
  };

  const res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  const parts: Array<{ text?: string }> =
    data?.candidates?.[0]?.content?.parts ?? [];
  const raw = parts.map((p) => p.text ?? "").join("");

  // Try to parse JSON. If model returns extra text, attempt to extract JSON block.
  try {
    return JSON.parse(raw);
  } catch {
    // naive fallback: attempt to find first {...} block
    const firstCurly = raw.indexOf("{");
    const lastCurly = raw.lastIndexOf("}");
    if (firstCurly >= 0 && lastCurly > firstCurly) {
      const maybeJson = raw.slice(firstCurly, lastCurly + 1);
      return JSON.parse(maybeJson);
    }
    // If still not JSON, return as plain text
    return raw;
  }
}

type InsightTemplate = {
  label: string;
  question: string;
};

const PRESETS: InsightTemplate[] = [
  {
    label: "Overspending Report",
    question:
      'For each SOE and quarter, list rows where overspending="Yes" with overspending_amount, and total overspending per SOE.',
  },
  {
    label: "Top Operating Margins",
    question:
      "For 2022/Q1–2023/Q3, return top 3 quarters by Operating margin per SOE as a JSON table.",
  },
  {
    label: "Financial Anomalies",
    question:
      "Find anomalies where Operating margin < 0 while Revenue generated increased vs previous quarter for the same SOE, or Governance score <= 2 AND Government bailouts=Yes. Explain briefly.",
  },
  {
    label: "Eskom Trend Analysis",
    question:
      "For Eskom, return chart-ready JSON array of { 'Year/Quarter', 'Actual spending', 'Revenue generated', 'Operating margin' }.",
  },
  {
    label: "Tariff & Bailouts",
    question:
      "Show all rows where Tariff changes >= 6 and Government bailouts=Yes, grouped by SOE.",
  },
];

export const CsvAnalysis: React.FC = () => {
  const [question, setQuestion] = useState<string>(
    "Which SOEs overspent each quarter? Include overspending_amount."
  );
  const [csvText, setCsvText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  // Load default CSV from /public on mount
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("/soe_financials.csv");
        if (resp.ok) {
          const txt = await resp.text();
          setCsvText(txt);
        }
      } catch {
        // ignore if not found; user can upload instead
      }
    })();
  }, []);

  async function onAsk(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!GEMINI_API_KEY) {
      setError("API key not configured.");
      return;
    }
    if (!csvText.trim()) {
      setError("CSV is empty. Load or upload a CSV first.");
      return;
    }
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    try {
      setLoading(true);
      const out = await generateFromCSV({ apiKey: GEMINI_API_KEY, question, csvText });
      setResult(out);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  function formatNumberMaybe(value: any) {
    if (typeof value === "number") return value.toLocaleString();
    const asNum = Number(value);
    if (!Number.isNaN(asNum) && value !== "") return asNum.toLocaleString();
    return String(value);
  }

  function formatRand(value: any) {
    const formatted = formatNumberMaybe(value);
    // Only prefix if it actually formatted as number-like
    if (/^\d{1,3}(,\d{3})*(\.\d+)?$/.test(formatted)) return `R${formatted}`;
    return formatted;
  }

  function renderKeyValueLine(obj: Record<string, any>) {
    // Domain-specific phrasing for common SOE rows
    const hasSOE = obj["SOE name"]; 
    const overspend = obj["overspending_amount"] ?? obj["Overspending amount"] ?? obj["overspending amount"];
    if (hasSOE && overspend != null) {
      return `${obj["SOE name"]} overspent by ${formatRand(overspend)}`;
    }

    const entries = Object.entries(obj)
      .filter(([k, v]) => v !== null && v !== undefined && v !== "")
      .map(([k, v]) => `${k}: ${formatNumberMaybe(v)}`);
    return entries.join(" · ");
  }

  function renderFriendly(answer: any): React.ReactNode {
    if (answer == null) return null;

    // Strings or numbers
    if (typeof answer === "string" || typeof answer === "number") {
      return <p className="text-blue-100">{String(answer)}</p>;
    }

    // Arrays of primitives or objects
    if (Array.isArray(answer)) {
      return (
        <ul className="list-disc pl-5 space-y-1 text-blue-100">
          {answer.map((item, idx) => (
            <li key={idx} className="break-words">
              {typeof item === "object" && item !== null
                ? renderKeyValueLine(item as Record<string, any>)
                : String(item)}
            </li>
          ))}
        </ul>
      );
    }

    // Objects – try to detect grouping by quarter or other keys
    if (typeof answer === "object") {
      const keys = Object.keys(answer as Record<string, any>);
      const looksGrouped = keys.some((k) => /Q\d|\d{4}\//.test(k));
      if (looksGrouped) {
        return (
          <div className="space-y-4">
            {keys.map((groupKey) => {
              const groupVal: any = (answer as any)[groupKey];
              return (
                <div key={groupKey}>
                  <div className="text-white font-semibold mb-1">{groupKey}</div>
                  {Array.isArray(groupVal) ? (
                    <ul className="list-disc pl-5 space-y-1 text-blue-100">
                      {groupVal.map((row: any, idx: number) => (
                        <li key={idx} className="break-words">
                          {typeof row === "object" && row !== null
                            ? renderKeyValueLine(row)
                            : String(row)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-blue-100">{String(groupVal)}</p>
                  )}
                </div>
              );
            })}
          </div>
        );
      }

      // Generic object rendering
      return (
        <div className="space-y-2">
          {keys.map((k) => (
            <div key={k}>
              <div className="text-white font-semibold">{k}</div>
              <div className="text-blue-100">
                {typeof (answer as any)[k] === "object"
                  ? renderFriendly((answer as any)[k])
                  : String((answer as any)[k])}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <pre className="text-blue-200 text-sm whitespace-pre-wrap">{String(answer)}</pre>;
  }

  return (
    <div className="bg-[#1F2937] p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">CSV Financial Analysis</h2>
      <p className="text-gray-400 mb-6">
        Analyze your financial data with AI-powered insights. Upload a CSV file or use the default SOE data.
      </p>

      <form onSubmit={onAsk} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Analysis Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-[#283447] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Ask a question about your financial data..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quick Analysis Templates
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setQuestion(p.question)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                title={p.question}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            CSV Data
          </label>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            rows={8}
            spellCheck={false}
            className="w-full px-4 py-2 bg-[#283447] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white font-mono text-sm"
            placeholder="Paste your CSV data here or upload a file..."
          />
        </div> */}

        {/* <div>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const text = await file.text();
              setCsvText(text);
            }}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div> */}

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze Data"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <pre className="text-red-300 text-sm whitespace-pre-wrap">{error}</pre>
        </div>
      )}

      {result != null && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-white mb-3">Analysis Results</h3>
          <div className="bg-[#0b1220] p-4 rounded-lg">
            <div className="space-y-2">
              {renderFriendly((result as any)?.answer ?? result)}
            </div>
          </div>
        </div>
      )}

      {/* <details className="mt-6">
        <summary className="text-gray-400 cursor-pointer hover:text-white">
          How CSV-only analysis works
        </summary>
        <div className="mt-2 text-sm text-gray-400 space-y-2">
          <p>• CSV data is attached to every request to ensure analysis is based only on your data</p>
          <p>• Strict guardrails prevent the AI from using external knowledge</p>
          <p>• Results include citations showing which rows were used for each answer</p>
          <p>• If data is insufficient, the system returns "NOT_FOUND"</p>
        </div>
      </details> */}
    </div>
  );
};
