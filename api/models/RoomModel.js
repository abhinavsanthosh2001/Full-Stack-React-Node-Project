import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    title: {
        type: String,
        required: true,
        
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true
    },
    roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}]
    }, {timestamps: true}
);

export default mongoose.model("Room", roomSchema);