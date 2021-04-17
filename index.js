const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const port = 5000;

app.use(cors());
app.use(bodyParser.json());
// app.get('/',(req,res) => {
//     res.send('Hello Bal')
// })

//server
const uri = "mongodb+srv://guitaruser:testt1234@cluster0.wthiz.mongodb.net/rajdipdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("rajdipdb").collection("products");

  
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

//   client.close();
});


app.listen(process.env.PORT || port)