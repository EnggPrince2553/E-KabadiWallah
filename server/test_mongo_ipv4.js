const mongoose = require('mongoose');

const uri1 = "mongodb+srv://surajpandit8122004_db_user:suraj%401234@cluster0.ebfqktr.mongodb.net/kabadiwala?retryWrites=true&w=majority";
const uri2 = "mongodb://surajpandit8122004_db_user:suraj%401234@cluster0-shard-00-00.ebfqktr.mongodb.net:27017,cluster0-shard-00-01.ebfqktr.mongodb.net:27017,cluster0-shard-00-02.ebfqktr.mongodb.net:27017/kabadiwala?ssl=true&authSource=admin&replicaSet=atlas-13z69e-shard-0&retryWrites=true&w=majority";

console.log("Testing SRV connection...");
mongoose.connect(uri1, { family: 4, serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("SRV SUCCESS");
    process.exit(0);
  })
  .catch(err => {
    console.error("SRV FAILED:", err.message);
    console.log("Testing Direct connection...");
    mongoose.connect(uri2, { family: 4, serverSelectionTimeoutMS: 5000 })
      .then(() => {
        console.log("DIRECT SUCCESS");
        process.exit(0);
      })
      .catch(err2 => {
        console.error("DIRECT FAILED:", err2.message);
        process.exit(1);
      });
  });
