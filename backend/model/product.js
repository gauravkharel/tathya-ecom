const mongoose = require(mongoose);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 5,
        default: 0.00,
    },
    description: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            
        }
    ],        
    category: {
        type: String,
        required: true,
        enum: {
            values: [
                'clothing', 
                'accessories', 
                'shoes', 
                'bags', 
                'others'
            ],
            message: 'Please select the mentioned category.'
        }
    },
    seller: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        maxlength: 5,
        default: 0
    },
    numOfRatings: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            username: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
                maxlength: 5,
            },
            review: {
                type: String,
                required: true
            }
        }
    ],
    color: {
        type: String,
        required: true,
        enum: {
            values: [
                'black',
                'white',
                'red',
                'blue',
                'green',
                'yellow',
                'orange',
                'purple',
                'pink',
                'brown',
                'grey',
                'silver',
                'gold',
                'others'
            ],
            message: 'Please select through the option listed.'
         }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
   
});
    
exports = mongoose.model('Product', productSchema); 


