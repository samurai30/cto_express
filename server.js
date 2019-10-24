const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const dbConnection = require('./database/connection')
const session = require('express-session')


app.use(cors())

dbConnection();
// request payload middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'suyog@100',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// API Routes
app.use('/api/v1/raw_material', require('./routes/rawMaterialRoutes'))
app.use('/api/v1/suppliers', require('./routes/supplierRoutes'))
app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/unit', require('./routes/unitRoutes'))
app.use('/api/v1/category', require('./routes/categoryRoutes'))
app.use('/api/v1/restaurant', require('./routes/restaurantRoutes'))
app.use('/api/v1/store', require('./routes/storeRoutes'))
app.use('/api/v1/outlet', require('./routes/outletRoutes'))
app.use('/api/v1/purchase_order', require('./routes/purchaseOrderRoutes'))


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
