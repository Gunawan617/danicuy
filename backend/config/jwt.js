require('dotenv').config();

module.exports = {
  SECRET: process.env.SECRET || 'default_secret_key_for_development'
};
