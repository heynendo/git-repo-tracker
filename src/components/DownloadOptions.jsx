import '../styles/download-options.css'
import SimpleArrow from "../assets/simpleArrow.svg"
import { downloadJSON, downloadCSV, downloadXLSX } from "../functions/download.js"

function DownloadOptions({commitDetails, setDownload}){

    const files = commitDetails?.files || []

    return(
        <div className='overlay' onClick={() => setDownload(false)}>
            <div className="download-options" onClick={(e) => e.stopPropagation()}>
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
            </div>
        </div>
    )
}

export default DownloadOptions