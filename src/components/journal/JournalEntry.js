import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

    const dispatch = useDispatch();

    const noteDate = moment(date);

    const handleEntryClick = () => {
        dispatch(activeNote(id, { date, title, body, url }))
    }


    return (
        <div className="journal__entry pointer animate__animated animate__fadeIn animate__slower" onClick={handleEntryClick}>
            {
                url &&
                <div className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <div className="journal__entry-content">
                    {body}
                </div>

                <div className="journal__entry-date-box">
                    {noteDate.format('MMMM')} {noteDate.format('D')}, {noteDate.format('YYYY')}
                    
                </div>
            </div>




        </div>
    )
}
