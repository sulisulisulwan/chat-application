require('dotenv').config({path: '.env'});
const app = require('./app');

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
});
