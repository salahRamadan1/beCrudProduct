const express = require("express");
const app = express();
const core = require("cors");
app.use(core());
app.use(express.json());

const q = require("./databas/databas")

app.use("./services/add.js")

app.get("/getProduct", (req, res) => {
  q.execute(`select * from product`, (err, result) => {
    res.json({ message: "success", product: result });
  });
});

// post product
app.post("/addProduct", (req, res) => {
  const { name, price, description } = req.body;
  q.execute(
    `insert into product (name,price,description) values('${name}' , ${price} , '${description}')`
  );
  res.json({ message: "success" });
})
// update product
app.put("/update", (req, res) => {
  const { name, price, description, id } = req.body;
  q.execute(
    `update product set name='${name}' , price= '${price}' ,description= '${description}'   where id = ${id}`
  );
  res.json({ message: "success" });
});
// delete product
app.delete("/deletePro", (req, res) => {
  const { id } = req.body;
  q.execute(`delete from product where id =${id}`);
  res.json({ message: "success" });
});

/*********/
app.listen(5000, () => {
  console.log("running");
});
