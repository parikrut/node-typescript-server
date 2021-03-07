import { Router } from 'express';
import TweetController from '../../components/tweets/tweetController';
import asyncHandler from 'express-async-handler';
import { verifyAuthentication } from '../middlewares/userAuth';

// async handles saves time to write try and catch for the functions we have called
const router = Router();

export default (app : any) => {
    app.use('/tweet', router);

    router.get('/', verifyAuthentication, asyncHandler(TweetController.listTweet));
    router.get('/user-tweets/:UserID', verifyAuthentication, asyncHandler(TweetController.listTweetbyUser));
    router.get('/search-tweet/:TweetID', verifyAuthentication, asyncHandler(TweetController.listTweetbyID));
    router.post('/create', verifyAuthentication, asyncHandler(TweetController.createTweet));
    router.post('/update/:TweetID', verifyAuthentication, asyncHandler(TweetController.updateTweet));
    router.post('/delete/:TweetID', verifyAuthentication, asyncHandler(TweetController.deleteTweet));
    router.post('/react/:TweetID', verifyAuthentication, asyncHandler(TweetController.reactTweet));

};
