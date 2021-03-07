import * as bcrypt from 'bcryptjs';
import { Document, Schema, Model, model } from 'mongoose';
import * as mongoose from 'mongoose';

type TweetData = {
    tweetID: mongoose.Schema.Types.ObjectId
}

export interface IUserDocument extends Document {
    username: String
    email: String
    password: string
    createdAt: Date
    passwordChangedAt: number
    tweets: Array<TweetData>
}
export interface IUserModel extends IUserDocument {
    correctPassword(candidatePassword:string, userPassword:string):any 
}

export const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide your name"],
        unique: [true,  'User is already exists']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tweets:{
        type: Array,
    }
});

// Check if the user password is correct
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function (this: IUserModel, next) {
    const user = this;
    // Encrypt the password
    user.password = await bcrypt.hash(user.password, 12);
    user.passwordChangedAt = Date.now() - 1000;

    next();
});

export const User: Model<IUserModel> = model<IUserModel>('User', userSchema);

export default User;