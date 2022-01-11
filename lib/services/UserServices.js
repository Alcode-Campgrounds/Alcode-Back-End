const bcrypt = require('bcryptjs');
const User = require('../models/Auth');
const { getTokens, fetchGoogleUser } = require('../utils/authHelper');

module.exports = class UserService {
  //google Oauth
  static async createOauth(code) {
    const { id_token, access_token } = await getTokens({
      code,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    const user = await fetchGoogleUser(id_token, access_token);
    let profile = await User.getEmail(user.email);
    if (!profile) {
      //problem where insert does not have a passwordhash for googleOauth
      profile = await User.insertOauth({
        name: user.name,
        email: user.email,
        passwordHash: 'Oauth',
      });
    }
    return profile;
  }

  // regular login
  static async create({ name, email, password }){
    const priorUser = await User.getEmail(email);
    
    if (priorUser){
      throw new Error('User already exists for the email provided');
    }
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        
    const newUser = await User.insert(name, email, passwordHash);
    return newUser;
  }
  static async credential({ email, password }){
    const loggedIn = await User.getEmail(email);
    if (!loggedIn){
      throw new Error('Email/password incorrect');
    }
    const correctPassword = await bcrypt.compare(password, loggedIn.passwordHash);
        
    if (!correctPassword){
      throw new Error('Email/password incorrect');
    }
    return loggedIn;
  }
};
