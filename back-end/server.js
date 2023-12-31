const express = require('express');
const mongoose = require("mongoose")
const user = require('./routes/user');
const employee = require('./routes/employee');
const app = express();
const SERVER_PORT = 5000;

const cors = require('cors');
app.use(cors(
    // {
    //     origin: ["https://employee-management-app-sepia.vercel.app"],
    //     methods: ["POST", "GET", "PUT", "DELETE"],
    //     credentials: true
    // }
));

// Middleware JSON parsing
app.use(express.json());
app.use(express.urlencoded())
const DB_CONNECTION_STRING = "mongodb+srv://enessertkan:Password123@cluster0.55mfjdg.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use('/api/v1/user', user);
app.use('/api/v1/emp', employee);


app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
});