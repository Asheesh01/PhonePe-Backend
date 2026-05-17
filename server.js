const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const cookeparser=require("cookie-parser")
const app = express();
const cors = require("cors")
const bcrypt = require("bcryptjs")
const authRoute = require('./src/routes/authRoute')
const tansactionRoutes=require('./src/routes/transactionroute')
const swaggerui = require('swagger-ui-express')
const connectDb = require('./src/config/db')
const port = process.env.PORT || 5000;

let swaggerDocument = {};
try {
    swaggerDocument = require('./swagger-output.json');
}
catch (err) {
    console.error('Error loading Swagger Document:', err);
}
app.use(cors())
app.use(cookeparser())
connectDb();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/", (req, res) => {
    try {
        res.send("Phone pe")
    } catch (error) {
        console.log(error)
    }
})

app.use("/api/auth", authRoute);
app.use('api/transaction',tansactionRoutes)
app.use('api/docs', swaggerui.serve, swaggerui.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
})