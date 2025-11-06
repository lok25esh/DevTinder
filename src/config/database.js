const mongoose = require("mongoose");


const connectDB = async () => {
await mongoose.connect ( "mongodb+srv://lokeshk:Lokesh%401234@cluster0.fe09nbm.mongodb.net/");
}

module.exports = connectDB;