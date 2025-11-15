const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    category: {
        type: String, required: [true, 'category is required'],
        enum: ['stocks', 'options', 'commodities', 'forex', 'futures']
    },
    title: { type: String, required: [true, 'title is required'] },
    host: { type: Schema.Types.ObjectId, ref:'User' },
    startDate: { type: Date, required: [true, 'startDate is required'] },
    endDate: { type: Date, required: [true, 'endDate is required'] },
    location: { type: String, required: [true, 'location is required'] },
    detail: { type: String, required: [true, 'detail is required'] },
    filename: { type: String, required: [true, 'image filename is required'] }
}
);

//collection name is events in the db
module.exports = mongoose.model('Event', eventSchema);
