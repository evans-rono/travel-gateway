// app_server/controllers/auth.js

const login = (req, res) => {
  res.render('login', {
    title: 'Travlr Getaways | Sign In'
  });
};

const signup = (req, res) => {
  res.render('signup', {
    title: 'Travlr Getaways | Sign Up'
  });
};

module.exports = { login, signup };