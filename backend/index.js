import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

//enables .env file
dotenv.congif()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error))

mongoose.set('useFindAndModify', false)
