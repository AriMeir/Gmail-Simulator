
import { GoUnread } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";

function EmailPreview({email, onStarClick, onTrashClick, onEmailClick}) {
  const isRead = email.isRead ? '' : 'bold'
  const isStarred = email.isStarred ? <span className="star-big">⭐</span> :<span className="star"> ☆</span>
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
function cutEmailBody(email) {
  const body = email.body
  const subBody =' - ' + body.substring(0,70-email.subject.length) + '...'
  return subBody
}
  

    return (
      <>    
      <div className={`email-preview flex-row-center-start ${isRead}`} onClick={() => onEmailClick(email.id)}>
        <button className="star" onClick={(e) => {
          e.stopPropagation()
          onStarClick(email.id)
        }}>
          <span className="star-icon icon-button">{isStarred}</span>
        </button>

        <span className="email-sender">
          {email.from}
        </span>
        <div className="email-subject-body ">
        <span className="email-subject">
          {email.subject}
        </span>
        <span className="email-body-preview">
          {cutEmailBody(email)}
        </span>
        </div>
        <span className="email-time">{formatTime(email.sentAt)}</span>
        <div className="flex-row-center-start">
        <button className="trash icon-button" onClick={(e) => {
          e.stopPropagation()
          onTrashClick(email.id)}}>
          <span className="unread-icon"><GoUnread/></span>
        </button>
        <button className="trash icon-button" onClick={(e) => {
          e.stopPropagation()
          onTrashClick(email.id)}}>
          <span className="trash-icon"><FiTrash2/></span>  
        </button>
       
        </div>
    </div>
        


      </>
    )
  }
  
  export default EmailPreview