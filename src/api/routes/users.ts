import { Router } from 'express';
import UsersController from '../../components/users/usersController';
import asyncHandler from 'express-async-handler';
import { verifyAuthentication } from '../middlewares/userAuth';

// async handles saves time to write try and catch for the functions we have called
const router = Router();

export default (app : any) => {
    app.use('/users', router);

    router.get('/', verifyAuthentication, asyncHandler(UsersController.listUsers));
    router.post('/signup', asyncHandler(UsersController.signupUser));
    router.get('/login', asyncHandler(UsersController.loginUser));
    router.get('/logout', asyncHandler(UsersController.logoutUser));
    router.post('/retweet/:UserID', asyncHandler(UsersController.retweet));
};
