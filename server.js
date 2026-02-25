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

  db.run(sql, [name, email, date, message], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ success: true, bookingId: this.lastID });
  });
});

// Get all bookings (admin)
app.get("/api/bookings", (req, res) => {
  db.all(`SELECT * FROM bookings ORDER BY id DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});