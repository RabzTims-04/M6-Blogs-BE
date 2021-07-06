import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";

const server = express();
const port = process.env.PORT || 3005

// ****************** MIDDLEWARES ****************************

server.use(express.json());

// ****************** ROUTES *******************************

// ****************** ERROR HANDLERS ***********************

console.table(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() =>
    server.listen(port, () => {
      console.log("server is running on port ", port);
    })
  )
  .catch((err) => console.log(err));
