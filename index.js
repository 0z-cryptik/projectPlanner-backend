const express = require("express");
const app = express();

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.get("/api/first", (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
});
