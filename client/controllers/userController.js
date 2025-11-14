const model = require('../models/user');
const Event = require('../models/event');
const rsvpModel = require('../models/rsvp');

let baseEventUrl = 'http://localhost:5016/Event/';
let baseUserUrl = 'http://localhost:5016/User/';
let baseRsvpUrl = 'http://localhost:5016/Rsvp/';

async function getEvents() {
    // const url = 'http://localhost:5016/My/CreateEvent';
    let url = baseEventUrl + 'GetEvents'
    const data = {
        id: 1,
        title: "health",
        description: "alcohol",
        date: "2025-09-04T01:02:00.945Z"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('getEvents.response:', response);
        const result = await response.json();
        console.log('getEvents.Success:', result);
        events = result;
        return events;
    } catch (error) {
        console.error('getEvents.Error:', error);
    }
}

async function getUsers(res) {
    // const url = 'http://localhost:5016/My/CreateEvent';
    let url = baseUserUrl + 'GetUsers'
    const data = {
        id: 1,
        title: "health",
        description: "alcohol",
        date: "2025-09-04T01:02:00.945Z"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('getUsers.response:', response);
        const result = await response.json();
        console.log('getUsers.Success:', result);
        users = result;
        return users;
    } catch (error) {
        console.error('getUsers.Error:', error);
    }
}

async function getRsvps(res) {
    // const url = 'http://localhost:5016/My/CreateEvent';
    let url = baseRsvpUrl + 'GetRsvps'
    const data = {
        id: 1,
        title: "health",
        description: "alcohol",
        date: "2025-09-04T01:02:00.945Z"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('getRsvps.response:', response);
        const result = await response.json();
        console.log('getRsvps.Success:', result);
        rsvps = result;
        return rsvps;
    } catch (error) {
        console.error('getRsvps.Error:', error);
    }
}

exports.new = (req, res) => {
    res.render('./user/new');
};

exports.create = (req, res, next) => {
    console.log('create:req.body', req.body);
    let user = new model(req.body);
    if (user.email) {
        user.email = user.email.toLowerCase();
    }
    user.save()
        .then(user => res.redirect('/users/login'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/users/new');
            }

            if (err.code === 11000) {
                req.flash('error', 'Email has been used');
                return res.redirect('/users/new');
            }

            next(err);
        });
};

exports.getUserLogin = (req, res, next) => {
    res.render('./user/login');
}

exports.login = (req, res, next) => {

    let email = req.body.email;
    if (email) {
        email = email.toLowerCase();
    }

    let password = req.body.password;
    model.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('wrong email address');
                req.flash('error', 'wrong email address');
                res.redirect('/users/login');
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            // req.session.user = user._id;
                            req.session.user = user;
                            res.locals.user = user;
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/events');
                        } else {
                            req.flash('error', 'wrong password');
                            res.redirect('/users/login');
                        }
                    });
            }
        })
        .catch(err => next(err));
};

exports.profile = async (req, res, next) => {
    let id = req.session.user._id;
    console.log('profile.id', id);

    events = await getEvents();
    let categories = [...new Set(events.map(event => event.category))].sort();
    console.log('profile.events:', events);
    foundEvents = events.filter(r => r.host === id);
    console.log('profile.foundEvents', foundEvents);
    events = foundEvents;

    users = await getUsers();
    console.log('profile.users:', users);
    foundUser = users.find(r => r._id === id);
    console.log('profile.foundUser', foundUser);
    user = foundUser;

    rsvps = await getRsvps();
    console.log('profile.rsvps:', rsvps);
    foundRsvps = rsvps.filter(r => r._id === id);
    console.log('profile.foundRsvps', foundRsvps);
    if (foundRsvps) {
      rsvps = foundRsvps;  
    }else{
        rsvps =[];
    }
    

    res.render('./user/profile', { user, events, categories, rsvps })

    // Promise.all([model.findById(id), Event.find({ host: id }), rsvpModel.find({ user: id }).populate('event')])
    //     .then(results => {
    //         const [user, events, rsvps] = results
    //         console.log('profile:rsvps', rsvps);
    //         let categories = [...new Set(events.map(event => event.category))].sort();
    //         res.render('./user/profile', { user, events, categories, rsvps })
    //     })
    //     .catch(err => next(err));
};


exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });

};



