import CryptoJS from "crypto-js";

const secretKey = "12345678901234567890123456789012"; // must be 32 characters (256-bit)

// Decrypt function (AES-256-CBC compatible with your backend)
export function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const key = CryptoJS.enc.Utf8.parse(secretKey);

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

