require('dotenv').config(); //lets us use .env and gitignore
const express = require('express'),
session = require('express-session'),
bodyParser = require('body-parser'),
massive = require('massive'),
passport = require('passport'),
Auth0Strategy = require('passport-auth0')
controller = require('./controller');


const app = express();

app.use(bodyParser.json() );
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true
}))

//the order here matters after the app.use(session) config is set up you must initialize passport and then set up passport with session
app.use(passport.initialize() );
app.use(passport.session() );

// app.use( express.static( `${__dirname}/../build` ) ); //setting up droplet and build server

//after the app.use's reference massive and connect it to your database URI. No idea why it's a URI and not a URL it just is :p
massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db',db) //use a .then after the db connection because it returns a promise. use a callbackfunction in the .then() that takes db as the param. use app.set to set the string 'db' to the db parameter.
    
})


//all the properties on the new auth0strategy are case sensitive!!
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL
}, 
    function(accessToken, refreshToken, extraParams, profile, done){
    //db calls will go here
    
    const db = app.get('db') //after db is set, make a const that is equal to an app.get('db');
    // console.log(db)
    //reference the db file find_user.sql and pass in what you want to get back. you can find what it is using a breakpoint in the debugger and looking at all the values.
    db.find_user([ profile.identities[0].user_id ]).then( user => {
        if (user[0]) {
            
           return done(null, user[0].id)//after you check for user_id use a .then with a cb function that checks for a user, if user is there invoke done with null, and user[0].id
        } else {
            const user = profile._json
            // console.log(user)
            db.create_user([user.name, user.email, user.picture, user.identities[0].user_id])
            .then( user => {
              return done(null, user[0].id);
            })
        }
    }) 

}));
//Make sure to turn off OIDC Conformant in Auth0.com client settings (advanced settings in the 0Auth tab)

app.get('/auth', passport.authenticate('auth0'));//you MUST pass in the exact string of 'auth0' for it to work.
app.get('/auth/callback', passport.authenticate('auth0', {// the second argument on the authenticate here is an object with success and fail redirect paths
    successRedirect:process.env.SUCCESS_REDIRECT,
    failureRedirect:'/auth'
}));
 
app.get('/auth/me', (req, res) => {
    if (!req.user) {
        return res.status(404).send('User not found')
    } 
    return res.status(200).send(req.user);
})//endpoint checks if the user exists, if not throws an error, if so sends the user info

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, process.env.REACT_APP_LOGOUT)
})

passport.serializeUser( (id, done) => {
    
    done(null, id);//serializeUser takes a callback function that has id(from the db.find_user method) and done as params
});

passport.deserializeUser( (id, done) => {//deserializeUser also takes a callback function with id(from the db.find_user method) and done as params
    app.get('db').find_current_user([id])
    .then(user => {
        done(null, user[0]) //deserializeUser takes the current user information and puts the user object on to req.user; deserialize can only be accessed by someone who is already logged in and authorized on session.
    })
});

// this bit is for  deploying on a drplet
// const path = require('path')
// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// })

app.get('/api/getmemes', controller.getMemes)

app.get('/api/getonememe/:id', controller.getOneMeme)

app.get('/api/getfavorites/:id', controller.getFavorites)

app.post('/api/favoritememe', controller.favoriteMeme)

app.post('/api/addmeme', controller.addMeme)

app.delete('/api/unfavorite', controller.unfavMeme)

app.delete('/api/deletememe/:id', controller.deleteMeme)



const port = 3001;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})//NODEMON stands for node monitor. It monitors your node processes and files.