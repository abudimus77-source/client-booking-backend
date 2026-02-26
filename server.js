const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Create booking
app.post("/api/book", (req, res) => {
  const { name, email, date, message } = req.body;

  const sql = `INSERT INTO bookings (name, email, date, message) VALUES (?, ?, ?, ?)`;

  const stmt = db.prepare(sql);
const info = stmt.run(name, email, date, message);

res.json({ success: true, bookingId: info.lastInsertRowid });
});

// Get all bookings (admin)
app.get("/api/bookings", (req, res) => {
  const rows = db.prepare("SELECT * FROM bookings ORDER BY id DESC").all();
res.json(rows);
  });


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});