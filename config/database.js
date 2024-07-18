
const mongoose = require("mongoose");

const database = async () => {
    try {
        await mongoose.connect("mongodb+srv://patelrushil1510:Nhzz4oBLXv9YssCY@cluster0.2p9d0wf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected...");
    } catch (error) {
        console.log(error);
    }
}
module.exports = database;

// Nhzz4oBLXv9YssCY