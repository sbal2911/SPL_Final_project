const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    status: {
        type: String, required: [true, 'status is required'],
        enum: ['yes', 'no', 'maybe']
    },
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}
);

//collection name is events in the db
module.exports = mongoose.model('RSVP', rsvpSchema);
