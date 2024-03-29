const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const dbConnection = require('./database/connection')


app.use(cors())

dbConnection();
// request payload middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use('/api/v1/raw_material', require('./routes/rawMaterialRoutes'))

//Error Handle
app.use(function(err,req,res,next){
    res.status(500).send(
        {
            status:500,
            message: err.message,
            body:{}
        }
    )
})

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`)
})