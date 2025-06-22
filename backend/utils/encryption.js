const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = process.env.SECRET_KEY || "12345678901234567890123456789012"; // 32 chars
const ivLength = 16;

function encrypt(text) {
	const iv = crypto.randomBytes(ivLength);
	const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
	let encrypted = cipher.update(text, "utf-8", "hex");
	encrypted += cipher.final("hex");
	return iv.toString("hex") + ":" + encrypted;
}

function decrypt(encryptedText) {
	const [ivHex, encrypted] = encryptedText.split(":");
	const iv = Buffer.from(ivHex, "hex");
	const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
	let decrypted = decipher.update(encrypted, "hex", "utf-8");
	decrypted += decipher.final("utf-8");
	return decrypted;
}

module.exports = { encrypt, decrypt };
