const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const otpRoutes = require('./routes/otp');

const app = express();
app.use(bodyParser.json());

// const MONGODB_URI = 'your_mongodb_atlas_connection_string';
const MONGODB_URI = 'mongodb+srv://dbadmin:8f4I1DJeJIKHsPjI@cluster0.bxauoqg.mongodb.net/otp-generator?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('Failed to connect to MongoDB Atlas', err);
});

app.use('/otp', otpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
