const express = require ('express');
const app = express();
const PORT = process.env.PORT || 2000;
const connectDB = require('./config/db');

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

//@PORT
app.listen(PORT, ()=>console.log(`server started at ${PORT}`));