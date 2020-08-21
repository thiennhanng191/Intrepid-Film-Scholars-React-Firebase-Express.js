const { admin, db } = require('./admin');

//firebase authorization
module.exports = (req, res, next) => { 
    let idToken; 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) { //get the token from the value of the authorization key in the header of the protected route
        idToken = req.headers.authorization.split('Bearer ')[1]; //get the 2nd element, which is the token
    } else {
        console.error('No token found')
        return res.status(403).json({ error: 'Unauthorized'});
    }

    //come to here then there is a token then need to verify the token
    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken;
            console.log(decodedToken);
            return db.collection('users')
                    .where('userId', '==', req.user.uid)
                    .limit(1) //limit the result to 1 document
                    .get();
        })
        .then((data) => {
            req.user.handle = data.docs[0].data().handle; // extract the user handle
            req.user.imageUrl = data.docs[0].data().imageUrl;
            return next(); // go on and execute the next instruction
        })
        .catch((err) => {
            console.error('Error while verifying token', err); 
            return res.status(403).json(err);
        })
}