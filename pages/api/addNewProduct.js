import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
var mv = require("mv");
import * as jose from "jose";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
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

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      // console.log("fields, files pliki i pola *****")
      console.log(fields);
      // console.log(files.file.filepath)
      var oldPath = files.file.filepath;
      // var newPath = `./public/uploads/${files.file.originalFilename}`;
      const imgID = fields.name;
      var newPath = `./public/uploads/${imgID}`;
      mv(oldPath, newPath, function (err) {});

      try {
        console.log("zaczynam dodawac do Produktów ");
        const result = db.run(
          "INSERT INTO Products (neme, len, height, width, material, tooltip, price ) VALUES(?,?,?,?,?,?,?)",
          fields.name,
          fields.lenght,
          fields.height,
          fields.width,
          fields.material,
          fields.desc,
          fields.price
        );
        console.log("dodano produkt ");
      } catch (error) {
        console.log("jest  error");
        console.log(error);
      }

      res.status(200).json({ fields, files });
    });
  });

}
};
