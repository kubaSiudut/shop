import { verify } from "jsonwebtoken";
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

export default async function userProtectedData(req, res) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  if (req.method === "GET") {
    const secret = process.env.SECRET;
    const jwt = req.cookies.OursiteJWT;
    const user = verify(jwt, secret);
    console.log('próba zaciągnięcia listy zamówień !!!!!')
    console.log(user)

    const clientsData = await db.all(
      "SELECT * FROM orders WHERE email=? ",
      user.email
    );

    console.log('to są zamówienia !!!!!')
    console.log(clientsData)

    res
      .status(200)
      .json({ message: "To są dane użytkownika", body: clientsData });
  }
}
