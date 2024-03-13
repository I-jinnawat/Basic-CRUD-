const express = require('express')
// const {readdirSync} = require('fs')

// const morgan = require('morgan')
// const cors = require('cors')
// const bodyParser  = require('body-parser')


// const connectDB = require('./Config/db')
const indexController = require('./Controller/indexController')


const app = express();
const port = 5000;
//ConnectDatabase
// connectDB();
// app.use(morgan('dev'))
// app.use(cors())
// app.use(bodyParser.json({limit: '10mb'}))


// readdirSync('./Routes')
//     .map((r) =>app.use('/api',require('./Routes/' + r)))

app.get('/', indexController)


app.listen(port,()=> console.log(`Server is running at prot ${port}`))