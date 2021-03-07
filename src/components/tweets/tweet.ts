import { Document, Schema, Model, model} from 'mongoose';
import * as mongoose from 'mongoose';

// Ideadlly i would like to have the userID for the user who liked the post but as we have no frontend it would be really hard to test with userID
type ILikeData = {
    otheruserID: mongoose.Schema.Types.ObjectId
}

export interface ITweetModel extends Document {
    userID: mongoose.Schema.Types.ObjectId;
    title: String
    content: string
    createdAt: Date
    react: Array<ILikeData>
}

export const tweetSchema: Schema= new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Tweet must belong to a user']
    },
    title: {
        type: String,
        required: [true, 'Please provide title'],
    },
    content: {
        type: String,
        required: [true, 'Please provide a content'],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    react: {
        type: Array,
    },
});


export const Tweet: Model<ITweetModel> = model<ITweetModel>('Tweet', tweetSchema);

export default Tweet;