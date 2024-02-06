const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3003;

// Use body-parser middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());

const BASE_URL = 'https://api.parasut.com';
const CLIENT_ID = '6Qd-wYZBXCzuQcvJCgAW3oWM0la74PskJAGpwpZEUzk';
const CLIENT_SECRET = 'nqmi1EjrJ1fa6wFO6DKMBhsGTEkW3E8UKg75DBWoGv0';

const cemail="inelcihangir@gmail.com";
const cpass="*Reyrey5534"

const oemail="cns_yngn@hotmail.com";
const epass="6654176"
// Token endpoint
app.get("/", (req,res)=>{
    res.json("paraşüt react")
})
app.post('/token', async (req, res) => {
  try {
    const tokenUrl = `${BASE_URL}/oauth/token`;
    const data = {
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: oemail, // Assuming the username is provided in the POST request
      password: epass, // Assuming the password is provided in the POST request
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
    };

    const response = await axios.post(tokenUrl, data);

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/invoices', async (req, res) => {
  const tokenUrl = `${BASE_URL}/oauth/token`;
    const data = {
      grant_type: 'password',
      ...JSON.parse(JSON.stringify(req.body)),
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
    };
    console.log(JSON.parse(JSON.stringify(req.body)))

    console.log("burda")
    const response = await axios.post(tokenUrl, data);

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    console.log("accessToken",accessToken)
  try {
    const invoicesUrl = `https://api.parasut.com/v4/${data.spender_id}/purchase_bills`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(invoicesUrl, { headers });

    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching invoices:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// app.post('/invoices', async (req, res) => {
//   const tokenUrl = `${BASE_URL}/oauth/token`;
//     const data = {
//       grant_type: 'password',
//       client_id: req.body.client_id,
//       client_secret:req.body.client_secret,
//       username: req.body.username, // Assuming the username is provided in the POST request
//       password: req.body.password, // Assuming the password is provided in the POST request
//       redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
//     };

//     const response = await axios.post(tokenUrl, data);

//     const accessToken = response.data.access_token;
//     const refreshToken = response.data.refresh_token;
//     console.log("accessToken",accessToken)
//   try {
//     const invoicesUrl = `https://api.parasut.com/v4/${req.body.spender_id}/purchase_bills`;
//     const companyId = 344301; // Replace with the actual company ID
//     //const accessToken = 'J4_J_K1BQOENekY-c4RzRbbnSolTHDjwaFjXgEVX9lM'; // Replace with the actual access token obtained from the /token route

//     const queryParams = {
//       filter: {
//         spender_id: req.query.spender_id,
//       },
//       page: {
//         number: req.query.pageNumber || 1,
//         size: req.query.pageSize || 15,
//       },
//       company_id: req.query.spender_id,
//     };

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//     };

//     const response = await axios.get(invoicesUrl, { headers });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching invoices:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// Start the Express server
app.listen(process.env.PORT || port, () => {
  console.log(`Parasut is running on http://localhost:${port}`);
});