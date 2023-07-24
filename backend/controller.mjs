import 'dotenv/config';
import express from 'express';
import * as jobLog from './model.mjs';

const PORT = process.env.PORT;
const app = express();

// NO urlencoded POST form, NO static public serving
app.use(express.json()); // REST needs JSON MIME type

// CREATE controller =======================================================
app.post('/log', (req, res) => {
    jobLog
        .jobCreate(
            req.body.company,
            req.body.position,
            req.body.rating,
            req.body.date
        )
        .then((job) => {
            res.status(201).json(job);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                error: '400 ERROR. Unable to create a job document due to user-input error.',
            });
        });
});

// RETRIEVE controller =======================================================
app.get('/log', (req, res) => {
    jobLog
        .jobFind()
        .then((job) => {
            if (job !== null) {
                res.json(job);
            } else {
                res.status(404).json({
                    error: '404 ERROR. Retrieval request accepted. But no job document was found.',
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                error: '400 ERROR. Unable to process retrieval request to find the job document.',
            });
        });
});

// UPDATE controller =======================================================
app.put('/log/:id', (req, res) => {
    jobLog
        .jobUpdate(
            req.params.id,
            req.body.company,
            req.body.position,
            req.body.rating,
            req.body.date
        )
        .then((job) => {
            res.json(job); // shows jobUpdate model return {params}
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                error: '400 ERROR. Unable to update the job document due to user-input error.',
            });
        });
});

// DELETE controller =======================================================
app.delete('/log/:id', (req, res) => {
    jobLog
        .jobDelete(req.params.id) // REST route parameters
        .then((delCount) => {
            if (delCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({
                    error: '404 ERROR. Delete request accepted. But the job document does not exist.',
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                error: '400 ERROR. Unable to delete the job document due to unmatched ID.',
            });
        });
});

// REST & Express listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
