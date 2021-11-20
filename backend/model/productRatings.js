// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const productRatingsSchema = new mongoose.Schema({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     rating: {
//         type: Number,
//         max: 5,
//         min: 1,
//         required: true
//     },
//     comment: {
//         type: String,
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const ProductRatings = mongoose.model('ProductRatings', productRatingsSchema);

// module.exports = ProductRatings;
