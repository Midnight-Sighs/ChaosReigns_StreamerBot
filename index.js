const express = require('express');
const bodyParser = require('body-parser');
const routes = require ('./routes/routes');

const app = express();

const port = process.env.PORT;
const host = process.env.HOST;

app.use(bodyParser.json());

app.use('/api', routes);
app.use((req, res)=>{
    res.status(404).json({error: "Route not found"})
})


app.listen(port, ()=>{
    console.log(`Server is running on port http://${host}:${port}`)
})