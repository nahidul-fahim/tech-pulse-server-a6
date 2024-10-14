import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";


const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        select: 0,
        required: [true, 'Password is required'],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    profileImg: {
        type: String,
    },
    bio: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
    posts: {
        type: Number,
        default: 0
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    isBlocked: {
        type: Boolean,
        default: false
    },
    transactionId: {
        type: String,
        default: "",
        required: false
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordTokenExpired: {
        type: Date,
        required: false
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);


// Query Middleware
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// Query Middleware
userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// hash password before saving to db
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_round)
    );
    next();
})

// set "" after saving password
userSchema.post('save', async function (doc, next) {
    doc.password = "";
    next();
})

// checking if user exists
userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email })
};

export const User = model<TUser, UserModel>('User', userSchema)