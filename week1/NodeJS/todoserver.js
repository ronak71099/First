const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs/promises');

app.use(bodyParser.json());
let todos = [];
async function getData(){
    try{
        const data = await fs.readFile('./todos.json','utf-8');
        todos = JSON.parse(data);
        console.log(todos);
    }catch{
        todos = [];
    }
    
}
// getData();

async function saveData(){
    await fs.writeFile('./todos.json',JSON.stringify(todos,null,2));
}
app.use(async(res,req,next)=>{
    await getData();
    next();
})

app.get('/todos',async(req,res)=>{
    // await getData();
    res.json(todos);
})
app.post('/todos',(req,res)=>{
    const newData = {};
    newData.id = todos.length+1;
    newData.title = req.body.title;
    newData.description = req.body.description;
    todos.push(newData);
    saveData();
    res.json({id:newData.id});
})
app.get('/todos/:id',(req,res)=>{

    const id = parseInt(req.params.id);
    const todo = todos.find((todo)=> todo.id===id);
    if(todo){
        res.status(202).json(todo);
    }
    else{
        res.status(404).json("Error 404");
    }
})
app.put('/todos/:id',(req,res)=>{
    const getId = parseInt(req.params.id);
    const index = todos.findIndex((todo)=> todo.id===getId);
    if(index!==-1){
        todos[index]={
            id:getId,
            title:req.body.title,
            description:req.body.description
        }
        saveData();
        res.status(202).json("updated");
    }
    else{
        res.status(404).json("error 404");
    }
})
app.delete('/todos/:id',(req,res)=>{
    const getId = parseInt(req.params.id);
    const index = todos.findIndex((todo)=> todo.id===getId);
    if(index!==-1){
        todos.splice(index,1);
        saveData();
        res.status(202).json("remove completed");
    }
    else{
        res.status(404).json("error 404");
    }
})
app.listen('3000',()=>{
    console.log("running port 3000")
})
