import '../styles/rate-limit-widget.css'
import arrow from '../assets/simpleArrow.svg'

function RateLimitWidget({rateLimit}){
    return(
        <>
        { rateLimit && rateLimit.remaining < 5 && 
        <div className="rate-limit-widget">
            <div className='img'>
                <img src={arrow} />
            </div>
            <div>
                <h2>API Limit</h2>
                <div className='break' />
                <h2>{rateLimit.remaining} / {rateLimit.limit}</h2>
                <span>reset at {rateLimit.reset}</span>
            </div>
        </div>
        }
        </>
    )
}

export default RateLimitWidget