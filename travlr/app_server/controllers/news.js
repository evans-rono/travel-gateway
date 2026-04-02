// app_server/controllers/news.js

const newsList = (req, res) => {
  const news = [
    {
      id: 1,
      title: 'Summer Getaway Special: 30% Off All Caribbean Packages',
      date: 'March 15, 2025',
      summary: 'Don\'t miss our biggest summer sale! Enjoy 30% discount on all Caribbean destinations including Cancun, Barbados, and Tahiti. Limited time offer!'
    },
    {
      id: 2,
      title: 'New Riviera Maya Eco-Resort Opens This April',
      date: 'March 10, 2025',
      summary: 'Exciting news! A brand new luxury eco-resort is opening in Riviera Maya. Experience sustainable luxury with stunning views and world-class amenities.'
    },
    {
      id: 3,
      title: 'Panama Canal Tour Package - March Event',
      date: 'March 8, 2025',
      summary: 'Join our special guided tour of the Panama Canal this March! Learn about engineering marvels while experiencing local culture and cuisine.'
    },
    {
      id: 4,
      title: 'Travel Tips: Best Time to Visit Barbados',
      date: 'March 5, 2025',
      summary: 'Planning your Barbados trip? Discover the best season, weather patterns, and local events to make the most of your vacation.'
    },
    {
      id: 5,
      title: 'Tahiti Fashion Festival Coming in April',
      date: 'March 1, 2025',
      summary: 'Mark your calendars! The Tahiti Fashion Festival is happening April 10-20. Experience Polynesian culture, fashion shows, and traditional performances.'
    },
    {
      id: 6,
      title: 'Spring Hiking Adventure in Cancun Region',
      date: 'February 28, 2025',
      summary: 'Explore cenotes and jungle trails in the Cancun region. Our guided hiking tours offer an adventure-filled experience with expert naturalists.'
    }
  ];

  res.render('news', {
    title: 'Travlr Getaways | News & Events',
    news
  });
};

module.exports = { newsList };