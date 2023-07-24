import React from 'react';

import JobLogRow from './JobLogRow';

function JobLogTable({ jobsArr, jobsEdit, jobsDel }) {
    return (
        <table>
            <caption>Job &amp; Internship Application Log</caption>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Rating</th>
                    <th>Date Applied</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {jobsArr.map((job, idx) => (
                    <JobLogRow
                        jobObj={job}
                        jobEdit={jobsEdit}
                        jobDel={jobsDel}
                        key={idx}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default JobLogTable;
