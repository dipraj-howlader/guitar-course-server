const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res) => {
    res.send('Hello World')
})

//server
// console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wthiz.mongodb.net/rajdipdb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("rajdipdb").collection("products");
  const reviewCollection = client.db("rajdipdb").collection("reviews");
  const orderCollection = client.db("rajdipdb").collection("orders");
  const adminCollection = client.db("rajdipdb").collection("admin");

  //service panel
    app.post('/addService',(req, res) =>{
        const newService = req.body;
        console.log(newService);
        serviceCollection.insertOne(newService)
        .then(result => {
            console.log('inserted ', result.insertedCount)
            res.send(res.insertedCount > 0)
        })
    })

    app.get('/service',(req,res) => {
        serviceCollection.find()
        .toArray((err,document)=>{
            res.send(document)
        })
    })

    app.delete('/delete/:id' , (req, res)=> {
        serviceCollection.deleteOne({_id: ObjectID(req.params.id)})
        .then((result) =>{
          console.log(result);
        })
      })


    //review panel
    app.post('/addReview',(req, res) =>{
        const newReview = req.body;
        console.log(newReview);
        reviewCollection.insertOne(newReview)
        .then(result => {
            console.log('inserted ', result.insertedCount)
            res.send(res.insertedCount > 0)
        })
    })

    app.get('/review',(req,res) => {
        reviewCollection.find()
        .toArray((err,doc)=>{
            res.send(doc)
        })
    })

    //send to orders
    app.post('/addOrder',(req, res) =>{
        const newOrder = req.body;
        console.log(newOrder);
        orderCollection.insertOne(newOrder)
        .then(result => {
            console.log('inserted ', result.insertedCount)
            res.send(res.insertedCount > 0)
        })
    })

    app.get('/orders',(req,res) => {
        orderCollection.find()
        .toArray((err,order)=>{
            res.send(order)
        })
    })

    //send for admin
    app.post('/addAdmin',(req, res) =>{
        const newAdmin = req.body;
        console.log(newAdmin);
        adminCollection.insertOne(newAdmin)
        .then(result => {
            console.log('inserted ', result.insertedCount)
            res.send(res.insertedCount > 0)
        })
    })

    app.get('/admin',(req,res) => {
        adminCollection.find()
        .toArray((err,admin)=>{
            res.send(admin)
        })
    })

});


app.listen(process.env.PORT || port)