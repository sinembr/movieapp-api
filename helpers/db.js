const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb+srv://snm:28042001Sf@cluster1.3i3t7.mongodb.net/movieapp-api', {useNewUrlParser: true, useUnifiedTopology: true});

  mongoose.connection.on("open", ()=>{
    console.log('Successfully connected to MongoDB!!')
  })
  mongoose.connection.on("error", ()=>{
    console.log('MongoDB connectios was failed...')
  })
}