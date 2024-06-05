
import ToolBox from "./ToolBox"
function EmailDetails({email, onUnreadEmailclick, onTrashInEmailDetailsClick}) {

  function extractNameFromEmail(email) {
    const atIndex = email.indexOf('@');
    return email.substring(0, atIndex);
}
  
  

    return (
      <>    
        <div className="main-display flex-column-start">
            <ToolBox emailId={email.id} onUnreadEmailclick={onUnreadEmailclick} onTrashInEmailDetailsClick={onTrashInEmailDetailsClick}/>
            <div className="email-subject">
                <span className="subject">{email.subject}</span>
            </div>
            <div className="email-from flex-row-start">
                <span className="from">{email.from}</span>
                <span className="from-email">{`<${email.from}>`}</span>
            </div>
            <div className="email-body">
              <div className="text-wrapper">
                <pre className="text-body">{email.body}</pre>
                </div>

            </div>


        </div>
        


      </>
    )
  }
  
  export default EmailDetails