const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fortunes = require('./data/fortunes');

const app=express();

//app.use(express.json()) 

//app.use(express.bodyParser.json());
app.use(bodyParser.json());

app.get('/fortunes',(req,res) =>{
    res.json(fortunes);
})

app.get('/fortunes/random',(req,res) =>{
    console.log('fortunes');
    const fortunes_random = Math.floor(Math.random()*fortunes.length);
    const random_fortunes = fortunes[fortunes_random];
    res.json(random_fortunes);
})

app.get('/fortunes/:id',(req,res) =>{
    //console.log(req.params);
    res.json(fortunes.find(f => f.id==req.params.id));
})
const writeFortunes = (json) => {
    fs.writeFile('./data/fortunes.json', JSON.stringify(json), err =>{
        console.log(err);
    })
}

app.post('/fortunes',(req,res) =>{
    console.log(req.body);
    const {message, lucky_number}= req.body;
    const fortunes_ids= fortunes.map(f =>f.id);
    const fortune={
        id: (fortunes_ids.length > 0 ? Math.max(...fortunes_ids) : 0 ) + 1,
        message,
        lucky_number
    }
    const new_fortunes=fortunes.concat(fortune);
    
    writeFortunes(new_fortunes);

    res.json(new_fortunes);
})

app.put('/fortunes/:id', (req,res) => {
    const {id} =req.params;
    //const{message, lucky_number}= req.body;
    const old_furtunes = fortunes.find(f => f.id == id);

    // If we need to update multiple fields then this is not advisable. 

    // if(message) old_furtunes.message =message;
    // if(lucky_number) old_furtunes.lucky_number = lucky_number;
    ['message', 'lucky_number'].forEach(key =>{
        if(req.body[key]) old_furtunes[key] = req.body[key];
    })

    // We used a helper function to reduce code length. :)
    // fs.writeFile('./data/fortunes.json', JSON.stringify(fortunes),err =>{
    //     console.log(err);
    // })
    writeFortunes(fortunes);

    res.json(fortunes)
})

app.delete('/fortunes/:id', (req,res) =>{
    const {id} = req.params;
    const new_fortunes = fortunes.filter(f => f.id !=id);

    writeFortunes(new_fortunes);
    res.json(new_fortunes);
})

module.exports =app;
//Doesnot workin my case on cmd 

//curl -H "Content-Type: application/json" -X POST -d '{"message": "working","lucky-number":1}' http://localhost:3000/fortunes