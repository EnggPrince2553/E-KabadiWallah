const mongoose = require('mongoose');
const uri = "mongodb://surajpandit8122004_db_user:suraj%401234@cluster0-shard-00-00.ebfqktr.mongodb.net:27017,cluster0-shard-00-01.ebfqktr.mongodb.net:27017,cluster0-shard-00-02.ebfqktr.mongodb.net:27017/kabadiwala?ssl=true&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully using standard URI!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed standard URI:", err.message);
    process.exit(1);
  });
