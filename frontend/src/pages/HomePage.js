import React from 'react';
import jobCreate from '../images/job-create.gif';
import jobDelete from '../images/job-delete.gif';
import jobUpdate from '../images/job-update.gif';

function HomePage() {
    return (
        <>
            <h2>Job Tracker Demo</h2>

            <article>
                <h3>Creating a job log...</h3>
                <img
                    src={jobCreate}
                    alt="Creating a job log"
                    className="gallery"
                />
            </article>

            <article>
                <h3>Updating a job log...</h3>
                <img
                    src={jobUpdate}
                    alt="Updating a job log"
                    className="gallery"
                />
            </article>

            <article>
                <h3>Deleting a job log...</h3>
                <img
                    src={jobDelete}
                    alt="Deleting a job log"
                    className="gallery"
                />
            </article>
        </>
    );
}

export default HomePage;
