// Schema and Model
const mongoose = require('mongoose');
const slugify = require('slugify');

const FoodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a Title'],
    },
    sku: {
        type: String,
        required: [true, 'Please add a Title'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a Price'],
    },
    maxq: {
        type: Number,
        required: [true, 'Please add a Maximum Order Qunatity'],
    },
    description: {
        type: String,
    },
    slug: String,
    image: {
        type: String,
        required: [true, 'Please add a Food Image'],
    },
});
// Create bootcamp slug from the name
// eslint-disable-next-line func-names
FoodSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});
module.exports = mongoose.model('food', FoodSchema);
