// Middleware to check if the user is logged in or not
export const verifyAuthentication = (req: any, res: any, next: any) => {
    try {
        if (req.session.user) {
            // res.json({"message": "Welcome " + req.session.user.username + "."})
            next()
        } else {
            res.json({"message": "Please Login or Signup to continue "})
        }
    } catch (error) {
        res.status(404).json({"message": "User not find"})
    }
};
