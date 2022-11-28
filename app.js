// npm 
const express         = require('express')
const dotenv          = require('dotenv')
const cors            = require('cors')
// local
const allRoutes       = require('./routes');
const {sequelize}     = require('./models')

dotenv.config();
const app             = express()
const port            = process.env.PORT;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//  get all endpoint 
app.use(allRoutes);

app.listen(port, async () => {
    try {
      await sequelize.authenticate();
      console.log('database Connected')
    } catch (error) {
      console.log(error)
    }
      console.log(`Example app listening at http://localhost:${port}`)
  })