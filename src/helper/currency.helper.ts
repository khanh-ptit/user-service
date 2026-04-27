const CURRENCY_MAP = {
  VND: { locale: 'en-US', digits: 0 },
  USD: { locale: 'en-US', digits: 2 },
  JPY: { locale: 'en-US', digits: 0 },
  EUR: { locale: 'en-US', digits: 2 },
} as const;

function formatMoney(v: number, c: string) {
  const m = CURRENCY_MAP[c] ?? CURRENCY_MAP['VND'];
  const n = new Intl.NumberFormat(m.locale, {
    minimumFractionDigits: m.digits,
    maximumFractionDigits: m.digits,
  }).format(v);
  return `${n}`;
}

export const currencyHelper = {
  formatMoney,
};
