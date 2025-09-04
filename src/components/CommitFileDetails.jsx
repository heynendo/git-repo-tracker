import { useState } from 'react'
import '../styles/commit-details.css'
import DownloadOptions from './DownloadOptions'
import downloadIcon from '../assets/downloadIcon.svg'

function CommitFileDetails({commitDetails, toggle}){
    const [sortSettings, setSortSettings] = useState({ key: null, direction: "asc" })
    const [filters, setFilters] = useState([])
    const [download, setDownload] = useState(false)
    
    function sortOption(key){
        setSortSettings(prev => {
            if (prev.key === key){
                return { key: key, direction: prev.direction === "asc" ? "desc" : "asc"}
            } else{
                return { key: key, direction: "asc"}
            }
        })
    }
    function toggleFilter(option){
        setFilters(prev => {
            if (prev.includes(option)) {
                return prev.filter(f => f !== option)
            } else {
                return [...prev, option]
            }
        })
    }

    return(
        <>
        {download && <DownloadOptions commitDetails={commitDetails} setDownload={setDownload}/>}
        <div className="commit-file-details">
            {toggle && commitDetails.files &&
            <>
                <div className="options">
                    <div className='filter'>
                        <button 
                            onClick={() => setFilters([])}
                            className={filters.length === 0 ? "selected" : ""}    
                        >all</button>
                        {["added", "modified", "removed", "renamed"].map(option => (
                            <button
                                key={option}
                                onClick={() => toggleFilter(option)}
                                className={filters.includes(option) ? "selected" : ""}
                            >
                            {option}
                            </button>
                        ))}
                        {filters.length > 0 && (
                            <button onClick={() => setFilters([])} className="clear">
                            clear
                            </button>
                        )}
                    </div>
                    <div className='download'
                        onClick={() => setDownload(true)}
                    >
                        <img src={downloadIcon} />
                    </div>
                </div>
                <div className='break' />
                <table>
                    <thead>
                    <tr>
                        <th className='filename' onClick={() => sortOption("filename")}>
                            Filename
                            {sortSettings.key === "filename" && (sortSettings.direction === "asc" ? " ↑" : " ↓")}
                        </th>
                        <th onClick={() => sortOption("status")}>
                            State
                            {sortSettings.key === "status" && (sortSettings.direction === "asc" ? " ↑" : " ↓")}
                        </th>
                        <th onClick={() => sortOption("additions")}>
                            Lines Added
                            {sortSettings.key === "additions" && (sortSettings.direction === "asc" ? " ↑" : " ↓")}
                        </th>
                        <th onClick={() => sortOption("changes")}>
                            Lines Modified
                            {sortSettings.key === "changes" && (sortSettings.direction === "asc" ? " ↑" : " ↓")}
                        </th>
                        <th onClick={() => sortOption("deletions")}>
                            Lines Removed
                            {sortSettings.key === "deletions" && (sortSettings.direction === "asc" ? " ↑" : " ↓")}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {commitDetails?.files
                    .filter(file => {
                        if (filters.length === 0) return true
                        return filters.includes(file.status)
                    })
                    .sort((a, b) => {
                        if (!sortSettings.key) return 0

                        let aVal = a[sortSettings.key]
                        let bVal = b[sortSettings.key]

                        // normalize strings for case-insensitive sorting
                        if (typeof aVal === "string") aVal = aVal.toLowerCase()
                        if (typeof bVal === "string") bVal = bVal.toLowerCase()

                        if (aVal < bVal) return sortSettings.direction === "asc" ? -1 : 1
                        if (aVal > bVal) return sortSettings.direction === "asc" ? 1 : -1
                        return 0;
                    })
                    .map((file) => (
                        <tr key={file.filename}>
                        <td className='filename'>{file.filename}</td>
                        <td className={`status-${file.status}`}>{file.status}</td>
                        <td>{file.additions}</td>
                        <td>{file.changes}</td>
                        <td>{file.deletions}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
            }
        </div>
        </>
    )
}

export default CommitFileDetails