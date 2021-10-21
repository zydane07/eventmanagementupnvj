const express = require('express');
const app = express();
const port = 3000;
const routers = require('./src/Routes/routers');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(express.json());
app.use(expressLayouts);
const connectDB = async() =>{
  try{
    await mongoose.connect(process.env.DB_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Database connected!');
  }
  catch(err){
    console.log('Failed to connect to Database:',err);
  }
}

connectDB();

// Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'));
app.use('/js',express.static(__dirname+'public/js'));
app.use('/img',express.static(__dirname+'public/img'));
app.use('/icon',express.static(__dirname+'public/icon'));

// Set Views
app.set('views','./views');
app.set('view engine','ejs');


app.use(routers);

app.listen(port,()=>{
  console.log('Sedang berjalan...')
})

