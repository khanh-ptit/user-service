import { customAlphabet } from 'nanoid';

export const isJson = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

let generateStringFn: (() => string) | null = null;

export async function generateString() {
  if (!generateStringFn) {
    // Dùng dynamic import để hỗ trợ ESM package
    const alphabet =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    generateStringFn = customAlphabet(alphabet, 12);
  }

  return generateStringFn();
}
