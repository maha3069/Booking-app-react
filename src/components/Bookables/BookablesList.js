import { useState, Fragment } from "react"
import bookables from '../../static.json'
import { FaArrowRight } from 'react-icons/fa'
export default function BookablesList() {

    const [group, setGroup] = useState("Kit")
    const bookablesInGroup = bookables.bookables.filter(b => b.group === group)
    const groups = [...new Set(bookables.bookables.map(b => b.group))]
    const [bookableIndex, setBookableIndex] = useState(0)
    const bookable = bookablesInGroup[bookableIndex]
    console.log(bookable)
    const [hasDetail, setHasDetail] = useState(false)
    const days = bookables.days
    const sessions = bookables.sessions


    function nextBookable(i) {
        setBookableIndex(i => (i + 1) % bookablesInGroup.length)
    }

    return (
        <Fragment>
            <div>
                <select value={group}
                    onChange={(e) => setGroup(e.target.value)}
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
                    <button className="btn" autoFocus onClick={() => nextBookable(bookableIndex)}>
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
                                        onChange={() => setHasDetail(has => !has)}
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