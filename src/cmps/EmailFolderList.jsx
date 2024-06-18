import { TbMailDown } from "react-icons/tb";
import { LuStar } from "react-icons/lu";

import { BsTrash3 } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { BsEnvelopeArrowDownFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import { TbPageBreak } from "react-icons/tb";
import { MdOutlineInsertPageBreak } from "react-icons/md";

function EmailFolderList({onFolderClick, onOpen, currentFolder, unread}) {

  const inboxIcon = currentFolder === "inbox" ? <BsEnvelopeArrowDownFill/>  :  <TbMailDown />
  const starIcon = currentFolder === "star" ? <FaStar /> : <LuStar />
  const sentIcon = currentFolder === "sent" ? <FaPaperPlane /> : <FaRegPaperPlane />
  const trashIcon = currentFolder === "trash" ? <BsTrash3Fill /> : <BsTrash3 />
  const draftIcon = currentFolder === "draft" ? <MdOutlineInsertPageBreak /> : <TbPageBreak />
  

    return (
      <>    
      <div className="email-filter flex-column-start">
        <button className="compose-button flex-row-center" onClick={onOpen}><GoPencil /><span className="filter-name">Compose</span></button>
        <div className="email-filter-items-list flex-column-start">
          <div className={`filter-button flex-wrap flex-row-center space-between ${currentFolder === 'inbox' ? 'bold bg-clr-chsn-fldr' : ''}`} onClick={() => onFolderClick('inbox')}>
          <div className="flex-row-start">{inboxIcon} <span className="filter-name">Inbox</span></div> <span className="emails-number"> {unread.inbox}</span> 
          </div>
          <div className={`filter-button flex-wrap flex-row-center space-between ${currentFolder === 'star' ? 'bold bg-clr-chsn-fldr' : ''}`} onClick={() => onFolderClick('star')}>
          <div className="flex-row-start">{starIcon} <span className="filter-name">Starred</span></div> <span className="emails-number"> {unread.starred}</span> 
          </div>
          <div className={`filter-button flex-wrap flex-row-center space-between ${currentFolder === 'sent' ? 'bold bg-clr-chsn-fldr' : ''}`} onClick={() => onFolderClick('sent')}>
          <div className="flex-row-start">{sentIcon} <span className="filter-name">Sent</span> </div> <span className="emails-number"> </span> 
          </div>
          <div className={`filter-button flex-wrap flex-row-center space-between ${currentFolder === 'trash' ? 'bold bg-clr-chsn-fldr' : ''}`} onClick={() => onFolderClick('trash')}>
          <div className="flex-row-start">{trashIcon} <span className="filter-name">Trash</span></div><span className="emails-number"> {unread.trash}</span> 
          </div>
          <div className={`filter-button flex-wrap flex-row-center space-between ${currentFolder === 'draft' ? 'bold bg-clr-chsn-fldr' : ''}`} onClick={() => onFolderClick('draft')}>
          <div className="flex-row-start">{draftIcon} <span className="filter-name">Draft</span></div>
          </div>
          

        </div>
        
      </div>
        


      </>
    )
  }
  
  export default EmailFolderList