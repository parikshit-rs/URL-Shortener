const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a URL schema
const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
});

// Create a URL model
const Url = mongoose.model('Url', urlSchema);

// Configure EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// URL shortening route
app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  // Generate a short URL
  const shortUrl = generateShortUrl();

  // Create a new URL entry in the database
  await Url.create({ longUrl, shortUrl });

  res.render('shortened', { shortUrl });
});

// URL redirection route
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  // Find the long URL based on the short URL
  const url = await Url.findOne({ shortUrl });

  if (url) {
    res.redirect(url.longUrl);
  } else {
    res.sendStatus(404);
  }
});

// URL search route
app.get('/search/:keyword', (req, res) => {
  const { keyword } = req.params;
  
  // Perform MongoDB Atlas Search
  Url.find({ $text: { $search: keyword } })
    .then((results) => {
      res.render('search', { keyword, results });
    })
    .catch((error) => {
      console.error('Error searching URLs:', error);
      res.render('search', { keyword, results: [] });
    });
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Function to generate a random short URL
function generateShortUrl() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortUrl = '';
  for (let i = 0; i < 6; i++) {
    shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shortUrl;
}
