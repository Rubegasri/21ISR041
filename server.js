const express = require('express');
const cors = require('cors');
const app = express();  

app.use(cors());  
const port = 5000;
app.use(express.json());

app.get('/api/numbers/:type', (req, res) => {
  const { type } = req.params;
  let numbers = [];

  try {
    if (type === 'p') {
      numbers = generatePrimes();
    } else if (type === 'f') {
      numbers = generateFibonacci();
    } else if (type === 'e') {
      numbers = generateEvenNumbers();
    } else if (type === 'r') {
      numbers = generateRandomNumbers();
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }
    res.json({ numbers });
  } catch (e) {
    console.error(e); 
    res.status(500).json({ error: 'Internal server error' });
  }
});

const generatePrimes = () => {
  const primes = [];
  let num = 2;
  while (primes.length < 10) {
    if (isPrime(num)) primes.push(num);
    num++;
  }
  return primes;
};

const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

const generateFibonacci = () => {
  const fib = [0, 1];
  for (let i = 2; i < 10; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
};

const generateEvenNumbers = () => {
  return Array.from({ length: 10 }, (_, i) => i * 2);
};


const generateRandomNumbers = () => {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
