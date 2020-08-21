const { db } = require('../util/admin');
const { user } = require('firebase-functions/lib/providers/auth');

exports.getAllPosts = (req, res) => {
    db.collection('posts')
        .orderBy('createdAt', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getAllPostsOrderedByLikes = (req, res) => {
    db.collection('posts')
        .orderBy('likeCount', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsById = (req, res) => {
    db.collection('posts')
        .where('titleId', '==', req.params.titleId) // title id stands for movie/tv title id
        .orderBy('createdAt', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByIdOrderedByLikes = (req, res) => {
    db.collection('posts')
        .where('titleId', '==', req.params.titleId) // title id stands for movie/tv title id
        .orderBy('likeCount', 'desc')
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByOpinion = (req, res) => {
    db.collection('posts')
        .where('opinion', '==', true) // title id stands for movie/tv title id
        .orderBy('createdAt', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByOpinionOrderedByLikes = (req, res) => {
    db.collection('posts')
        .where('opinion', '==', true) // title id stands for movie/tv title id
        .orderBy('likeCount', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}
exports.getPostsByFunFact = (req, res) => {
    db.collection('posts')
        .where('funFact', '==', true)
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByFunFactOrderedByLikes = (req, res) => {
    db.collection('posts')
        .where('funFact', '==', true)
        .orderBy('likeCount', 'desc')
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByPlotHoles = (req, res) => {
    db.collection('posts')
        .where('plotHoles', '==', true) 
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByPlotHolesOrderedByLikes = (req, res) => {
    db.collection('posts')
        .where('plotHoles', '==', true) 
        .orderBy('likeCount', 'desc')
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByIdByOpinion = (req, res) => {
    db.collection('posts')
        .where('titleId', '==', req.params.titleId)
        .where('opinion', '==', true)
        .orderBy('createdAt', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByIdByFunFact = (req, res) => {
    db.collection('posts')
        .where('titleId', '==', req.params.titleId)
        .where('funFact', '==', true)
        .orderBy('createdAt', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByIdByPlotHoles = (req, res) => {
    db.collection('posts')
        .where('titleId', '==', req.params.titleId)
        .where('plotHoles', '==', true)
        .orderBy('createdAt', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByIdByOpinionOrderedByLikes = (req, res) => {
    db.collection('posts')
        .where('titleId', '==', req.params.titleId)
        .where('opinion', '==', true)
        .orderBy('likeCount', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getPostsByIdByFunFactOrderedByLikes = (req, res) => {
    db.collection('posts')
        .where('titleId', '==', req.params.titleId)
        .where('funFact', '==', true)
        .orderBy('likeCount', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

exports.getPostsByIdByPlotHolesOrderedByLikes = (req, res) => {
    db.collection('posts')
        .where('titleId', '==', req.params.titleId)
        .where('plotHoles', '==', true)
        .orderBy('likeCount', 'desc')//orderBy by default is ascending order
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                console.log(`doc data ${doc.data()}`);
                posts.push({ // the object spread opereator ... is not avaiable in node 6, so we have to do it item by item like below
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                    userImage: doc.data().userImage,
                    postImage: doc.data().postImageUrl,
                    titleImdbId: doc.data().titleImdbId,
                    titleId: doc.data().titleId,
                    title: doc.data().title,
                    season: doc.data().season,
                    episode: doc.data().episode,
                    opinion: doc.data().opinion,
                    funFact: doc.data().funFact,
                    plotHoles: doc.data().plotHoles
                    //checkInLocation: doc.data().checkInLocation
                });
            });
            return res.json(posts);
        }) //get all documents in a collection
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.uploadAPost = (req, res) => {
    //if we get past down here then FBAuth has passed so basically we are authenticated
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must be empty' });
    }

    const isNull = (location) => {
        return location === null
    }

    const newPost = {
        body: req.body.body, //body of the request
        userHandle: req.user.handle, //can use req.user here because the data has been forwarded from FBAuth
        userImage: req.user.imageUrl,
        //postImage: req.body.postImageUrl,
        checkInLocation: req.body.checkInLocation ? req.body.checkInLocation : '',
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
        titleId: req.body.titleId ? req.body.titleId : '',
        titleImdbId: req.body.titleImdbId ? req.body.titleImdbId : '', //titleImdbId is the movie/tvshow's imdb id, have to separate this because for a post in the season section, its titleId is appended with the season number
        title: req.body.title ? req.body.title : '',
        season: req.body.season ? req.body.season : '',
        episode: req.body.episode ? req.body.episode : '',
        opinion: req.body.opinion,
        funFact: req.body.funFact,
        plotHoles: req.body.plotHoles
    };
    db.collection('posts')
        .add(newPost)
        .then((doc) => {
            const resPost = newPost;
            resPost.postId = doc.id; //can edit a key in the constant, can't change the data type or the complete value of the object
            res.json(resPost);
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        });
}


//fetch a post
exports.getPost = (req, res) => {
    let postData = {};
    db.doc(`/posts/${req.params.postId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Post not found' });
            }
            postData = doc.data();
            postData.postId = doc.id;
            return db
                .collection('comments')
                .orderBy('createdAt', 'desc')
                .where('postId', '==', req.params.postId)
                .get(); //the the postId of a comment to the postId provided by request
        })
        .then((data) => {
            postData.comments = [];
            data.forEach((doc) => {
                const commentData = doc.data();
                commentData.commentId = doc.id;
                // TODO: REMOVE THIS
                //commentData.setScrollToComment = false;
                //commentData.repliedComments = [];
                postData.comments.push(commentData);
            });
            return res.json(postData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}

exports.getComment = (req, res) => {
    let commentData = {};
    db.doc(`/comments/${req.params.commentId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            commentData = doc.data();
            commentData.commentId = doc.id;
            return db
                .collection('repliedComments')
                .orderBy('createdAt', 'desc')
                .where('parentCommentId', '==', req.params.commentId)
                .get();
        })
        .then((data) => {
            commentData.repliedComments = [];
            data.forEach((doc) => {
                const repliedCommentData = doc.data();
                repliedCommentData.repliedCommentId = doc.id;
                commentData.repliedComments.push(repliedCommentData);
            });
            return res.json(commentData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        })
}

exports.getRepliedComment = (req, res) => {
    let repliedCommentData = {};
    db.doc(`/repliedComments/${req.params.repliedCommentId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Replied comment not found' });
            }
            repliedCommentData = doc.data();
            repliedCommentData.repliedCommentId = doc.id;
            return res.json(repliedCommentData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}


// Comment on a post
exports.commentOnPost = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ comment: 'Must not be empty' });
    }
    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        postId: req.params.postId,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        mentions: req.body.mentions ? req.body.mentions : '',
        repliedCommentsCount: 0,
        setScrollToComment: false,
        repliedComments: []
    };

    db.doc(`/posts/${req.params.postId}`).get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Post not found' });
            }
            return doc.ref.update({ commentCount: doc.data().commentCount + 1 }); //increment comment count
        })
        .then(() => {
            return db.collection('comments')
                .add(newComment)
                .then((doc) => {
                    const resComment = newComment;
                    resComment.commentId = doc.id; //can edit a key in the constant, can't change the data type or the complete value of the object
                    res.json(resComment);
                })
                .catch(err => {
                    res.status(500).json({ error: 'something went wrong' });
                    console.error(err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
}

exports.replyCommentOnPost = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ comment: 'Must not be empty' });
    }
    const repliedComment = {
        parentCommentId: req.params.commentId,
        body: req.body.body,
        createdAt: new Date().toISOString(),
        postId: req.params.postId,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        mentions: req.body.mentions ? req.body.mentions : ''
    };

    db.doc(`/comments/${req.params.commentId}`).get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            return doc.ref.update({ repliedCommentsCount: doc.data().repliedCommentsCount + 1 }); //increment comment count
        })
        .then(() => {
            return db.collection('repliedComments').add(repliedComment)
                .then((doc) => {
                    const resRepliedComment = repliedComment;
                    resRepliedComment.repliedCommentId = doc.id;
                    res.json(resRepliedComment);
                })
                .catch(err => {
                    res.status(500).json({ error: 'something went wrong' });
                    console.error(err);
                });
        })
        .then(() => {
            res.json(repliedComment);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
}

//like a post
exports.likePost = (req, res) => {
    const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle) //user handle of the like is the same as the userhandle of the user who's trying to like the post
        .where('postId', '==', req.params.postId).limit(1); //return an array of 1 document

    const postDocument = db.doc(`/posts/${req.params.postId}`);

    let postData;

    postDocument.get()
        .then((doc) => {
            if (doc.exists) { //check if the post itself exist
                postData = doc.data();
                postData.postId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Post not found' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return db.collection('likes').add({
                    postId: req.params.postId,
                    userHandle: req.user.handle
                })
                    .then(() => {
                        postData.likeCount++;
                        return postDocument.update({ likeCount: postData.likeCount }) //updata the likecount in the database 
                    })
                    .then(() => {
                        return res.json(postData);
                    })
            } else { //the post is already liked by this user
                return res.status(400).json({ error: 'Post already liked' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

exports.unlikePost = (req, res) => {
    const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle) //user handle of the like is the same as the userhandle of the user who's trying to like the post
        .where('postId', '==', req.params.postId).limit(1); //return an array of 1 document

    const postDocument = db.doc(`/posts/${req.params.postId}`);

    let postData;

    postDocument.get()
        .then((doc) => {
            if (doc.exists) { //check if the post itself exist
                postData = doc.data();
                postData.postId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Post not fount' });
            }
        })
        .then((data) => {
            if (data.empty) {
                return res.status(400).json({ error: 'Post is not liked' }); //thus cannot be unliked
            } else { //the post is already liked by this user
                return db.doc(`/likes/${data.docs[0].id}`)
                    .delete()
                    .then(() => {
                        postData.likeCount--;
                        return postDocument.update({ likeCount: postData.likeCount });
                    })
                    .then(() => {
                        res.json(postData);
                    })
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// delete a post
exports.deletePost = (req, res) => {
    const document = db.doc(`/posts/${req.params.postId}`);
    document.get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Post not found' });
            }
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).json({ error: 'Unauthorized' });
            } else {
                return document.delete();
            }
        })
        .then(() => {
            res.json({ message: 'Post has been deleted successfully' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
};

