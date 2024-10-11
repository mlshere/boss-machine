const express = require('express');
const apiRouter = express.Router();

const { getAllFromDatabase } = require('./db');
const { addToDatabase } = require('./db')
const { getFromDatabaseById } = require('./db');
const { updateInstanceInDatabase } = require('./db')
const { deleteFromDatabasebyId } = require('./db')
const { deleteAllFromDatabase } = require('./db')
const checkMillionDollarIdea = require('./checkMillionDollarIdea')


// Minions logic

apiRouter.get('/minions', (req, res, next) => {
    const minions = getAllFromDatabase('minions')
    res.send(minions)
});

apiRouter.post('/minions', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        res.send(minion);
    } else {
        res.status(404).send();
    }
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(404).send();
    }
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const success = deleteFromDatabasebyId('minions', req.params.minionId);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})


// Ideas logic

apiRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.status(404).send();
    }
  });
  
  apiRouter.get('/ideas', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
  });
  
  apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
  });
  
  apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    res.send(req.idea);
  });
  
  apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
  });
  
  apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

// Meetings logic

apiRouter.get('/meetings', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
})

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

apiRouter.delete('/meetings', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})

module.exports = apiRouter;
