import Commit from '../components/Commit'
import BranchSelector from '../components/BranchSelector'
import ArrowRight from '../assets/simpleArrow.svg'
import '../styles/home.css'
import { useState } from 'react'
import fetchRepoData from '../functions/fetchRepoData'
import RateLimitWidget from '../components/RateLimitWidget'

function Home(){
    const [url, setUrl] = useState('')
    const [commits, setCommits] = useState([])
    const [branches, setBranches] = useState([])
    const [rateLimit, setRateLimit] = useState([])
    const [currentBranch, setCurrentBranch] = useState([])
    const [error, setError] = useState(false)

    async function SubmitURL(e){
        e.preventDefault()
        setError(false)
        
        const { branches, commits, rateLimit } = await fetchRepoData(url)

        //console.log("Branches:", branches)
        //console.log("Commits:", commits)
        //console.log("Rate Limit:", rateLimit)

        setBranches(branches)
        setCommits(commits)
        //setRateLimit(rateLimit)
        setCurrentBranch(branches[0])

        if (branches.length < 1) setError(true) 
    }

    return(
        <div className="home">
            <h3>enter a public git repo URL to visualize all branches and updates</h3>
            <form>
                <input 
                    name='url'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button onClick={SubmitURL}><img src={ArrowRight}/></button>
            </form>
            
            <BranchSelector branches={branches} currentBranch={currentBranch} setCurrentBranch={setCurrentBranch}  />
            {/*<CommitList commits={commits} currentBranch={currentBranch} />*/}
            <div className="commit-list">
            {commits
                ?.find(branchObj => branchObj.branch === currentBranch)?.commits
                ?.map(commit => <Commit commit={commit} setRateLimit={setRateLimit} key={commit.sha}/>
            )}
            </div>
            {/*<RateLimitWidget rateLimit={rateLimit} />*/}
            {error && 
                <div className='error'>
                    The URL provided is a private repository or invalid, try again.
                </div>
            }
        </div>
    )
}

export default Home