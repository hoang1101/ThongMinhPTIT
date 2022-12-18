const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const initRouter = require("./routes");
initRouter(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});

// //Import express.js module and create its variable.
// const express = require("express");
// const app = express();
// app.post("/chatbox", function callName(req, res) {
//   let { PythonShell } = require("python-shell");
//   var options = {
//     args: [req.query.data],
//   };
//   PythonShell.run("main.py", options, function (err, data) {
//     if (err)
//       res.status(500).json({
//         data: "Xin lỗi! Hiện tại chat bot đang quá tải",
//         success: false,
//       });

//     res.json({ data: data, success: true }).status(200);
//   });
// });
// const port = 8000;
// app.listen(port, () => console.log(`Server connected to ${port}`));
