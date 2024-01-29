const express = require('express');
const path = require('path');
const app = express();
const fs  = require('fs').promises;
const cors = require('cors');
app.use(cors());

// app.use(express.static('public'));
app.get('/files',async (req,res)=>{
    try{
    const data = await fs.readdir('./');
    res.status(200);
    res.json(data);
    }catch(err){
        console.log(err);
        res.send("internal server error");
    }
});
// app.get('/files/:filename',async (req,res)=>{
//     const {fileName} = req.params;
//     const filePath = path.join(__dirname,fileName);
//     try{
        
//         const Data = await fs.readFile(filePath,'utf-8');
//         res.status(200).send(Data);
//     // const data = fs.readdirSync('./');
//     // res.json(data);
//     }catch(err){
//         console.log(err);
//         res.send("internal  error");
//     }
// })


app.get('/files/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, filename);
  
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      res.status(200).send(fileContent);
    } catch (error) {
      if (error.code === 'ENOENT') {
        res.status(404).send('File not found');
      } else {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
  });



app.listen('3000',()=>{
    console.log('running port 3000');
})