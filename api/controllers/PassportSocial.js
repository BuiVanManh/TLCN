var FacebookStrategy = require('passport-facebook').Strategy; // Import Passport-Facebook Package
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; // Import Passport Google Package
var User = require('../models/UserModel'); // Import User Model
var session = require('express-session'); // Import Express Session Package
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrypotter'; // Create custom secret to use with JWT

module.exports = function(app, passport) {
    // Start Passport Configuration Settings
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));
    // End Passport Configuration Settings

    // Serialize users once logged in   
    passport.serializeUser(function(user, done) {
        // Check if the user has an active account
        if (user.active) {
            // Check if user's social media account has an error
            if (user.error) {
                token = 'unconfirmed/error'; // Set url to different error page
            } else {
                token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // If account active, give user token
            }
        } else {
            token = 'inactive/error'; // If account not active, provide invalid token for use in redirecting later
        }
        done(null, user.id); // Return user object
    });

    // Deserialize Users once logged out    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user); // Complete deserializeUser and return done
        });
    });

    // Facebook Strategy    
    passport.use(new FacebookStrategy({
            clientID: '836493403178355', // Replace with your Facebook Developer App client ID
            clientSecret: 'a25a84f5e8a58966f308d16dd34df1ba', // Replace with your Facebook Developer client secret
            callbackURL: "http://localhost:3000/auth/facebook/callback", // Replace with your Facebook Developer App callback URL
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            User.findOne({ email: profile._json.email }).select('username active password email').exec(function(err, user) {
                if (err) done(err);

                if (user && user !== null) {
                    done(null, user);
                } else {
                    done(err);
                }
            });
        }
    ));

    // Google Strategy  
    passport.use(new GoogleStrategy({
            clientID: '852222686887-ld3cnfu1g76lpi0bgrmpbr37css6c3o0.apps.googleusercontent.com', // Replace with your Google Developer App client ID
            clientSecret: 'j-k8frTBw-6u-De6vPqk3uSI', // Replace with your Google Developer App client ID
            callbackURL: "http://www.herokutestapp3z24.com/auth/google/callback" // Replace with your Google Developer App callback URL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({ email: profile.emails[0].value }).select('username active password email').exec(function(err, user) {
                if (err) done(err);

                if (user && user !== null) {
                    done(null, user);
                } else {
                    done(err);
                }
            });
        }
    ));

    // Google Routes    
    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/googleerror' }), function(req, res) {
        res.redirect('/google/' + token); // Redirect user with newly assigned token
    });

    // Facebook Routes
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/facebookerror' }), function(req, res) {
        res.redirect('/facebook/' + token); // Redirect user with newly assigned token
    });
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    return passport; // Return Passport Object
};
