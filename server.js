const { app } = require("./src");
const { connectDb } = require("./src/config/db");

const port = 5454;
app.listen(process.env.PORT, async () => {
  await connectDb();
  console.log("ecommerce api listing on port ", process.env.PORT);
});
