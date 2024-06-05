import EmailPreview from "./EmailPreview"
function EmailList({emails,filteredEmails,  onStarClick, onTrashClick, onEmailClick}) {
  

    return (
      <>    
      <div className="main-display flex-column-start">
      
      {(emails.length !== 0) && emails.map(email => <EmailPreview key={email.id} email={email} onStarClick={onStarClick} onTrashClick={onTrashClick} onEmailClick={onEmailClick} />)}
      {(emails.length === 0) && <div className="empty-list">
        <span>No Emails To Display</span>
      </div> }
    </div>
        


      </>
    )
  }
  
  export default EmailList