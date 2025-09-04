import fetchCommitDetails from "../functions/fetchCommitDetails"
import CommitFileDetails from "./CommitFileDetails"
import { useEffect, useState } from "react"
import '../styles/commit.css'

function Commit({commit, setRateLimit}){
    const [toggle, setToggle] = useState(false)
    const [commitDetails, setCommitDetails] = useState([])

    useEffect(() => {
        if (toggle === true){
            const getCommitDetails = async () => {
            const details = await fetchCommitDetails(commit.url, commit.sha)
            setCommitDetails(details)
            //console.log(details)
        }
        getCommitDetails()
        }
    },[toggle])

    function formatDate(dateString) {
        const date = new Date(dateString)

        const dateOptions = { year: "numeric", month: "long", day: "numeric" }
        const formattedDate = date.toLocaleDateString(undefined, dateOptions)

        const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }
        const formattedTime = date.toLocaleTimeString(undefined, timeOptions)

        return [formattedDate, formattedTime]
    }

    const [date, time] = formatDate(commit.date)


    return(
        <div className='commit' key={commit.sha}>
            <div className="commit-content">
                <div className='left'>
                    <span className="date">
                        <div>{date}</div>
                        <div className="time">{time}</div>
                    </span>
                    <div className='break' />
                </div>
                <div className='right'>
                    <div className='top'>
                        Update by @
                        <a className="user" 
                        href={`https://github.com/${commit.author}`}
                        target="_blank"
                        >
                            {commit.author}
                        </a>
                    </div>
                    <span className="comment">{commit.message}</span>
                </div>
            </div>
            <CommitFileDetails commitDetails={commitDetails} toggle={toggle}/>
            <span className='see-more' onClick={() => setToggle(x => !x)}>
                {toggle ? 'hide file changes' : 'see full commit details'}
            </span>
        </div>
    )
}

export default Commit