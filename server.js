const { application } = require('express');
const express = require('express');
const res = require('express/lib/response');
const connectDB = require('./config/db');

const app = express();

//connect Database
connectDB();

//inti Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	res.send('Api Runnuing');
});

const PORT = process.env.PORT || 5000;

//Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
