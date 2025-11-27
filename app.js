import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// Serve index.html for root path
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});