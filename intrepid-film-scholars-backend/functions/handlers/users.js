const { admin, db } = require('../util/admin');

const config = require('../util/config');
const { uuid } = require("uuidv4");
const firebase = require('firebase');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData, reduceUserDetails } = require('../util/validators')

// Sign up new user
exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    const { valid, errors } = validateSignupData(newUser); //call the validateSignupData method in validators.js

    if (!valid) return res.status(400).json(errors);

    const blankImg = 'blank-profile.png';

    let token, userId
    db.doc(`/users/${newUser.handle}`).get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({ handle: ' this handle is already taken' });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data) => { //return access token that user can later user to request data (access a route that is protected)
            userId = data.user.uid; //can only access the user id here through data
            return data.user.getIdToken()
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${blankImg}?alt=media`,
                userId
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token })
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') { //check this case to seperate the right type of errors
                return res.status(400).json({ email: 'Email is already in use' });
            }
            return res.status(500).json({ general: 'Something went wrong, please try again' }) // internal server error
        })
}

exports.registerNewUserFromGoogleSignin = (req, res) => {
    db.doc(`/users/${req.body.handle}`).get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({ handle: ' this handle is already taken' });
            } else {
                console.log('checkpoint 2');
                const userCredentials = {
                    handle: req.body.handle,
                    email: req.body.email,
                    createdAt: new Date().toISOString(),
                    imageUrl: req.body.imageUrl,
                    userId: req.body.uid
                }
                db.doc(`/users/${req.body.handle}`).set(userCredentials);
            }
        })
        .then(() => {
            return res.status(201).json({ message: 'New user created successfully' });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ general: 'Something went wrong, please try again' }) // internal server error
        })
        
    /*
    const token = req.body.token;
    db.collection('users').where('email', '==', req.body.email).get()
        .then((data) => {
            if (data._size === 0) {
                db.doc(`/users/${req.body.handle}`).get()
                    .then((doc) => {
                        if (doc.exists) {
                            return res.status(400).json({ handle: ' this handle is already taken' });
                        } else {
                            console.log('checkpoint 2');
                            const userCredentials = {
                                handle: req.body.handle,
                                email: req.body.email,
                                createdAt: new Date().toISOString(),
                                imageUrl: req.body.imageUrl,
                                userId: req.body.uid
                            }
                            db.doc(`/users/${req.body.handle}`).set(userCredentials);
                        }
                    })
                    .then(() => {
                        return res.status(201).json({ token })
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json({ general: 'Something went wrong, please try again' }) // internal server error
                    })
            }
            else {
                data.forEach((doc) => {
                    if (doc.exists) {
                        console.log('data exists')
                    } else {
                        console.log('data not exists')
                    }
                    existingUser = doc.data();
                    console.log('checkpoint 0')
                    if (existingUser) {
                        return res.status(400).json({ email: 'Email is already in use' });
                    }
                })
            }
        }).catch((err) => {
            return res.status(500).json({ general: 'Something went wrong, please try again' }) // internal server error
        });

        */
}

// Log in a user
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginData(user); //call the validateLoginData method in validators.js

    if (!valid) return res.status(400).json(errors);

    //if no error then login the user
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => { //return user token
            return res.json({ token })
        })
        .catch((err) => {
            console.error(err); // auth/wrong password error or auth/user-not-user error
            return res.status(403).json({ general: 'Wrong credentials please try again' }); //403 - Unauthorized
        });
}

// Add user details
exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);

    db.doc(`/users/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
}
// Get any user's details
exports.getUserDetails = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.params.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.user = doc.data();
                return db.collection('posts').where('userHandle', '==', req.params.handle)
                    .orderBy('createdAt', 'desc')
                    .get();
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        })
        .then((data) => {
            userData.posts = [];
            data.forEach((doc) => {
                userData.posts.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    postId: doc.id,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode
                })
            });
            return res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
}

// Change user's handle
// Need to copy the document details to a new document with the new name of the new handle
// Then delete the old document
exports.changeUserHandle = (req, res) => {
    console.log("old user handle", req.user.handle);
    const oldUserHandle = req.user.handle;
    db.collection('users').doc(oldUserHandle).get()
        .then((doc) => {
            console.log('checkpoint 0');
            console.log("doc: ", doc);
            if (doc && doc.exists) {
                const userData = doc.data();
                userData.handle = req.body.newHandle;
                console.log('checkpoint 1');

                db.doc(`/users/${req.body.newHandle}`).get()
                    .then((doc) => {
                        if (doc.exists) {
                            return res.status(400).json({ handle: ' this handle is already taken' });
                        } else {
                            db.collection('users').doc(req.body.newHandle).set(userData)
                                .then(() => {
                                    console.log('checkpoint 2');
                                    // delete the old document with the old handle
                                    return db.collection('users').doc(oldUserHandle).delete()
                                        .then(() => {
                                            console.log('checkpoint 3');
                                            return res.status(200).json(userData);
                                        });
                                }).catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({ error: err.code });
                                });
                        }
                    }).catch((err) => {
                        console.error(err);
                        return res.status(500).json({ error: err.code });
                    });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}
// Get own user's details
exports.getAuthenticatedUser = (req, res) => {
    let userData = {}
    db.doc(`/users/${req.user.handle}`).get()
        //.then(() => {console.log("success");})
        .then((doc) => {
            if (doc.exists) {
                console.log(doc.data());
                userData.credentials = doc.data();
                console.log(userData);
                //console.log(db.collection("likes").get().then(doc => console.log(doc.data())));
                //console.log(db.collection('likes').where('userHandle', '==', req.user.handle).get());
                return db.collection('likes').where('userHandle', '==', req.user.handle).get();
            }
        })
        .then((data) => {
            userData.likes = [];
            data.forEach((doc) => {
                userData.likes.push(doc.data());
            });
            return db.collection('notifications').where('recipient', '==', req.user.handle)
                .orderBy('createdAt', 'desc').limit(10).get();
        })
        .then((data) => {
            userData.notifications = [];
            data.forEach((doc) => {
                let postDetails = {};

                db.doc(`posts/${doc.data().postId}`).get()
                    .then((doc) => { // doc refers to the post's documemt
                        return doc.data();
                    })
                    .then((data) => { //data refers to the post object
                        userData.notifications.push({
                            recipient: doc.data().recipient, // doc refers to the notification doc
                            sender: doc.data().sender,
                            createdAt: doc.data().createdAt,
                            postId: doc.data().postId,
                            type: doc.data().type,
                            read: doc.data().read,
                            notificationId: doc.id,
                            postDetails: data,
                            commentId: doc.data().commentId ? doc.data().commentId : '',
                            parentCommentId: doc.data().parentCommentId ? doc.data().parentCommentId : '',
                            repliedCommentId: doc.data().repliedCommentId ? doc.data().repliedCommentId : '',
                        });
                        return userData.notifications.sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1);
                    })
                    .catch((err) => {
                        console.error(err);
                        return res.status(500).json({ error: err.code });
                    })
            });
            let userDataJson;
            setTimeout(() => {
                userDataJson = res.json(userData);
            }, 500); // wait for 0.2 second so that the promise have been executed
            return userDataJson;
        })//.then((data) => console.log(data))
        .catch((err) => {
            console.error(err);
            //return res.status(500).json({ error: err.code });
        })

}
/*
exports.getAuthenticatedUserNotifications = (req, res) => {
    //console.log(`user handle ${JSON.stringify(req)}`);
    db.collection('notifications').where('recipient', '==', req.params.handle).orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let userNotifications = []
            data.forEach((doc) => {
                console.log(`get notifications user ${JSON.stringify(doc.data())}`)

                db.doc(`posts/${doc.data().postId}`).get()
                    .then((doc) => { // doc refers to the post's documemt
                        return doc.data();
                    })
                    .then((data) => { //data refers to the post object
                        return userNotifications.push({
                            recipient: doc.data().recipient, // doc refers to the notification doc
                            sender: doc.data().sender,
                            createdAt: doc.data().createdAt,
                            postId: doc.data().postId,
                            type: doc.data().type,
                            read: doc.data().read,
                            notificationId: doc.id,
                            postDetails: data,
                            commentId: doc.data().commentId ? doc.data().commentId : '',
                            parentCommentId: doc.data().parentCommentId ? doc.data().parentCommentId : '',
                        })
                    })
                    .catch((err) => {
                        console.error(err);
                        return res.status(500).json({ error: err.code });
                    })
                let userNotificationsJson;
                setTimeout(() => {
                    userNotificationsJson = res.json(userNotifications.sort((a,b) => (b.createdAt > a.createdAt) ? 1 : -1));
                }, 500); // wait for 0.2 second so that the promise have been executed
                return userNotificationsJson;
            })
            //}
        })
        .catch((err) => {
            console.error(err);
            //return res.status(500).json({ error: err.code });
        })
    }
    */
// get all users (username and image) for mentioning
exports.getAllUsers = (req, res) => {
    db.collection('users')
        .get()
        .then((data) => {
            let users = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                users.push({
                    userId: doc.id,
                    name: doc.data().handle, //name here to be consistent with DraftJS mentions
                    avatar: doc.data().imageUrl //avatar here to be consistent with DraftJS mentions
                });
            });
            return res.json(users);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

// Upload a profile picture for user
exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs'); //file system

    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};
    let generatedToken = uuid();
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => { // read file upload - only need file and filename, but the function requires 4 parameters
        console.log(fieldname);
        console.log(filename);
        console.log(mimetype);
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Wrong file type submitted' });
        }
        //have a image.png then want to get .png -- e.g. my.image.png => ['my', 'image', 'png']
        const imageExtension = filename.split('.')[filename.split('.').length - 1] //split filename by '.' and access the last element from that array of split strings (which gives us the file extension)
        console.log(imageExtension);
        //e.g: 134324423.png
        imageFileName = `${Math.round(Math.random() * 100000000000).toString()}.${imageExtension}`
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', () => {// finishing uploading file
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype,
                    firebaseStorageDownloadTokens: generatedToken,
                }
            }
        })
            .then(() => {
                //construct img url
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}` //the ?alt=media postfix is to prevent the url to automatically download the file everytime we open the url
                return db.doc(`/users/${req.user.handle}`).update({ imageUrl }) //the uploadimg is a protected route with FBAuth so the user has been verified so we req.user to access
            })
            .then(() => {
                return res.json({ message: 'Image uploaded successfully' });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ error: err.code });
            })
    })
    busboy.end(req.rawBody);
};

exports.markNotificationRead = (req, res) => {
    let batch = db.batch(); //batch write 
    req.body.forEach((notificationId) => {
        const notification = db.doc(`/notifications/${notificationId}`); //array of ids
        batch.update(notification, { read: true }); //mark notifications as read  
    });
    batch.commit()
        .then(() => {
            return res.json({ message: 'Notifications marked read' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};