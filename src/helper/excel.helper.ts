export const toStringTrim = (obj: any): string | null =>
  obj ? obj.toString().trim() : null;

export function toStringImport(obj: any): string | null {
  // eslint-disable-next-line no-prototype-builtins
  if (typeof obj === 'object' && obj?.hasOwnProperty('richText')) {
    const text = obj?.richText.map((o) => o?.text).join('');
    return toStringTrim(text);
  }

  return toStringTrim(obj);
}
