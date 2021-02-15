const functions = require('firebase-functions');
/*
const express = require('express');
const app = express();
// these 2 lines can be combined as below
*/
const app = require('express')();
const cors = require('cors');

app.use(cors());

const FBAuth = require('./util/fbAuth');

const { db } = require('./util/admin');


const { getAllPosts, getAllPostsOrderedByLikes, uploadAPost, getPost, deleteComment, getComment, getRepliedComment, commentOnPost, replyCommentOnPost, likePost, unlikePost, deletePost } = require('./handlers/posts');
const { getPostsById, getPostsByIdOrderedByLikes, getPostsByOpinion, getPostsByOpinionOrderedByLikes, getPostsByFunFact, getPostsByFunFactOrderedByLikes, getPostsByPlotHoles, getPostsByPlotHolesOrderedByLikes, getPostsByIdByOpinion, getPostsByIdByFunFact, getPostsByIdByPlotHoles, getPostsByIdByOpinionOrderedByLikes, getPostsByIdByFunFactOrderedByLikes, getPostsByIdByPlotHolesOrderedByLikes } = require('./handlers/posts');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, getAllUsers, markNotificationRead, getAuthenticatedUserNotifications, googleSignupHandle, changeUserHandle } = require('./handlers/users');

/*
    posts routes
*/
app.get('/posts', getAllPosts); //get posts routes
app.get('/posts/top', getAllPostsOrderedByLikes); //get top posts (ordered by likeCount)
app.get('/posts/opinion', getPostsByOpinion);
app.get('/posts/top/opinion', getPostsByOpinionOrderedByLikes);
app.get('/posts/funFact', getPostsByFunFact);
app.get('/posts/top/funFact', getPostsByFunFactOrderedByLikes);
app.get('/posts/plotHoles', getPostsByPlotHoles);
app.get('/posts/top/plotHoles', getPostsByPlotHolesOrderedByLikes);
app.get('/posts/:titleId', getPostsById); //get posts by the movies/tv series' title id
app.get('/posts/:titleId/top', getPostsByIdOrderedByLikes);
app.get('/posts/:titleId/opinion', getPostsByIdByOpinion);
app.get('/posts/:titleId/funFact', getPostsByIdByFunFact);
app.get('/posts/:titleId/plotHoles', getPostsByIdByPlotHoles);
app.get('/posts/:titleId/top/opinion', getPostsByIdByOpinionOrderedByLikes);
app.get('/posts/:titleId/top/funFact', getPostsByIdByFunFactOrderedByLikes);
app.get('/posts/:titleId/top/plotHoles', getPostsByIdByPlotHolesOrderedByLikes);

app.get('/comment/:commentId', getComment);
app.delete('/comment/:commentId', FBAuth, deleteComment);

app.get('/repliedComment/:repliedCommentId', getRepliedComment);
app.post('/post', FBAuth, uploadAPost); //upload a post route - it's a protected route
app.get('/post/:postId', getPost); //':' here signals a route's parameter -- not a protected route, no need to log in to see a post
app.delete('/post/:postId', FBAuth, deletePost);
app.get('/post/:postId/like', FBAuth, likePost);
app.get('/post/:postId/unlike', FBAuth, unlikePost);

app.post('/post/:postId/comment', FBAuth, commentOnPost);
app.post('/post/:postId/comment/:commentId/comment', FBAuth, replyCommentOnPost);


/* 
    users routes
*/
app.post('/signup', signup) // Signup route (https://<baseurl>.com/api/signup)
app.post('/login', login) //login route (https://<baseurl>.com/api/login)
app.post('/signup/google', googleSignupHandle);
app.post('/user/image', FBAuth, uploadImage); //upload image route - it's a protected route
app.post('/user', FBAuth, addUserDetails); //add user details route 
app.get('/user', FBAuth, getAuthenticatedUser); //get user details route
//https://<baseurl>.com/api/ 
app.get('/user/:handle', getUserDetails);
app.post('/user/:handle/changeHandle', FBAuth, changeUserHandle);
app.get('/users', getAllUsers);
app.post('/notifications', FBAuth, markNotificationRead);
// app.get('/notifications/:handle', getAuthenticatedUserNotifications);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore.document('/likes/{id}')
    .onCreate((snapshot) => { //snapshot of the liked document
        console.log(`snapshotdata ${snapshot.data().userHandle}`);
        return db.doc(`/posts/${snapshot.data().postId}`).get()
            .then((doc) => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) { // not get notification if a user likes their own post
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        postId: doc.id
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    });

exports.deleteNotificationOnUnlike = functions.firestore.document('/likes/{id}') //delete notification when a post is unliked
    .onDelete((snapshot) => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch((err) => {
                console.error(err);
            });

    });

exports.createNotificationOnComment = functions.firestore.document('/comments/{id}')
    .onCreate((snapshot) => {
        console.log(`snapshotdata${JSON.stringify(snapshot.data())}`);
        return db.doc(`/posts/${snapshot.data().postId}`).get()
            .then((doc) => { // snapshot refer to the comment, doc refers to the post
                /* make new notification when a user got mentioned in some comment */
                if (doc.exists && snapshot.data().mentions.length > 0) {
                    snapshot.data().mentions.map((mention) => {
                        console.log(`check notification mention ${snapshot.id + mention.name}`)
                        return db.doc(`/notifications/${snapshot.id + mention.name}`).set({
                            createdAt: new Date().toISOString(),
                            recipient: mention.name, //mention contains user's data of key 'name', which is essentially the userHanle
                            sender: snapshot.data().userHandle,
                            type: 'mention',
                            read: false,
                            postId: doc.id,
                            commentId: snapshot.id
                        });
                    })
                }
                /* make new notifcation when someone commented on the user's post  */
                else if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) { // not get notification if user comments on their own post
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        postId: doc.id,
                        commentId: snapshot.id
                    });
                }
                console.log(`mentions length ${snapshot.data().mentions.length}`)
            })
            .catch((err) => {
                console.error(err);
            });
    });

exports.createNotificationonRepliedComment = functions.firestore.document('/repliedComments/{id}')
    .onCreate((snapshot) => {
        console.log(`snapshotdata${JSON.stringify(snapshot.data())}`);
        return db.doc(`/posts/${snapshot.data().postId}`).get()
            .then((doc) => {
                /* make new notification when a user got mentioned in a replied comment */
                if (doc.exists && snapshot.data().mentions.length > 0) {
                    snapshot.data().mentions.map((mention) => {
                        console.log(`check notification mention ${snapshot.id + mention.name}`)
                        return db.doc(`/notifications/${snapshot.id + mention.name}`).set({
                            createdAt: new Date().toISOString(),
                            recipient: mention.name, //mention contains user's data of key 'name', which is essentially the userHanle
                            sender: snapshot.data().userHandle,
                            type: 'mention',
                            read: false,
                            postId: doc.id,
                            parentCommentId: snapshot.data().parentCommentId,
                            repliedCommentId: snapshot.id
                        });
                    })
                }
                else if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) { // not get notification if user replied to their own comment
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'repliedComment',
                        read: false,
                        postId: doc.id,
                        parentCommentId: snapshot.data().parentCommentId,
                        repliedCommentId: snapshot.id
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    })


exports.onUserImageChange = functions.firestore.document('/users/{userId}') // if user change their profile pic => update it on all posts
    .onUpdate((change) => {
        console.log(change.before.data());
        console.log(change.after.data());
        if (change.before.data().imageUrl !== change.after.data().imageUrl) { // only check when user change their profile pic, not their bios etc.
            console.log('image has changed');
            let batch = db.batch();
            return db
                .collection('posts')
                .where('userHandle', '==', change.before.data().handle)
                .get()
                .then((data) => {
                    data.forEach((doc) => {
                        const post = db.doc(`/posts/${doc.id}`);
                        batch.update(post, { userImage: change.after.data().imageUrl });
                    })
                    return batch.commit();
                });
        } else return true; // nothing change if user change their bio 
    });

exports.onPostDelete = functions.firestore.document('/posts/{postId}')
    .onDelete((snapshot, context) => {
        const postId = context.params.postId;
        const batch = db.batch();
        return db.collection('comments').where('postId', '==', postId).get()
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                    
                    // delete all the replied comments of each comment in the post to be deleted
                    db.collection('repliedComments').where('parentCommentId', '==', doc.id).get()
                        .then((data) => {
                            data.forEach((doc) => {
                                batch.delete(db.doc(`/repliedComments/${doc.id}`));
                            })
                        })
                });
                return db.collection('likes').where('postId', '==', postId).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                });
                return db.collection('notifications').where('postId', '==', postId).get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();
            })
            .catch((err) => console.error(err));

    });