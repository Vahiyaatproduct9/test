import fs from "fs";
import express from "express";
const app = express();
app.use(express.json());

app.use((_, res, next) => {
  const originalData = res.json.bind(res);
  res.json = (data) => {
    const newData = {
      ...data,
      team: {
        frontend: "cool dev 1",
        backend: "cool dev 2",
        design: "Cool dev 3 lolo",
      },
    };
    return originalData(newData);
  };
  next();
});

app.get("/", async (req, res) => {
  const clientIpArray = req.ip.split(":");
  const ip = clientIpArray[clientIpArray.length - 1];
  fs.appendFile(
    "./log.txt",
    `Time: ${new Date().getDate()}, Client: ${ip}, Visited: ${req.path};\n`
  );
  res.json({
    message: "Heyy",
  });
});

app.listen(3000, () => {
  console.log("Heyy");
});
