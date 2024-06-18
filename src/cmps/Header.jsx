import GmailImg from '../assets/img/gmail-icon.png';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";



function Header({filter, setFilter, handleFilterSubmit, onSortClick}) {
    return (
        <>    
            <div className="header flex-row-center-start">
              <div className='gmail-logo-container'>
                <img src={GmailImg} className='gmail-logo' />
                <div className='gmail-gmail'>
                  Gmail
                </div>
                </div>
                <div className='search-container ' >
                  <form className='search-form flex-row-start ' onSubmit={handleFilterSubmit}>
                    <button className='icon-button flex-column-center'>
                    <FaMagnifyingGlass />
                    </button>
                    <input placeholder='search emails'
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}></input>
                        <div className='email-orginzier grid-content-center icon-button ' onClick={onSortClick}>
                        <HiAdjustmentsHorizontal  />
                        </div>
                  </form>
              
                </div>
               
            </div>
        </>
    );
}

export default Header;
