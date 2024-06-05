import { FaArrowLeft } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import { GoUnread } from "react-icons/go";
import { useNavigate } from "react-router-dom";
function ToolBox({emailId, onUnreadEmailclick,  onTrashInEmailDetailsClick}) {
  const navigate = useNavigate()

    return (
      <>    
        <div className="tool-box flex-row-start">
            <div className="return-button flex-center" title="return" onClick={() => navigate(-1)}>
                <FaArrowLeft />
            </div>
            <div className="options flex-row-start">
            <div className="trash-button flex-center" title="move to trash" onClick={() => onTrashInEmailDetailsClick(emailId)}>
                <FiTrash2 />
            </div>
            <div className="unread-button flex-center" title="mark as unread" onClick={() => onUnreadEmailclick(emailId)}>
                <GoUnread />
            </div>
            </div>
        </div>

      </>
    )
  }
  
  export default ToolBox