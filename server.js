const express = require('express');
// import sequelize connection
const sequelize = require('./config/connection');
// const { sequelize } = require('./models/Product');
const routes = require('./routes');



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// force:false means that we want it to sync up
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
})

