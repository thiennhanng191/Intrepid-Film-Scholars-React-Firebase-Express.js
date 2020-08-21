let db = [
    user: [
        {
            userId: 'hdhagsafhw98w4',
            email: 'user@gmail.com',
            handle: 'user',
            createdAt: '2020-05-06T19:32:47.614Z',
            imageUrl: 'image/adsfasdfadf/adsfasdfadf',
            bio: 'Hello, my name is user, nice to meet you',
            website: 'https://user.com',
            location: 'Poughkeepsie, NY'
        }
    ]
    posts: [
        {
            userHandle: 'user' //idendify who's the owner of the post 
            body: 'this is the scream body',
            createdAt: '2020-05-06T19:32:47.614Z'
            likeCount: 5, 
            commentCount: 2
        }
    ], 
    comments: [
        {
            userHandle: 'user',
            postId: 'adfasdfasfd',
            body: 'very interesting',
            createdAt: '2020-05-06T19:32:47.614Z'
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'anotheruser',
            read: 'true |false',
            postId: 'alisufarf',
            type: 'like | comment',
            createdAt: '2020-05-06T19:32:47.614Z'
        }
    ]
]

const userDetails = {
    //Redux data 
    credentials: {
        userId: 'SDFQIUWEH23RQSV',
        email: 'user@gmail.com',
        handle: 'user',
        createdAt: '2020-05-06T19:32:47.614Z',
        imageUrl: 'image/adsfasdfadf/adsfasdfadf',
        bio: 'Hello, my name is user, nice to meet you',
        website: 'https://user.com',
        location: 'Poughkeepsie, NY'
    },
    likes: [
        {
            userHandle: 'user',
            postId: 'sgsfgdsfg2323',
            createdAt: '2020-05-06T19:32:47.614Z'
        }, 
        {
            userHandle: 'user',
            postId: '13eg223fDGDFG'
        }
    ]
};