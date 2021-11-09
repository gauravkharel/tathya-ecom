const mongoose = require('mongoose');
const connectDatabase = () => {
mongoose.connect(process.env.DB_LOCAL_URI, 
    async(err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Database connected');
        }
    });
};


