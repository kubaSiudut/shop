const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const fs = require('fs');
import * as jose from "jose";

export default async function getOrdersList(req, res) {
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
 
  if (req.method === "POST" && payload.sub ===1) {

    req.body.map( async (el) =>{ 
     
      const name = await (db.get(`SELECT neme FROM products WHERE id= ?`,el))
      // console.log('plik do usunięcia 1 ')
      console.log(name)
      // const nameStr = name.neme 
      const path =  `./public/uploads/${name.neme }`

      console.log(path)
      try {

        fs.unlinkSync(path)
        //file removed
      } catch(err) {

        console.error(err)
      }
      await db.run("DELETE FROM products WHERE id=? ", el);})
 



    res.status(200).json({ message : 'OK' })
  }else{
    res.status(400).json({ message : 'NOK' })
  }
}
