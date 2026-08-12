"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudRain, CloudSun, RefreshCw, Sun } from "lucide-react";

type WeatherData = {
  temperature: number;
  humidity: number;
  maximum: number;
  minimum: number;
  code: number;
};

type WeatherResponse = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

type RateResponse = {
  date: string;
  rate: number;
  source: string;
};
type WeatherLocationConfig = {
  key: string;
  name: string;
  latitude: number;
  longitude: number;
};

const currencies = [
  { code: "USD", label: "Đô la Mỹ" },
  { code: "KRW", label: "Won Hàn Quốc" },
  { code: "VND", label: "Đồng Việt Nam" },
  { code: "EUR", label: "Euro" },
] as const;
const defaultLocations: WeatherLocationConfig[] = [
  { key: "seoul", name: "Seoul", latitude: 37.5665, longitude: 126.978 },
  { key: "hoChiMinh", name: "Hồ Chí Minh", latitude: 10.8231, longitude: 106.6297 },
];

const currencySymbols: Record<string, string> = {
  USD: "$",
  KRW: "₩",
  VND: "₫",
  EUR: "€",
};

function WeatherIcon({ code }: { code: number }) {
  const className = "h-10 w-10 text-[#6aa6cc]";
  if (code === 0) return <Sun className={className} />;
  if (code <= 3) return code === 1 ? <CloudSun className={className} /> : <Cloud className={className} />;
  return <CloudRain className={className} />;
}

function WeatherLocation({ name, data }: { name: string; data?: WeatherData }) {
  return (
    <div>
      <h3 className="bg-[#e3f2ff] py-1.5 text-center text-xs text-[#0a5794]">Thời tiết {name}</h3>
      <div className="grid min-h-24 grid-cols-[44px_68px_1fr] items-center gap-1 p-3">
        {data ? <WeatherIcon code={data.code} /> : <Cloud className="h-10 w-10 animate-pulse text-[#6aa6cc]" />}
        <strong className="text-3xl font-normal text-[#f05a20]">
          {data ? `${Math.round(data.temperature) > 0 ? "+" : ""}${Math.round(data.temperature)}°` : "--°"}
        </strong>
        <div className="text-[11px] leading-5">
          <p>Cao nhất: {data ? `${Math.round(data.maximum)}°` : "--"}</p>
          <p>Thấp nhất: {data ? `${Math.round(data.minimum)}°` : "--"}</p>
          <p>Độ ẩm: {data ? `${Math.round(data.humidity)}%` : "--"}</p>
        </div>
      </div>
    </div>
  );
}

async function fetchWeather(latitude: number, longitude: number): Promise<WeatherData> {
  const query = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "1",
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${query}`);
  if (!response.ok) throw new Error("Weather request failed");
  const result = (await response.json()) as WeatherResponse;
  return {
    temperature: result.current.temperature_2m,
    humidity: result.current.relative_humidity_2m,
    maximum: result.daily.temperature_2m_max[0],
    minimum: result.daily.temperature_2m_min[0],
    code: result.current.weather_code,
  };
}

export function LiveTravelWidgets({ locations = defaultLocations }: { locations?: WeatherLocationConfig[] }) {
  const [weather, setWeather] = useState<Record<string, WeatherData>>({});
  const [weatherError, setWeatherError] = useState(false);
  const [amount, setAmount] = useState("100.00");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("KRW");
  const [exchange, setExchange] = useState<{
    rate?: number;
    date: string;
    loading: boolean;
    error: boolean;
  }>({ date: "", loading: true, error: false });

  useEffect(() => {
    let active = true;
    Promise.all(locations.map((location) => fetchWeather(location.latitude, location.longitude)))
      .then((results) => {
        if (!active) return;
        setWeather(Object.fromEntries(locations.map((location, index) => [location.key, results[index]])));
      })
      .catch(() => active && setWeatherError(true));
    return () => {
      active = false;
    };
  }, [locations]);

  useEffect(() => {
    let active = true;
    setExchange((current) => ({ ...current, rate: undefined, loading: true, error: false }));
    if (from === to) {
      setExchange({ rate: 1, date: new Date().toISOString().slice(0, 10), loading: false, error: false });
      return () => {
        active = false;
      };
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    fetch(`/api/exchange?from=${from}&to=${to}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Rate request failed");
        return response.json() as Promise<RateResponse>;
      })
      .then((result) => {
        if (!active) return;
        const parsedRate = Number(result.rate);
        if (!Number.isFinite(parsedRate)) throw new Error("Invalid exchange rate");
        setExchange({ rate: parsedRate, date: result.date, loading: false, error: false });
      })
      .catch(() => active && setExchange({ date: "", loading: false, error: true }))
      .finally(() => window.clearTimeout(timeout));
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [from, to]);

  const numericAmount = Number(amount.replaceAll(",", "")) || 0;
  const converted = exchange.rate === undefined ? undefined : numericAmount * exchange.rate;
  const formattedDate = new Intl.DateTimeFormat("vi-VN", { month: "long", day: "numeric" }).format(new Date());

  return (
    <>
      <section className="overflow-hidden rounded-xl border-2 border-[#1187db] bg-card shadow-[0_8px_25px_rgba(30,26,20,0.05)]">
        <div className="bg-[#1187db] py-1.5 text-center text-xs text-white">Thời tiết, {formattedDate}</div>
        <div className="divide-y-2 divide-[#1187db]">
          {locations.map((location) => <WeatherLocation key={location.key} name={location.name} data={weather[location.key]} />)}
        </div>
        {weatherError && <p className="bg-red-50 px-3 py-2 text-center text-[10px] text-red-600">Không tải được thông tin thời tiết.</p>}
      </section>

      <section className="overflow-hidden bg-[#08047d] text-white shadow-[0_8px_25px_rgba(30,26,20,0.16)]">
        <h3 className="border-b border-white/20 py-4 text-center text-base font-semibold">Công cụ đổi tiền</h3>
        <div className="space-y-2 p-4">
          <label className="flex h-11 items-center justify-between border border-white/25 px-3">
            <span className="sr-only">Số tiền</span>
            <span className="mr-0.5 text-sm">{currencySymbols[from]}</span>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="button"
              aria-label="Đổi chiều tiền tệ"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              className="p-1 transition-transform hover:rotate-180"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </label>

          <select value={from} onChange={(event) => setFrom(event.target.value)} className="h-11 w-full border border-white/25 bg-[#08047d] px-3 text-sm outline-none">
            {currencies.map((currency) => <option key={currency.code} value={currency.code}>{currency.code} - {currency.label}</option>)}
          </select>
          <select value={to} onChange={(event) => setTo(event.target.value)} className="h-11 w-full border border-white/25 bg-[#08047d] px-3 text-sm outline-none">
            {currencies.map((currency) => <option key={currency.code} value={currency.code}>{currency.code} - {currency.label}</option>)}
          </select>

          <p className="min-h-14 py-3 text-center text-xl font-semibold">
            {exchange.error
              ? "Không tải được tỷ giá."
              : exchange.loading
                ? "Đang tính…"
                : `${new Intl.NumberFormat("vi-VN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(converted ?? 0)} ${to === "KRW" ? "won" : to}`}
          </p>
        </div>
        <div className="flex justify-between border-t border-white/20 px-4 py-3 text-[10px] text-white/70">
          <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer">ExchangeRate-API</a>
          <span>{exchange.date || "Tỷ giá mới nhất"}</span>
        </div>
      </section>
    </>
  );
}
