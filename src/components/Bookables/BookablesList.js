import { useState, useReducer, Fragment } from "react"
import bookables from '../../static.json'
import { FaArrowRight } from 'react-icons/fa'
import reducer from './reducer'
const InitialState = {
    group: "Rooms",
    bookableINdex: 0,
    hasDetail: false,
    bookables
}
export default function BookablesList() {

    const [state, dispatch] = useReducer(reducer, InitialState)
    const { group, bookableIndex, hasDetail, bookables } = state



    const bookablesInGroup = bookables.bookables.filter(b => b.group === group)
    const groups = [...new Set(bookables.bookables.map(b => b.group))]
    const bookable = bookablesInGroup[bookableIndex]

    const days = bookables.days
    const sessions = bookables.sessions


    function nextBookable(i) {
        dispatch({ type: "NEXT_BOOKABLE" })
    }
    function changeGroup(g) {
        dispatch({
            type: "SET_GROUP",
            payload: g
        })
    }
    function toggleHasDetail() {
        dispatch({ type: "TOGGLE_HAS_DETAILS" })
    }
    function setBookableIndex(i) {
        dispatch({
            type: "SET_BOOKABLE_INDEX",
            payload: i
        })
    }

    return (
        <Fragment>
            <div>
                <select value={group}
                    onChange={(e) => changeGroup(e.target.value)}
                >
                    {groups.map(g => (
                        <option value={g} key={g}>{g}</option>
                    ))}
                </select>
                <ul className="bookables items-list-nav">
                    {bookablesInGroup.map((b, i) => (
                        <li
                            key={b.title}
                            className={i === bookableIndex ? "selected" : null}>
                            <button className="btn" onClick={() => setBookableIndex(i)}>
                                {b.title}
                            </button>
                        </li>
                    ))}

                </ul>
                <p>
                    <button className="btn" autoFocus onClick={() => nextBookable()}>
                        <FaArrowRight />
                        <span>Next</span>
                    </button>
                </p>
            </div>
            {bookable && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>{bookable.title}</h2>
                            <span className="controls">
                                <label>
                                    <input type="checkbox"
                                        checked={hasDetail}
                                        onChange={() => toggleHasDetail()}
                                    />
                                    <span>Show Details</span>
                                </label>
                            </span>
                        </div>
                        <p>{bookable.notes}</p>
                        {hasDetail && (
                            <div className="item-details">
                                <h3>Availablility</h3>
                                <div className="bookable-availability">
                                    <ul>
                                        {bookable.days.sort()
                                            .map(d => (<li key={d}>{days[d]}</li>))}
                                    </ul>
                                    <ul>
                                        {bookable.sessions.sort()
                                            .map(s => (<li key={s}>{sessions[s]}</li>))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    )
}