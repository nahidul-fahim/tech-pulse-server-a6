import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";
import { CarStatus } from "./car.constant";


const carSchema = new Schema<TCar>({
    name: {
        type: String,
        required: [true, "Car name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Car description is required"],
        trim: true,
    },
    color: {
        type: String,
        required: [true, "Car color is required"],
        trim: true,
    },
    isElectric: {
        type: Boolean,
        required: [true, "isElectric is required"]
    },
    carType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    features: {
        type: [String],
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: [true, "Price per hour is required"]
    },
    status: {
        type: String,
        required: true,
        enum: CarStatus,
        default: 'available'
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)


// excluding the deleted data
carSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next()
});
carSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next()
});


export const Car = model<TCar>("Car", carSchema)