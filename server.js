const express = require('express');
const app = express();
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
if (app.get('env') === 'development') {
  require('dotenv').config();
}
require('./db/conn');

const appendUser = (req, res, next) => {
  req.user = req.auth.payload[process.env.AUTH0_AUDIENCE + '/user'];
  next();
};

const checkJwt = [auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
}), appendUser];

//Config
app.use(express.static('public'));
// app.use(
//   cors({
//     methods: ['GET', 'POST', 'PUT'],
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const userRoutes = require('./components/auth').routes;
// app.use('/user', ...checkJwt, userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
