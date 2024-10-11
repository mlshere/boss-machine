const express = require('express');
const app = express();
const apiRouter = express.Router();
module.exports = app;
const bodyParser = require('body-parser');
const cors = require('cors');
/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html

app.use(cors('short'))

// Add middware for parsing request bodies here:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

module.exports = apiRouter;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:

}
