const User = require('../../Models/User');

module.exports = {
  async getProfile({ email, name }) {
    let user = await User.findOne({ email });

    if (!user) {
      user = await new User({ email, name }).save();
    }

    return user;
  },
  async saveScore(email, score) {
    const user = await User.findOne({ email });

    user[`hi_score_${score.mode}`] = {
      time_left: score.timeRemaining,
      score: score.questionsAnswered,
    };

    const resp = await user.save();

    return resp;
  },

  async createUser({ email, name }) {
    const user = new User({
      email,
      name,
    });

    const resp = await user.save();

    return resp;
  },

  async getLeaderboard(mode = 'classic') {
    const sortOptions = {};
    sortOptions[`hi_score_${mode}.score`] = -1;
    sortOptions[`hi_score_${mode}.time_left`] = -1;
    const leaderboarders = await User.find({}).limit(10).sort(sortOptions);
    return leaderboarders;
  },
};
