const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

export default async function getOrdersList(req, res) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  if (req.method === "GET") {
    const ordersList = await db.all("SELECT * FROM products  ");
    console.log("mam req to są nasze produkty");
    console.log(ordersList);
    res.json(ordersList);
  }
}
