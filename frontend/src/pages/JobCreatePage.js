import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

function JobCreatePage() {
    const [company, setCompany] = useState('Meow Inc.');
    const [position, setPosition] = useState('SWE Pawsition');
    const [rating, setRating] = useState('4.9');
    const [date, setDate] = useState();

    const navTo = useNavigate();

    const jobAdd = async () => {
        const jobAddObj = { company, position, rating, date };

        const resObj = await fetch('/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobAddObj),
        });

        if (resObj.status === 201) {
            alert(`Successfully added ${position} from ${company} to the log!`);
        } else {
            alert(
                `${resObj.status} ERROR. Unable to add job info to the log due to missing required field(s).
                \nAlso, the company rating must be from 0 to 5 only.`
            );
        }
        navTo('/log'); // redirect
    };

    return (
        <>
            <article>
                <table>
                    <caption>Add Job/Internship Info</caption>
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
                                <label for="jobCompany" className="required">
                                    <input
                                        type="text"
                                        id="jobCompany"
                                        name="logCompany"
                                        value={company}
                                        onChange={(evt) =>
                                            setCompany(evt.target.value)
                                        }
                                        required
                                        autoFocus
                                        className="log-comp"
                                    />
                                </label>
                            </td>
                            <td>
                                <label for="jobPosition" className="required">
                                    <input
                                        type="text"
                                        id="jobPosition"
                                        name="logPosition"
                                        value={position}
                                        onChange={(evt) =>
                                            setPosition(evt.target.value)
                                        }
                                        required
                                        className="log-posn"
                                    />
                                </label>
                            </td>
                            <td>
                                <label for="jobRating" className="required">
                                    <input
                                        type="number"
                                        id="jobRating"
                                        name="logRating"
                                        value={rating}
                                        onChange={(evt) =>
                                            setRating(evt.target.value)
                                        }
                                        required
                                        min={0}
                                        max={5}
                                        className="log-rtng"
                                    />
                                </label>
                            </td>
                            <td>
                                <label for="jobDate" className="required">
                                    <input
                                        type="date"
                                        id="jobDate"
                                        name="logDate"
                                        value={date}
                                        onChange={(evt) =>
                                            setDate(evt.target.value)
                                        }
                                        required
                                        pattern="\d{2}\/\d{2}\/\d{2}"
                                        className="log-date"
                                    />
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>

            <button onClick={jobAdd} className="add-btn">
                <FiCheck />
                <span>&nbsp;Save</span>
            </button>
        </>
    );
}

export default JobCreatePage;
