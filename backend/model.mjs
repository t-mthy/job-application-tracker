import 'dotenv/config';
import mongoose from 'mongoose';

// Connect to local MongoDB
// NOTE: latest versions of Node.js with mongoose use '127.0.0.1' (NOT 'localhost')
mongoose
    .connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true })
    .then(() => {
        console.log('CONNECTION SUCCEEDED! MONGODB_CONNECT_STRING is valid.');
    })
    .catch((err) => {
        console.log(
            'CONNECTION FAILED. Check MONGODB_CONNECT_STRING for syntax error.'
        );
        console.log(err);
    });
const dbConnect = mongoose.connection;

// Connection confirm & print status
dbConnect.once('open', (err) => {
    if (err) {
        res.status(500).json({
            error: '500 ERROR. Unable to connect to the server.',
        });
    } else {
        console.log(
            'Good connection to MongoDB collection (jobs) using Mongoose!'
        );
    }
});

// Define collection schema
const jobSchema = mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    date: { type: Date, required: true, default: Date.now },
});

// Define document var, compile model from schema
const Job = mongoose.model('Job', jobSchema);

// CREATE model =======================================================
const jobCreate = async (company, position, rating, date) => {
    const jobMake = new Job({
        company: company,
        position: position,
        rating: rating,
        date: date,
    });
    return jobMake.save();
};

// RETRIEVE models =======================================================
// Retrieve all documents & return a promise
const jobFind = async () => {
    const jobQuery = Job.find();
    return jobQuery.exec();
};

// UPDATE model =======================================================
const jobUpdate = async (id, company, position, rating, date) => {
    const jobReplace = await Job.replaceOne(
        { _id: id },
        {
            company: company,
            position: position,
            rating: rating,
            date: date,
        }
    );
    return {
        _id: id,
        company: company,
        position: position,
        rating: rating,
        date: date,
    };
};

// DELETE model =======================================================
const jobDelete = async (id) => {
    const jobRemove = await Job.deleteOne({ _id: id });
    return jobRemove.deletedCount;
};

// Export for controller.mjs
export { jobCreate, jobFind, jobUpdate, jobDelete };
