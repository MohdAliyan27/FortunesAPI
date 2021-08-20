const http = require('http')
const hostname='localhost';
const port=3000;

const server = http.createServer((req,res) =>{
    //res.write("Hello there are many ways to do things.");
    const {url} =req;
    //console.log(req);
    console.log(url);
    if(url==='/hello'){
        //res.end('Hello in URL');
        const data={
            1:"one",
            2:"two",
            3:"three"
        }
        res.setHeader('Content-Type','application/json');
        res.write(JSON.stringify(data));
        res.end();
    }
})

server.listen(port,hostname,() =>{
    console.log(`Server started ${hostname}:${port}`)
})
