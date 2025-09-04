import '../styles/branch-selector.css'

function BranchSelector({branches, currentBranch, setCurrentBranch }){
    const unselectedStyle = {
        backgroundColor: 'rgba(242, 129, 15, .5)',
        color: 'white',
        border: 'none',
        cursor: 'default'
    }

    return(
        <div className="branch-selector">
            {branches.length != 0 && 
            <>
                <h3>SET BRANCH:</h3>
                {branches.map(branch => 
                    <button className="branch" key={branch}
                        style={currentBranch === branch ? unselectedStyle : {}}
                        onClick={() => setCurrentBranch(branch)}
                    >{branch}</button>
                )} 
            </>
            }
        </div>
    )
}

export default BranchSelector