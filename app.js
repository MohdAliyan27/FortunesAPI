const express = require('express');
const fortunes = require('./data/fortunes');

const app=express();

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

module.exports =app;