import { NextRequest, NextResponse } from "next/server";

const supportedCurrencies = new Set(["USD", "KRW", "VND", "EUR"]);

type ExchangeResponse = {
  result: string;
  time_last_update_utc?: string;
  rates?: Record<string, number>;
};

export async function GET(request: NextRequest) {
  const from = (request.nextUrl.searchParams.get("from") ?? "USD").toUpperCase();
  const to = (request.nextUrl.searchParams.get("to") ?? "KRW").toUpperCase();

  if (!supportedCurrencies.has(from) || !supportedCurrencies.has(to)) {
    return NextResponse.json({ error: "Unsupported currency" }, { status: 400 });
  }

  if (from === to) {
    return NextResponse.json({ rate: 1, date: new Date().toISOString(), source: "identity" });
  }

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error("Exchange provider request failed");

    const data = (await response.json()) as ExchangeResponse;
    const rate = data.rates?.[to];
    if (data.result !== "success" || typeof rate !== "number") {
      throw new Error("Exchange rate unavailable");
    }

    return NextResponse.json({
      rate,
      date: data.time_last_update_utc ?? new Date().toISOString(),
      source: "ExchangeRate-API",
    });
  } catch {
    return NextResponse.json({ error: "Unable to load exchange rate" }, { status: 502 });
  }
}
