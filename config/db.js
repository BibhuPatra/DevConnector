const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		mongoose.set('strictQuery', false);
		mongoose.connect(db, { useNewUrlParser: true });
		console.log('Mongo DB Connected');
	} catch (err) {
		console.error(err.message);
		//exist process with failure
		process.exit(1);
	}
};
module.exports = connectDB;
