const express = require('express');
const mongoose = require('mongoose');
const otpRoutes = require('./routes/otp');

const app = express();
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/otp-generator', {
mongoose.connect('mongodb+srv://dbadmin:8f4I1DJeJIKHsPjI@cluster0.bxauoqg.mongodb.net/otp-generator?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/otp', otpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
