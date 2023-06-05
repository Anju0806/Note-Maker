const express = require('express');
const htmlRoutes=require('./routes/htmlRoutes');
const api = require('./routes/apiRoutes.js');
const PORT = process.env.port || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/',htmlRoutes)
app.use(express.static('public'));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
app.use((req, res) => {
  res.status(404).send('Not Found');
});
// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});