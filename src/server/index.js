import express from "express";
import render from "./render";
import proxy from "express-http-proxy";
import { PORT } from "../utils/config";

const app = express();
app.use(express.static("public"));
app.use(
  "api",
  proxy(`http://localhost:${PORT}`, {
    proxyReqOptDecorator: (req) => `/api${req.url}`,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  next();
});

app.get("/api/getSchoolList", (req, res) => {
  let schoolList = [
    { id: 1, name: "动物大学" },
    { id: 2, name: "植物大学" },
    { id: 3, name: "建筑大学" },
    { id: 4, name: "服装大学" },
  ];
  return res.json({ schoolList });
});

app.get("*", (req, res) => {
  render(req, res);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
});
