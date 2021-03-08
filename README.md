# Node backend

#### Created Rest-Api server with Express, Typescript and MongoDB

## Technologies Used:
- Typescript
- Express
- Redis
- SocketIO
- CORS
- Jest
- Mongodb

## Steps to run locally: 
**Preferable Run in Development**

1. Git Clone `git clone https://github.com/parikrut/node-typescript-server.git`.
2. CD into folder and run
    - Install dependencies `npm install`
    - Run Development `npm run start:dev` **Dont Forget to run the Redis Server** `npm run start:redis`
    - Run Production **Still working on it kinda buggy**`npm run build` Even it throws error it is ready to run. `npm run start`
    - Test `npm run test`
3. Visit `http://localhost:5000/`

## Directory Structure 
- **build/** - Contains the complied Javascript
- **config/** - Contains .env variable for `Dev` and `Test` environment with MongoDB String
- **src/index** - Initializes the express app (all the middleware + routes).
- **src/__test__/** - Contains Unit test for all the Controllers method.
- **src/api** - Contains whole app routes and middlewares.
- **src/components** - Contains all Model and Core Controllers logic.

## Api End points
- **/** - Welcome to krutik backend
- 
#### User endpoints
- `GET` **/users/** - List all the users
- `POST` **/users/signup** - Signup user
- `GET` **/users/login** - Login user
- `GET` **/users/logout** - Logout user
- `POST` **/retweet/:UserID** - Retweet

#### Message(Chat) endpoint
- `SocketIO` **/chat-app** - Join the room with username and password and chat with friends

#### Tweet endpoints
- `GET` **/tweet** - List all tweets
- `GET` **/tweet/user-tweets/:UserID** - List all tweets by the User ID
- `GET` **/tweet/search-tweet/:TweetID** - List all tweet by the Tweet ID
- `POST` **/tweet/create** - Create new Tweet
- `POST` **/tweet/update/:TweetID** - Update tweet by Tweet ID
- `POST` **/tweet/delete/:TweetID** - Delete tweet by Tweet ID
- `POST` **/tweet/react/:TweetID** - React on tweet by Tweet ID


## Dependencies

- Node 12.x or above
- NPM 5.x or above
- Redis Server
- Typescript

