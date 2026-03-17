const mongoose = require("mongoose");

before(async function () {
  this.timeout(10000);

  await mongoose.connect(process.env.MONGO_URI);
});

after(async () => {
  await mongoose.connection.close();
});