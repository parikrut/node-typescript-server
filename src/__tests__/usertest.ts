// I would have wirtten better test but due to lack of time i wasnt able to invest much time in this
const supertest = require("supertest");
import app from '../index'


/* User test Starts here */


// Demo for list all the users
test("List all Users GET /users", async () => {
  await supertest(app)
    .get("/users")
    .expect('Content-Type', /json/)
    .expect(200)
})

// Username should be unique to pass the test
// Currently i am using the same database so i am expecting it would be 401 response
test("Signup user POST /users/signu", async () => {
  await supertest(app)
    .post("/users/signup")
    .send({username: 'krutikparikh', email: "4krutikparikh@gmail.com", password:"krutik123"})
    .expect('Content-Type', /json/)
    .expect(401)
})

// Login user
test("Login user GET /users/login", async () => {
  await supertest(app)
    .get("/users/login")
    .send({username: 'krutikparikh', email: "4krutikparikh@gmail.com", password:"krutik123"})
    .expect('Content-Type', /json/)
    .expect(200)
})

// Logout user
test("Logout user GET /users/logout", async () => {
  await supertest(app)
    .get("/users/logout")
    .expect(200)
})

// Retweet
// After the retweet its the user ID which i am passing
test("Retweet POST /users//retweet/:UserID", async () => {
  await supertest(app)
    .post("/users/retweet/12345")
    .send({TweetID:"krutik123"})
    .expect(200)
})

/* Tweet test Starts here */


// Create Tweet
// Demo for list all the Tweets
test("List all Tweets GET /tweet", async () => {
  await supertest(app)
    .get("/tweet")
    .expect('Content-Type', /json/)
    .expect(200)
})

// Create Tweet
test("Create New tweet/create", async () => {
    await supertest(app)
      .post("/tweet/create")
      .send({userID: '6045258a5ee5495eb472a151', title: "New Testing tweet", content:"Nothing much lol..."})
      .expect('Content-Type', /json/)
      .expect(200)
  })

// List all the Tweets by UserID
test("List all Tweets by UserID /tweet/user-tweets/:UserID", async () => {
  await supertest(app)
    .get("/tweet/user-tweets/6045258a5ee5495eb472a151")
    .expect('Content-Type', /json/)
    .expect(200)
})

// List the Tweets by TweetID
test("List Tweet by TweetID /tweet/search-tweet/:TweetID", async () => {
  await supertest(app)
    .get("/tweet/search-tweet/60452f52c4ac25653bc73e9a")
    .expect('Content-Type', /json/)
    .expect(200)
})

// Update Tweet
test("Update Existing /tweet/update/:TweetID", async () => {
  await supertest(app)
    .post("/tweet/update/60452f52c4ac25653bc73e9a")
    .send({userID: '6045258a5ee5495eb472a151', title: "New Testing tweet", content:"Something got changed"})
    .expect('Content-Type', /json/)
    .expect(200)
})

// Delete Tweet
test("Delete Tweet /tweet/delete/:TweetID", async () => {
  await supertest(app)
    .post("/tweet/delete/60452f52c4ac25653bc73e9a")
    .expect('Content-Type', /json/)
    .expect(200)
})

// React On Tweet
test("Update Existing /tweet/react/:TweetID", async () => {
  await supertest(app)
    .post("/tweet/react/60452f52c4ac25653bc73e9a")
    .send({userID: '6045258a5ee5495eb472a151'})
    .expect('Content-Type', /json/)
    .expect(200)
})