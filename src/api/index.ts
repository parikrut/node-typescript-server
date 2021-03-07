import { Router } from 'express';
import userRoutes from './routes/users';
import chatRoutes from './routes/chats'
import tweetRoutes from './routes/tweets'
export default () => {
    const app = Router();
    app.get('/', (req, res, next) => {
        res.send('Welcome to backend created by krutik');
    });

    userRoutes(app);
    chatRoutes(app);
    tweetRoutes(app);

    return app;
};
