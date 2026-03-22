const express = require('express')
const cors = require('cors')
const router = require('./route')

const app = express();

app.use( cors() )
app.use(express.json());

app.use( '/task/api' , router );

app.listen( 5050 , ()=>
    {
        console.log("Server running in the port:5050");
    }        
)