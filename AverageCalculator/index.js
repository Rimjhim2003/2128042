const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;
const windowSize = 10;
const testServerBaseUrl = 'http://20.244.56.144/test/';

let windowNumbers = [];

async function fetchNumbers(qualifier) {
    try {
        const url = testServerBaseUrl + qualifier;
        const response = await axios.get(url);
        return response.data.numbers;
    } catch (error) {
        throw new Error('Error fetching numbers from the test server');
    }
}

function calculateAverage(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

app.get('/numbers/:qualifier', async (req, res) => {
    const { qualifier } = req.params;

    try {
        const fetchedNumbers = await fetchNumbers(qualifier);

        const uniqueNumbers = fetchedNumbers.filter(num => !windowNumbers.includes(num));

        windowNumbers = [...windowNumbers, ...uniqueNumbers].slice(-windowSize);

        const average = calculateAverage(windowNumbers);

        const response = {
            numbers: fetchedNumbers,
            windowPrevState: windowNumbers.slice(0, -uniqueNumbers.length),
            windowCurrState: windowNumbers,
            avg: average.toFixed(2)
        };

        res.json(response);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
