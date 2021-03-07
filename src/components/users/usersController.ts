import User from './user';

// Declaring Additional Property for express-session
declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
    }
}

// Saves the Session for the user who logged in or Signup
var save_session = function (req: any, user: Object) {
    req.session.user = user
}

// Function to send response to the user
const sendStatus = async function (res: any, status: string, message: string, code: number) {
    return await res.status(code).send({
        status: status,
        message: message
    });
}

// Because of the asyncHandler Librairy i havent written Try catch block
class UsersController {
    // List All users
    async listUsers(req: any, res: any, next: any) {
        const users = await User.find();
        if (users.length == 0) {
            return sendStatus(res, "error", "No users found", 404);
        }
        res.json(users);
    }

    // Add New User
    async signupUser(req: any, res: any) {
        const { username, password, email } = req.body;

        if(!username || !password || !email){
            return sendStatus(res, "error", "Please Enter all the required details", 400)
        }
        
        const user = await User.create({
            username: username,
            email: email,
            password: password,
        }).catch(err => {
            // If user already exists
            if (err.code === 11000) {
                return sendStatus(res, "error", "Email is already exist", 401)
            }
        });

        save_session(req, user);
        return res.status(200).json({
            status: 'success',
            user
        });
    }

    // Login Existing user
    async loginUser(req: any, res: any) {
        const { username, password } = req.body;

        if (!username || !password) {
            return sendStatus(res, "error", "Please provide ID and Password!", 400);
        }

        const user = await User.findOne({ username }).select('+password');

        if (!user || (!await user.correctPassword(password, user.password))) {
            return sendStatus(res, "error", "Incorrect ID or Password", 401)
        }
        save_session(req, user);
        return sendStatus(res, "Sucess", "You are successfully Logged in!", 200)
    }

    // Logout user
    async logoutUser(req: any, res: any) {
        req.session.destroy(await function (err: any) {
            if (err) {
                return sendStatus(res, "error", "Something went wrong!", 401);
            } else {
                return sendStatus(res, "Sucess", "You are successfully logged out!", 200)
            }
        });
    }

    // Retweet
    // Ideally i would have passed the Whole Post Object into tweets but due to lack of frontend i am skppind that whole ref thing
    // Logic behind this Get the UserID from the Params find the User from the List.
    // Update the Document by pushing Post ID into array
    // I can get ID from the session also but for the demo and better testing i am using the param way
    async retweet(req: any, res: any) {
        const UserID = req.params.UserID;
        const TweetID = req.body.TweetID;
        if (!UserID || !TweetID) {
            return sendStatus(res, "error", "Please provide all details", 400);
        }
        try {
            const retweet = await User.findOneAndUpdate({ _id: UserID }, {"$push": {"tweets": TweetID}})
            return res.status(200).json({
                status: 'success',
                retweet
            });
        } catch (error) {
            return sendStatus(res, "error", "Something went wrong", 400)
        }
    }

}

export default new UsersController();
