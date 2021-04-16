const express = require('express');
// var cors = require('cors');
const connectDB = require('./config/db')

const app = express();

// app.use(cors())


// Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}))

// app.get('/', (req, res) => res.send('API RUNNING'))

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/facilities', require('./routes/api/facilities'))
app.use('/api/reservations', require('./routes/api/reservations'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))