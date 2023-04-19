const express = require('express');
const app = express();
const port = 3000;
const YAML = require('yamljs');

app.use(express.json());

// Load routes from routes.js file
const routes = require('./routes');
app.use('/api', routes);

// function to fetch users from api/users and display in a bootstrap table
async function indexPage() {
  let contentStart = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Users API</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  </head>
  <body>

  <div class="container">

    <!-- blank row -->
    <div class="row">
      <div class="col-sm-12">
        <p></p>
      </div>
    </div>

    <div class="jumbotron text-center">
      <h1>Users API</h1>
      <p>Simple site with list of users.</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h3>API Docs</h3>
          <a href="/redoc" class="btn btn-primary" role="button">API Docs</a>
        </div>
      </div>
    </div>
  `;

  let userTable = fetch('http://localhost:3000/api/users')
    .then((response) => response.json())
    .then((data) => {
      // console.log('Success:', data);
      // use bootstrap to style the table
      let table = `
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Emoji</th>
            </tr>
          </thead>
          <tbody>
      `;

      for (let i = 0; i < data.length; i++) {
        table += `
          <tr>
            <th scope="row">${data[i].id}</th>
            <td>${data[i].name}</td>
            <td>${data[i].emoji}</td>
          </tr>
        `;
      }

      table += `
          </tbody>
        </table>
      `;

      return table;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  let contentEnd = `
  </div>

  </body>
  </html>
  `;

  let response = contentStart;

  // wait for userTable to be populated
  await userTable.then((table) => {
    response += table;
  });

  response += contentEnd;

  return response;
}

// Default route which serves link to API documentation
app.get('/', async(req, res) => {
  // Log the request to the console with the source IP address, request method and URL
  console.log(`${req.ip} ${req.method} ${req.url}`);
  // log query parameters
  console.log(req.query);
  res.send(await indexPage());
});

// serve openapi.yaml as openapi.json
app.get('/openapi.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(YAML.load('./src/openapi.yaml'));
});

// Serve redoc content
app.get('/redoc', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(require('./redoc'));
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
