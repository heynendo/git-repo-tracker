import '../styles/download-options.css'
import SimpleArrow from "../assets/simpleArrow.svg"
import { downloadJSON, downloadCSV, downloadXLSX } from "../functions/download.js"
import { AnimatePresence, motion } from "framer-motion"

function DownloadOptions({commitDetails, setDownload}){

    const files = commitDetails?.files || []

    return(
        <div className='overlay' onClick={() => setDownload(false)}>
            <AnimatePresence>
            <motion.div className="download-options" onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.2, delay: 0.1}}
            >
                <div className='head'>
                    <img src={SimpleArrow} 
                        className='aside'
                        onClick={() => setDownload(x => !x)}
                    />
                    <h3>Download Options</h3>
                    <div className='aside'/>
                </div>
                <div className='options'>
                    <div className='json'>
                        <button onClick={() => downloadJSON(files)}>
                            <span>.JSON</span>
                        </button>
                    </div>
                    <div className='xlsx'>
                        <button onClick={() => downloadXLSX(files)}>
                            <span>.XLSX</span>
                        </button>
                    </div>
                    <div className='csv'>
                        <button onClick={() => downloadCSV(files)}>
                            <span>.CSV</span>
                        </button>
                    </div>
                </div>
            </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default DownloadOptions