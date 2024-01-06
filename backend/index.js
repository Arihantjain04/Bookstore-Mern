import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/book.models.js";
import booksRoute from './routers/books.routes.js'
import cors from 'cors'

// export const PORT = 5555
// export const mongoDBURL = 'mongodb+srv://root:root@cluster0.enp6buj.mongodb.net/?retryWrites=true&w=majority'

const app = express();

app.use(cors(
    {
        // origin: 'http://localhost:5173',
        // method: ['GET', 'POST', 'PUT', 'DELETE'],
        // allowHeaders: ['Content-Type']
        origin: ["https://bookstore-mern-ten.vercel.app"],
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders: ['Content-Type'],
        credentials: true
    }
))

app.use(express.json())

app.options('/books', cors());

app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://bookstore-mern-ten.vercel.app");
    res.send("HELLO WELCOME TO HOME PAGE !!!")
});

app.use('/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("DATABASE CONNECTED !!!");
    app.listen(PORT, () => {
      console.log(`SERVER IS WORKING AT PORT ${PORT}!!!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
