const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  credits: {
    type: Number,
    default: 0,
  },
});

userSchema.static(
  'findOneOrCreate',
  async function (filter = {}) {
    try {
      const user = await this.findOne(filter);

      if (!user) {
        return await this.create(filter);
      }

      return user;
    } catch (err) {
      throw err;
    }
  }
);

const User = model('User', userSchema);

module.exports = User;
