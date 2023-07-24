import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';

import JobLogTable from '../components/JobLogTable';

function JobLogPage({ setEditJob }) {
    const navTo = useNavigate(); // redirect

    const [jobsObjArr, setJobsObjArr] = useState([]);

    // RETRIEVE - for jobs to load in 'mounting' cycle
    const jobsLoad = async () => {
        const resObj = await fetch('/log'); // resObj of Fetch API
        const resJSON = await resObj.json();
        setJobsObjArr(resJSON);
    };

    // UPDATE - edits a job info
    const jobPropEdit = async (jobObj) => {
        setEditJob(jobObj); // lifting up state to App.js
        navTo('/log-edit');
    };

    // DELETE - deletes a job row
    const jobDocuDel = async (id) => {
        const resObj = await fetch(`/log/${id}`, { method: 'DELETE' });

        if (resObj.status === 204) {
            const remResObj = await fetch('/log'); // remaining res objects
            const remResJSON = await remResObj.json();
            setJobsObjArr(remResJSON);
        } else {
            console.error(
                `${resObj.status} ERROR. Unable to delete the job document with ID: ${id}.`
            );
        }
    };

    // load all jobs...during 'mounting' cycle
    // useEffect fetching data: React state <---> DB data
    // NOTE: cannot pass async function as 1st param
    useEffect(() => {
        jobsLoad();
    }, []);

    // display all jobs
    return (
        <>
            <Link to="/log-create" className="add-btn">
                <FiPlusSquare />
                <span>&nbsp;&nbsp;Add</span>
            </Link>

            <article>
                <JobLogTable
                    jobsArr={jobsObjArr}
                    jobsEdit={jobPropEdit}
                    jobsDel={jobDocuDel}
                />
            </article>
        </>
    );
}

export default JobLogPage;
