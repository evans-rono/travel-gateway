// app_server/controllers/main.js
const index = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways | Home'
  });
};

module.exports = { index };