const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


export default async function getOrderDetails( req,res)
   {
    console.log('przyjęto zgłoszenie, numer zamówienia : ')
    console.log(req.query.id)

    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
      })
      console.log('przyjęto złoszenie o zamówienie o nr ********* ')
     
      console.log(req.query.id)
  
    if (req.method === 'GET') {
      console.log('to zgłoszenie GET ')

      try {
        
        const orderDetails = await db.get(`SELECT * FROM orders WHERE id=${req.query.id}  `);
        console.log('pobrano z bazy   ')
        res.json(orderDetails);
        
      } catch (error) {
        console.log("błąd przy pobieraniu z bazy ")
        console.log(error)
        res.json(error);
      }
 
        
        
    }

 
   
  
  }

 
