
function SortBar({onclickUnreadSort, onClickDateSort, onClickStarredSort}) {
  

    return (
      <>    
        <div className="sort-bar flex-row-start gap space-around">
            <div className="sortItem flex-row-center gap" onClick={onclickUnreadSort}>
                <h2>Unread</h2>

            </div>
            <div className="sortItem flex-row-center gap" onClick={onClickDateSort}>
                <h2>Date</h2>

            </div>
            <div className="sortItem flex-row-center gap" onClick={onClickStarredSort}>
                <h2>Starred</h2>

            </div>
        </div>

      </>
    )
  }
  
  export default SortBar