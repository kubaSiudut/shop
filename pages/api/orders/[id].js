const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
export default function functionfunkcjaTestowa(req,res) {
    res.json({field1: req.query.id, method:req.method})
}