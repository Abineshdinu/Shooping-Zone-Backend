const mongoose = require('mongoose');
const uri = process.env.DB_LOCAL_URI || 'mongodb://localhost:27017/shopping-zone';
    console.log('Connecting to MongoDB with URI:', uri); 

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`MongoDB is connected to the host: ${con.connection.host} `)
    })
}

module.exports = connectDatabase;