// const api = require('node-fetch');
const model = require('../models/event');
const rsvpModel = require('../models/rsvp');

const mongoose = require('mongoose');
const user = require('../models/user');
//const event = require('../models/event');
const { ObjectId } = mongoose.Types;
let baseEventUrl = 'http://localhost:5016/Event/';
let baseUserUrl = 'http://localhost:5016/User/';
let baseRsvpUrl = 'http://localhost:5016/Rsvp/';

async function loadEvents(res) {
    await getUsers();
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

        console.log('loadEvents.response:', response);
        const result = await response.json();
        console.log('loadEvents.Success:', result);
        events = result;
        let categories = [...new Set(events.map(event => event.category))].sort();
        res.render('./event/index', { events, categories });

    } catch (error) {
        console.error('loadEvents.Error:', error);
    }
}

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

async function createEvent(res, event) {

    let url = baseEventUrl + 'CreateEvent'
    const data = event;

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

        console.log('createEvent.response:', response);
        const result = await response.json();
        console.log('createEvent.Success:', result);

        res.redirect('/events');

    } catch (error) {
        console.error('createEvent.Error:', error);
    }
}

async function updateEvent(res, event) {
    console.log('updateEvent.event',event);
    let url = baseEventUrl + 'UpdateEvent'
    const data = event;
    // const data = {
    //     category: event.category,
    //     title: 'earning',
    //     detail: 'test',
    //     location: 'earning',
    //     startDate: '2025-09-04T21:03',
    //     endDate: '2025-09-04T21:03',
    //     _id: '68b9fef49e406be69906b419',
    //     host: '68b9e04c192abc3d11410975',
    //     filename: '../images/image-1757029859561-402931106.png'
    // };

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

        console.log('updateEvent.response:', response);
        const result = await response.json();
        console.log('updateEvent.Success:', result);

        res.redirect('/events/' + event._id)

    } catch (error) {
        console.error('updateEvent.Error:', error);
    }
}

async function deleteEvent(res, event) {

    let url = baseEventUrl + 'DeleteEvent'
    const data = event;

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

        console.log('deleteEvent.response:', response);
        const result = await response.json();
        console.log('deleteEvent.Success:', result);

        res.redirect('/events');

    } catch (error) {
        console.error('deleteEvent.Error:', error);
    }
}

exports.index = async (req, res, next) => {

    await loadEvents(res);
    // model.find()
    //     .then(events => {
    //         let categories = [...new Set(events.map(event => event.category))].sort();
    //         res.render('./event/index', { events, categories });
    //     })
    //     .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('./event/new');
};

exports.create = (req, res, next) => {
    let image = "../images/" + req.file.filename;
    console.log('create:image', image);
    let event = req.body;
    let objectId = new ObjectId(req.session.user._id);
    event.host = req.session.user._id;
    event.filename = image;
    console.log('create:event', event);
    createEvent(res, event);
    // let newEvent = new model(event); // create new document
    // newEvent.save()
    //     .then(newEvent => {
    //         console.log('create:newEvent', newEvent);
    //         res.redirect('/events');
    //     })
    //     .catch(err => {

    //         if (err.name === 'ValidationError') {
    //             req.flash('error', err.message);
    //             return res.redirect('back');

    //         }

    //         next(err)
    //     });

};

exports.show = async (req, res, next) => {
    console.log('show', req.params.id)
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        console.error("Invalid ID format:", id);
        let err = new Error('Invalid Event ID');
        err.status = 400;
        next(err);

    }

    console.log('show:id:', id);
    events = await getEvents();
    console.log('show:events:', events);
    foundEvent = events.find(r => r._id === id);
    console.log('show.foundEvent', foundEvent);

    if (!foundEvent) {
        let err = new Error('Can not find the event with id:' + id);
        err.status = 404;
        return next(err);
    }

    users = await getUsers();
    console.log('show:users:', users);
    foundUser = users.find(r => r._id === foundEvent.host);
    console.log('show.foundUser', foundUser);
    foundEvent.host = foundUser;

    // Get RSVPs for this specific event from MongoDB
    let rsvps = await rsvpModel.find({ event: id }).populate('user', 'firstname lastname');
    console.log('show:rsvps:', rsvps);

    let event = foundEvent;
    res.render('./event/show', { event, rsvps });
    // model.findById(id).populate('host')
    // Promise.all([model.findById(id).populate('host'), rsvpModel.find({ event: id, status: 'yes' })])
    //     .then(results => {
    //         if (results) {
    //             const [event, rsvps] = results;
    //             console.log('show:event', event);
    //             console.log('show:rsvps', rsvps);
    //             res.render('./event/show', { event, rsvps });
    //         }
    //         else {
    //             let err = new Error('Can not find the event with id:' + id);
    //             err.status = 404;
    //             next(err);
    //         }
    //     })
    //     .catch(err => next(err));
};

exports.edit = async (req, res, next) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        console.error("Invalid ID format:", id);
        let err = new Error('Invalid Event ID');
        err.status = 400;
        return next(err);
    }

    try {
        // Fetch events from F# API
        events = await getEvents();
        console.log('edit:events:', events);
        
        // Find the event by ID
        let editEvent = events.find(r => r._id === id);
        
        if (!editEvent) {
            let err = new Error('Can not find the event with id:' + id);
            err.status = 404;
            return next(err);
        }

        console.log('edit:editEvent', editEvent);
        
        // Format dates for datetime-local input (YYYY-MM-DDTHH:mm)
        let startDate = new Date(editEvent.startDate);
        let endDate = new Date(editEvent.endDate);
        
        // Convert to ISO string and extract date-time part (YYYY-MM-DDTHH:mm)
        let startDateISOString = startDate.toISOString();
        let endDateISOString = endDate.toISOString();

        let event = {
            _id: editEvent._id,
            category: editEvent.category,
            title: editEvent.title,
            host: editEvent.host,
            detail: editEvent.detail,
            location: editEvent.location,
            startDate: startDateISOString.substring(0, 16),
            endDate: endDateISOString.substring(0, 16),
            filename: editEvent.filename
        };

        console.log('edit:event', event);
        res.render('./event/edit', { event });
    } catch (err) {
        next(err);
    }
};

exports.update = (req, res, next) => {
    let image = "../images/" + req.file.filename;
    console.log('update:image', image);
    let id = req.params.id;
    console.log('update:id:', id);
    if (!ObjectId.isValid(id)) {
        console.error("Invalid ID format:", id);
        let err = new Error('Invalid Event ID');
        err.status = 400;
        next(err);
    }

    let event = req.body;
    event._id = id;
    event.host = req.session.user._id;
    event.filename = image;
    console.log('update:event', event);
    updateEvent(res,event);
    // createEvent(event);
    // model.findByIdAndUpdate(id, updateEvent, { runValidators: true }).populate('host')
    //     .then(event => {
    //         console.log('update:event', event);
    //         if (event) {
    //             updateEvent.host = event.host;
    //             event = updateEvent;
    //             res.redirect('/events/' + event._id)
    //             // res.render('./event/show', { event });

    //         }
    //         else {
    //             let err = new Error('Can not find the event with id:' + id);
    //             err.status = 404;
    //             next(err);
    //         }
    //     })
    //     .catch(err => {

    //         if (err.name === 'ValidationError') {
    //             req.flash('error', err.message);
    //             return res.redirect('back');
    //         }

    //         next(err)
    //     });
};

exports.delete = async (req, res, next) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        console.error("Invalid ID format:", id);
        let err = new Error('Invalid Event ID');
        err.status = 400;
        return next(err);
    }

    console.log('delete:id:', id);

    // First, delete all RSVPs associated with this event from MongoDB
    try {
        const deleteResult = await rsvpModel.deleteMany({ event: id });
        console.log('delete:rsvps deleted:', deleteResult.deletedCount);
    } catch (rsvpError) {
        console.error('delete:rsvp deletion error:', rsvpError);
        // Continue with event deletion even if RSVP deletion fails
    }

    // Then delete the event via F# API
    let event = {
        _id: id
    };
    
    deleteEvent(res, event);
};

exports.rsvp = (req, res, next) => {
    console.log('rsvp:req', req.query.status);
    let status = req.query.status
    let id = req.params.id;
    console.log('rsvp:user', req.session.user);
    let rsvpObject = {
        status: status,
        event: id,
        user: req.session.user._id
    }
    console.log('rsvp', rsvpObject);
    if (!ObjectId.isValid(id)) {
        console.error("Invalid ID format:", id);
        let err = new Error('Invalid Event ID');
        err.status = 400;
        next(err);
    }

    rsvpModel.updateOne({ event: rsvpObject.event, user: rsvpObject.user }, rsvpObject, { upsert: true })
        // model.findById(id)
        .then(result => {
            if (result) {
                console.log('rsvp:result', result);
                res.redirect('/users/profile');
            }
            else {
                let err = new Error('Can not find the event with id:' + id);
                err.status = 404;
                next(err);
            }

        })
        .catch(err => {

            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('back');
            }

            next(err)
        });
};
