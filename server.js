const express = require ('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 2000;
const connectDB = require('./config/db');


//Cross Platform 
app.use(cors())

//conecting to database
connectDB();

//Body parser 
app.use(express.json());

//Test route
app.get('/' ,(req,res) => res.send('API STARTED'));

//@User
app.use('/api/user',require('./routes/api/user'));


//@Auth
app.use('/api/auth',require('./routes/api/auth'));

//@Quiz
app.use('/api/quiz',require('./routes/api/quiz'));

//@Category
app.use('/api/category',require('./routes/api/category'));

//@PORT
app.listen(PORT, ()=>console.log(`server started at ${PORT}`));