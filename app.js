const http=require('http');
const fs=require('fs');
const moment=require('moment');
const hostname='localhost';
const port =3000;


    const server=http.createServer((req,res) =>{ 
    res.setHeader('Content-Type','html')
    var route='./';
    //console.log(req.url)
    console.log(moment('12/01/2001').format('LL'));
    switch(req.url){
        case '/':
            route+= 'index.html';
            res.statusCode=200;
            break;
        case '/contact':
            route += 'contact.html';
            res.statusCode=200;
            break;
        case '/contact-us':
            res.setHeader('Location','/contact');
            res.statusCode=301;
          res.end();
            break;
        default:
            route+= '404.html';
            res.statusCode=404;
            break;
    }
    fs.readFile(route,(err,data) =>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
           // res.write(data);
            res.end(data);
        }

    })

    })

    server.listen(port ,()=>{
        console.log(`Listening to ${port}`)
    })

