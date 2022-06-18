const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, name } = req.user;
  if (!email || !name) {
    res.status(400).json({ message: 'Incorrect body' });
    return;
  }
  const user = await controller.createUser({ email, name });
  res.status(200).json(user);
});

router.get('/profile', async (req, res) => {
  const { email, name } = req.user;
  if (!email || !name) {
    res.status(400).json({ message: 'Incorrect body' });
    return;
  }
  const user = await controller.getProfile({ email, name });

  res.status(200).json(user);
});

router.get('/leaderboard', async (req, res) => {
  const mode = req.query.mode;
  const leaderboard = await controller.getLeaderboard(mode);
  res.status(200).json(leaderboard);
});

router.put('/score', async (req, res) => {
  const { timeRemaining, questionsAnswered } = req.body;
  if (isNaN(timeRemaining) || isNaN(questionsAnswered)) {
    res.status(400).json({ message: 'Incorrect body' });
    return;
  }
  const response = await controller.saveScore(req.params.id, req.body);
  res.status(200).json(response);
});

router.get('/:id', (req, res) => {});

module.exports = router;
