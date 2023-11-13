import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataSchema = new mongoose.Schema({
  string: String,
});
const Data = mongoose.model('Data', dataSchema);

app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <h1>Learning Docker!</h1>
      <input type="text" name="inputData" id="inputData" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', async (req, res) => {
  const inputData = req.body.inputData;
  try {
    const newItem = new Data({ string: inputData });
    await newItem.save();
    res.status(201).json('Data Added!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/delete', async (req, res) => {
  await Data.deleteMany({});
  res.status(200).json({ status: 'Ok' });
});

app.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to DB & listening on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
