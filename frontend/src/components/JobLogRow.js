import React from 'react';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

function JobLogRow({ jobObj, jobEdit, jobDel }) {
    // jobEdit: rowComp > tblComp > logPg > App.js (root) > editPg (Fetch API)
    // jobDel: rowComp > tblComp > logPg (Fetch API)

    return (
        <tr>
            <td title="Company name">{jobObj.company}</td>
            <td title="Job title">{jobObj.position}</td>
            <td title="Company rating (0 to 5 stars)">{jobObj.rating}</td>
            <td title="Submission date">{jobObj.date.slice(0, 10)}</td>
            <td className="dataChoose">
                <FiEdit3 onClick={() => jobEdit(jobObj)} title="Edit" />
            </td>
            <td className="dataChoose">
                <FiTrash2 onClick={() => jobDel(jobObj._id)} title="Delete" />
            </td>
        </tr>
    );
}

export default JobLogRow;
