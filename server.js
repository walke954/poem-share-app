const express = require('express');
const app = express();

const morgan = require('morgan');

const PORT = 3000;

app.use(express.static('build'));

app.use(morgan('common'));

app.listen(PORT, () => {
	console.log(`Your app is listening at ${PORT}`);
});