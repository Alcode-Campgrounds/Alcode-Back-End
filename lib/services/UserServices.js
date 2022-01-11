const bcrypt = require('bcryptjs');
const User = require('../models/Auth');

module.exports = class UserService{
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
