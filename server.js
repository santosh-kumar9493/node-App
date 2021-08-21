let express=require('express');
let Item = require('./models/items');
let app=express();

app.use(express.urlencoded({extended: true}));

const mongodb = 'mongodb+srv://nodeapp:nodeapp143@cluster0.czpdv.mongodb.net/item?retryWrites=true&w=majority';
let mongo = require('mongoose');
mongo.connect(mongodb,{useNewUrlParser:true,useUnifiedTopology: true })
    .then(() =>{ console.log('connected')
        app.listen(5000)})
    .catch(err => console.log(err));


app.set('view engine', 'ejs');



app.get('/get-item',(req,res) =>{ 

    Item.find().then(result => 
        res.render('index',{items : result}))
        .catch(err =>console.log(err));
})
app.get('/',(req,res) =>{

    res.redirect('get-item')
})
app.post('/items',(req,res) =>{
   const item=new Item(req.body);
   item.save().then(()=>
    res.redirect('get-item'))
    .catch(err => console.log(err));
})
app.get('/items/:id',(req,res) =>{
    
    Item.findById(req.params.id).then((result)=>{
            res.render('item-detail',{items : result});
    })
    .catch(err => console.log(err));
})
app.delete('/items/:id',(req,res) =>{
    
    Item.findByIdAndDelete(req.params.id).then((result)=>{
            res.json({redirect : '/get-item'});
    })
    .catch(err => console.log(err));
})
app.put('/items/:id',(req,res) =>{
    
    Item.findByIdAndUpdate(req.params.id,req.body).then((result)=>{
            res.json({msg : 'Update success'});
    })
    .catch(err => console.log(err));
})
app.get('/add-item',(req,res) =>{
    console.log(req.url);
    res.render('add-item');
})

app.use((req,res) =>{
    res.render('error');
})