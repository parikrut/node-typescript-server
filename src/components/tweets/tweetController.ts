import e from 'express';
import Tweet from './tweet';
// Function to send response to the user
const sendStatus = async function (res: any, status: string, message: string, code: number) {
    return await res.status(code).send({
        status: status,
        message: message
    });
}

// Because of the asyncHandler Librairy i havent written Try catch block
class TweetController {

    // List all Tweet
    async listTweet(req: any, res: any, next: any) {
        const tweets = await Tweet.find();
        if (tweets.length == 0) {
            return sendStatus(res, "error", "No tweets found", 404);
        }
        res.json(tweets);
    }

    // List all Tweet by UserID
    async listTweetbyUser(req: any, res: any, next: any) {
        const userID = req.params.UserID;
        if (!userID) {
            return sendStatus(res, "error", "Please Enter all the required details", 400)
        }
        try {
            const tweets = await Tweet.find({ userID: userID });
            if (tweets.length == 0) {
                return sendStatus(res, "error", "No tweets found", 404);
            }
            res.json(tweets);
        } catch (error) {
            return sendStatus(res, "error", "Can not able to find user", 400)
        }
    }

    // List all Tweet by TweetID
    async listTweetbyID(req: any, res: any) {
        const tweetID = req.params.TweetID;
        if (!tweetID) {
            return sendStatus(res, "error", "Please Enter all the required details", 400)
        }
        try {
            const tweets = await Tweet.find({_id: tweetID});
            if (tweets.length == 0) {
                return sendStatus(res, "error", "No tweets found", 404);
            }
            res.json(tweets);
        } catch (error) {
            return sendStatus(res, "error", "Can not able to find Tweet", 400)
        }
    }

    // Create Tweet
    async createTweet(req: any, res: any) {
        const {userID, title, content} = req.body;

        if (!userID || !title || !content) {
            return sendStatus(res, "error", "Please Enter all the required details", 400)
        }

        try {
            const tweet = await Tweet.create({
                userID: userID,
                title: title,
                content: content,
            })
            return res.status(200).json({
                status: 'success',
                tweet
            });
        } catch (error) {
            return sendStatus(res, "error", "Something went wrong", 400)

        }
    }

    // Update Tweet
    async updateTweet(req: any, res: any) {
        const {userID, title, content} = req.body;
        const tweetID = req.params.TweetID;
        if (!userID || !title || !content || !tweetID) {
            return sendStatus(res, "error", "Please Enter all the required details", 400)
        }
        try {
            const tweet = await Tweet.findOneAndUpdate({ _id: tweetID }, {
                userID: userID,
                title: title,
                content: content,
            })
            return res.status(200).json({
                status: 'success',
                tweet
            });
        } catch (error) {
            return sendStatus(res, "error", "Something went wrong", 400)
        }
    }

    // Delete Tweet
    async deleteTweet(req: any, res: any) {
        const tweetID = req.params.TweetID;
        if (!tweetID) {
            return sendStatus(res, "error", "Please Enter all the required details", 400)
        }
        try {
            const tweet = await Tweet.findOneAndDelete({ _id: tweetID })
            return res.status(200).json({
                status: 'success',
                tweet
            });
        } catch (error) {
            return sendStatus(res, "error", "Something went wrong", 400)
        }
    }

    // Like and Dislike on Tweet
    // Logic behind this i would have Tweet Id from the param and User ID will be passed in the Body. 
    // it will check if the userID is present in the React Array or not if it is present it will remove it and if its not then it will update it
    // Ideally i would have passed the Whole User Object into tweets but due to lack of frontend i am skppind that whole ref thing
    // I can get ID from the session also but for the demo and better testing i am using the param way
    async reactTweet(req: any, res: any) {
        const tweetID = req.params.TweetID;
        const userID = req.body.userID;
        if (!tweetID || !userID) {
            return sendStatus(res, "error", "Please provide all details", 400);
        } 
        
        try {
            const retweet = await Tweet.find({ _id: tweetID })
            if(retweet.length === 0){
                return sendStatus(res, "error", "Tweet not found or Tweet has been deleted", 400);
            }else{
                const react = await Tweet.find({react: userID})
                if(react.length === 0){
                    await Tweet.findOneAndUpdate({ _id: tweetID }, {"$push": {"react": userID}})
                    return sendStatus(res, "Sucess", "Liked Tweet", 200)
                }
                else{
                    await Tweet.findOneAndUpdate({ _id: tweetID }, {"$pull": {"react": userID}})
                    return sendStatus(res, "Sucess", "UnLiked Tweet", 200)
                }
            }
        } catch (error) {
            return sendStatus(res, "error", "Something went wrong", 400)
        }
    }
    
}

export default new TweetController();
