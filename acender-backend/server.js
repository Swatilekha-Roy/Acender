import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';

import Cards from "./dbCards.js";

// App Config
const app = express();
const port = process.env.PORT || 3000
const connection_url = 'mongodb+srv://admin:mWkSkDsX5dyBB4U@cluster0.ai4uw.mongodb.net/acender-db?retryWrites=true&w=majority'

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// API Endpoints
app.get("/", (req,res) => res.status(200).send("HELLO NOOB"));
app.post('/acender/cards', (req,res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
});

app.get('/acender/cards', (req,res) => {

    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });
});

// Listener
app.listen(port, () => console.log(`lazy ass on localhost: ${port}`));