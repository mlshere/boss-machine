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
apiRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minion', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
})

apiRouter.get('/minions', (req, res, next) => {
    const minions = getAllFromDatabase('minions')
    res.send(minions)
});

apiRouter.post('/minions', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
   res.send(req.minion);
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
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


// Bonus exercise
// GET all work for a specific minion
apiRouter.get('/minions/:minionId/work', (req, res) => {
    const work = getAllFromDatabase('work').filter((task) => {
      return task.minionId === req.params.minionId;
    });
    res.send(work);
  });
  
  // POST new work for a specific minion
  apiRouter.post('/minions/:minionId/work', (req, res) => {
    req.body.minionId = req.params.minionId;
    const newWork = addToDatabase('work', req.body);
    if (newWork) {
      res.status(201).send(newWork);
    } else {
      res.status(400).send();
    }
  });
  
  // PUT to update a specific work task
  apiRouter.put('/minions/:minionId/work/:workId', (req, res) => {
    const workToUpdate = getFromDatabaseById('work', req.params.workId);
    if (workToUpdate) {
      if (workToUpdate.minionId === req.params.minionId) {
        req.body.id = req.params.workId;
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
      } else {
        res.status(400).send();
      }
    } else {
      res.status(404).send();
    }
  });
  
  // DELETE a specific work task
  apiRouter.delete('/minions/:minionId/work/:workId', (req, res) => {
    const workToDelete = getFromDatabaseById('work', req.params.workId);
    if (workToDelete && workToDelete.minionId === req.params.minionId) {
      const success = deleteFromDatabasebyId('work', req.params.workId);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } else {
      res.status(400).send();
    }
  });
  
module.exports = apiRouter;
