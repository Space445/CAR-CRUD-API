import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
// Add this endpoint to get all cars
app.get('/api/cars', (req, res) => {
  res.json(carData);
});


let carData = [
  { color: 'orange', make: 'Ford', model: 'Fiesta', reg_number: 'CL 77790' },
  { color: 'blue', make: 'Toyota', model: 'Corolla', reg_number: 'CL 12345' },
  // More car data
];

// Get most popular make
app.get('/api/mostPopularMake', (req, res) => {
  const makeCount = carData.reduce((acc, car) => {
    acc[car.make] = (acc[car.make] || 0) + 1;
    return acc;
  }, {});
  const mostPopularMake = Object.keys(makeCount).reduce((a, b) => makeCount[a] > makeCount[b] ? a : b);
  res.json({ make: mostPopularMake });
});

// Add a new car
app.post('/api/car', (req, res) => {
  const newCar = req.body;
  carData.push(newCar);
  res.status(201).json(newCar);
});

// Get car by registration number
app.get('/api/car/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  const car = carData.find(c => c.reg_number === reg_number);
  if (car) {
    res.json(car);
  } else {
    res.status(404).send(`Car with registration number ${reg_number} not found`);
  }
});

// Update car by registration number
app.put('/api/car/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  const updatedCar = req.body;
  const carIndex = carData.findIndex(c => c.reg_number === reg_number);
  if (carIndex !== -1) {
    carData[carIndex] = updatedCar;
    res.json(updatedCar);
  } else {
    res.status(404).send(`Car with registration number ${reg_number} not found`);
  }
});

// Delete car by registration number
app.delete('/api/car/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  const carIndex = carData.findIndex(c => c.reg_number === reg_number);
  if (carIndex !== -1) {
    const deletedCar = carData.splice(carIndex, 1);
    res.json(deletedCar);
  } else {
    res.status(404).send(`Car with registration number ${reg_number} not found`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
