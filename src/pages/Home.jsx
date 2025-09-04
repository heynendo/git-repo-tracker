import Commit from '../components/Commit'
import BranchSelector from '../components/BranchSelector'
import ArrowRight from '../assets/simpleArrow.svg'
import '../styles/home.css'
import { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
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
            
            <AnimatePresence>
            {branches.length > 0 && (
                <motion.div
                key="branch-selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    delay: 0.5,
                    duration: 0.25,
                }}
                >
                <BranchSelector
                    branches={branches}
                    currentBranch={currentBranch}
                    setCurrentBranch={setCurrentBranch}
                />
                </motion.div>
            )}
            </AnimatePresence>
            <div className="commit-list">
            <AnimatePresence>
            {commits
                ?.find(branchObj => branchObj.branch === currentBranch)?.commits
                ?.map((commit, i) => (
                    <motion.div
                    key={commit.sha}
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                    <Commit commit={commit} setRateLimit={setRateLimit} />
                    </motion.div>
            ))}
            </AnimatePresence>
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