const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const noteRouter = require('./routes/routes');
const dotenv = require('dotenv');

const app = express();
// load dotenv
dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to db
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to mongodb');
}
).catch((err) => {
    console.log(err);
}
);

// middleware 
app.use(bodyParser.json()); // parse json bodies into JS objects
app.use(morgan('dev')); // log requests to the console (for dev)

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error : 'Something went wrong!'});
  });
app.get('/', (req, res) => {
    return res.json({ message: 'home' });
}
);
app.use('/notes', noteRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}
);



