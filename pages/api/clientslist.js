const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');


export default async function getClientsList( req,res)
   {
    const db = await sqlite.open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
      })
  
    if (req.method === 'GET') {
        const clientsList = await db.all('SELECT * FROM clients ');
        res.json(clientsList);
        
    }


   
  
  }

 
