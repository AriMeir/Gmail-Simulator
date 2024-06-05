import GmailImg from '../assets/img/gmail-icon.png';
import { FaMagnifyingGlass } from "react-icons/fa6";

function Header({filter, setFilter, handleFilterSubmit}) {
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
                  <form className='search-form flex-row-start' onSubmit={handleFilterSubmit}>
                    <button>
                    <FaMagnifyingGlass />
                    </button>
                    <input placeholder='search emails'
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}></input>
                  </form>
                </div>
            </div>
        </>
    );
}

export default Header;
