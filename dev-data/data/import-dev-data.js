const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const connectionString =
  'mongodb+srv://user123:user123@mongopartik.noweicc.mongodb.net/your-database';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//read json file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data to database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded...');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete all data

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted...');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
