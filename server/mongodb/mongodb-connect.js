'use strict'

let mongoose= require('mongoose');
let mongoDB =process.env.MONGODB_URL ||  'mongodb+srv://is702396_:alvaro1.@cluster0-xftk7.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB,{
    useNewUrlParser: true,
    useCreateIndex: true});

module.exports = {mongoose};
