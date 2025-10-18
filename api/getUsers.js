import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const ADMIN_KEY = process.env.ADMIN_KEY;
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token || token !== ADMIN_KEY) {
    return res.status(403).json({ message: "❌ Akses ditolak! Token Authorization salah atau kosong." });
  }

  try {
    // 🔥 Path absolut ke users.json
    const filePath = path.join(process.cwd(), "user.json");
    const data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data);
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: "❌ Gagal membaca users.json: " + err.message });
  }
}
