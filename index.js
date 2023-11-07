import express from 'express';
import mongoose from 'mongoose';

const app = express();
const MONGO_URI = 'mongodb://mongoDB:27017/node-docker';
const PORT = 3000;

const dataSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Data = mongoose.model('Data', dataSchema);

app.get('/', (req, res) => {
  res.json({ message: 'Server is ON!' });
});

app.get('/data', async (req, res) => {
  try {
    const items = await Data.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/add', async (req, res) => {
  try {
    const newItem = new Data({
      name: 'Omkar Date',
      description: 'Learning Docker',
    });
    await newItem.save();
    res.status(201).json('Data Added!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// connection to db
mongoose
  .connect(process.env.MONGO_URI || MONGO_URI, {})
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || PORT, () => {
      console.log(
        `Connected to DB & listening on http://localhost:${
          process.env.PORT || PORT
        }`
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
