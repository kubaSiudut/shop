const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
import * as jose from "jose";

export default async function updateOrderStatus(req, res) {

  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  const secret = process.env.SECRET;
  console.log(req.cookies.OursiteJWT);
  const jwt = req.cookies.OursiteJWT
  const { payload } = await jose.jwtVerify(
    jwt,
    new TextEncoder().encode(secret)
  );

  if (req.method === "PUT" && payload.sub ===1) {


    try {
        const result =await db.run("UPDATE orders SET orderStatus = ? WHERE id = ? ",
              req.body.status,
              req.body.id,
              )

              console.log("baza została zaktualizowan ")
              console.log(result)
    
    } catch (error) {
        console.log("jest  error")
        console.log(error)
    }
  }
}
