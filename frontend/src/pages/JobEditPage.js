import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

function JobEditPage({ editJobObj }) {
    const [company, setCompany] = useState(editJobObj.company);
    const [position, setPosition] = useState(editJobObj.position);
    const [rating, setRating] = useState(editJobObj.rating);
    const [date, setDate] = useState(editJobObj.date.slice(0, 10));

    const navTo = useNavigate();

    const jobEdit = async () => {
        // Check before Fetch API to prevent site from breaking
        if (date === '') {
            alert('Unable to save. The date field cannot be left empty!');
            throw new Error('Date value is required!');
        }

        const resObj = await fetch(`/log/${editJobObj._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                company: company,
                position: position,
                rating: rating,
                date: date,
            }),
        });

        if (resObj.status === 200) {
            alert(`${position} job log has been successfully updated!`);
        } else {
            const errMsg = await resObj.json();
            alert(
                `${resObj.status} ERROR. Unable to update job log. ${errMsg.Error}`
            );
        }
        navTo('/log'); // redirect
    };

    return (
        <>
            <article>
                <table>
                    <caption>Update Job/Internship Info</caption>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Rating</th>
                            <th>Date Applied</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label for="jobCompany">
                                    <input
                                        type="text"
                                        id="jobCompany"
                                        name="logCompany"
                                        value={company}
                                        onChange={(evt) =>
                                            setCompany(evt.target.value)
                                        }
                                        autoFocus
                                        className="log-comp"
                                    />
                                </label>
                            </td>
                            <td>
                                <label for="jobPosition">
                                    <input
                                        type="text"
                                        id="jobPosition"
                                        name="logPosition"
                                        value={position}
                                        onChange={(evt) =>
                                            setPosition(evt.target.value)
                                        }
                                        className="log-posn"
                                    />
                                </label>
                            </td>
                            <td>
                                <label for="jobRating">
                                    <input
                                        type="number"
                                        id="jobRating"
                                        name="logRating"
                                        value={rating}
                                        onChange={(evt) =>
                                            setRating(evt.target.value)
                                        }
                                        min={0}
                                        max={5}
                                        className="log-rtng"
                                    />
                                </label>
                            </td>
                            <td>
                                <label for="jobDate">
                                    <input
                                        type="text"
                                        id="jobDate"
                                        name="logDate"
                                        value={date}
                                        onChange={(evt) =>
                                            setDate(evt.target.value)
                                        }
                                        pattern="\d{2}\/\d{2}\/\d{2}"
                                        className="log-date"
                                    />
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>

            <button onClick={jobEdit} className="add-btn">
                <FiCheck />
                <span>&nbsp;Save</span>
            </button>
        </>
    );
}

export default JobEditPage;
