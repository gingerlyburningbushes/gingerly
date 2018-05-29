var main = require('./handlers/main.js');
var contest = require('./handlers/contest.js');
var vacation = require('./handlers/vacation.js');
var cart = require('./handlers/cart.js');
var cartValidation = require('./js/cartValidation.js');
var contact = require('./handlers/contact.js');
var samples = require('./handlers/sample.js');



module.exports = function(app) {
    app.get('/', main.home);
    app.get('/about', main.about);
    app.get('/newsletter', main.newsletter);
    app.post('/newsletter', main.newsletterProcessPost);
    app.get('/newsletter/archive', main.newsletterArchive);
    app.get('/thank-you', main.genericThankYou);

    //contest routes
    app.get('/contest/vacation-photo', contest.vacationPhoto);
    app.post('/contest/vacation-photo/:year/:month', contest.vacationPhotoProcessPost);
    app.get('/contest/vacation-photo/entries', contest.vacationPhotoEntries);

    //vacation routes
    app.get('/vacations', vacation.list);
    app.get('/vacation/:vacation', vacation.detail);
    app.get('/notify-me-when-in-season', vacation.notifyWhenInSeason);
    app.post('/notify-me-when-in-season', vacation.notifyWhenInSeasonProcessPost);

    //shopping cart routes
    app.get('/cart', cart.middleware,cartValidation.checkWaivers, cartValidation.checkGuestCounts, cart.home);
    app.get('/cart/add', cart.addProcessGet);
    app.post('/cart/add', cart.addProcessPost);
    app.get('/cart/checkout', cart.checkout);
    app.post('/cart/checkout', cart.checkoutProcessPost);
    app.get('/cart/thank-you', cart.thankYou);
    app.get('/eamil/cart/thank-you', cart.emailThankYou);
    app.get('/set-currency/:currency', cart.setCurrency);
    
    //contact
    app.get('/request-group-rate', contact.requestGroupRate);
    app.post('/request-group-rate', contact.requestGroupRateProcessPost);
    app.get('/contact', contact.home);
    app.post('/contact', contact.homeProcessPost);

    //test
    app.get('/jquery-test', samples.jqueryTest);
    app.get('/nursery-rhyme', samples.nurseryRhyme);
    app.get('/data/nursery-rhyme', samples.nurseryRhymeData);
    




};