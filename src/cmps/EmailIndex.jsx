import EmailFolderList from "./EmailFolderList"
import EmailList from "./EmailList"
import Header from "./Header"
import EmailCompose from "./EmailCompose"
import { emailService } from "../services/email.service"
import EmailDetails from "./EmailDetails"
import SortBar from "./SortBar"
import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams  } from "react-router-dom"

function EmailIndex() {
  // params
  const [searchParams, setSearchParams] = useSearchParams()
  const {folderId, query, emailId} = useParams()
  const [showSortBar,setShowSortBar] = useState(false)
  const [showCompose,setShowCompose] = useState(false)
  const [unread,setUnread] = useState({})
  /* const [currentLibrary, setCurrentLibrary] = useState('inbox') */
  const [emailToDisplay, setEmailToDisplay] = useState('')
  const [emails, setEmails] = useState([])
  const [filter,setFilter] = useState('')
  const params = useParams()
  const navigate = useNavigate()

  
  // use Effects
  useEffect(() => {
    if(emailId) {
      navigate(`/email/${emailId}`)
    }
    else if(query) {
      navigate(`/search/${query}`)
    } else {
      clearEmailToDisplay()
      navigate(`/${folderId}`)
    }
  },[])

  useEffect(()=> {
    if(emailId) {
      loadEmailToDisplay(emailId)
    }
    else if(query) {
      clearEmailToDisplay()
      loadEmailsbyQuery(query)
    } else {
      clearEmailToDisplay()
      loadEmails(folderId)
    }
      loadUnreadEmailsNumber()
  },[params])


  useEffect(() => {
    const composeVal = searchParams.get('compose')
    if(composeVal === 'new')
      onOpenCompose()
  },[])


// functions


function onSortClick() {
  setShowSortBar(prev => !prev)
}

function clearEmailToDisplay() {
  setEmailToDisplay('')
}
async function loadUnreadEmailsNumber() {
  const unreadMessages = await emailService.getUnreadMessages()
  setUnread(unreadMessages)
}
async function loadEmails (filterBy) {
       const filter = {
        status: filterBy,
        text:'',
        isRead: ''
        }  
    const emailList = await emailService.query(filter)
    setEmails(emailList)
}
async function loadEmailsbyQuery (query) {
       const filter = {
        status: '',
        text:query,
        isRead: ''
        }  
    const emailList = await emailService.query(filter)
    setEmails(emailList)
}
async function loadEmailToDisplay (emailId) {
       
    const email = await emailService.getEmailById(emailId)
    setEmailToDisplay(email)
    console.log(email)
}


function onCloseCompose() {
  setShowCompose(false);
  setSearchParams((prev) => {
    prev.delete('compose');
    return prev;
  });
}
function onOpenCompose() {
  setShowCompose(true);
  setSearchParams((prev) => {
    prev.set('compose', 'new')
    return prev;
  })
}
// Send Email
function onSend(email) {
  try {
  emailService.handleSendEmail(email)
  setSearchParams((prev) => {
    prev.delete('compose');
    return prev;
  });
  } catch(e) {
    console.log(e)
  }
}
async function onUnreadEmailclick(id) {
  try {
    await emailService.markAsUnread(id)
    clearEmailToDisplay()
    navigate(`/inbox`)
   } catch(e) {
    console.log(e)
  }
}

function onEmailClick(id) {
 try {
  emailService.markAsRead(id)
  navigate(`/email/${id}`)
 } catch(e) {
  console.log(e)
}
}

function handleFilterSubmit(e) {
  e.preventDefault()
  clearEmailToDisplay()
  navigate(`/search/${filter}`)
}


function onFolderClick(status) {
  if(status !== folderId){
  const fliterBy = {
    status: status,
    text:'',
    isRead: ''
    }
  clearEmailToDisplay()
  navigate(`/${status}`)
  loadEmails(fliterBy)
  }
}
async function onTrashInEmailDetailsClick (emailId) {
  try {
     
      await emailService.markAsRemoved(emailId)
      navigate(-1)
  } catch (error) {
      console.error('Error toggling removed status:', error)
  }
};


async function onTrashClick (emailId) {
    try {
       
        await emailService.markAsRemoved(emailId)
        if(folderId){
        clearEmailToDisplay()
        navigate(`/${folderId}`)
      } else{
        clearEmailToDisplay()
        navigate(`/search/${query}`)
      }
        
    } catch (error) {
        console.error('Error toggling removed status:', error)
    }
};


async function onStarClick (emailId) {
    try {
        await emailService.toggleStarStatus(emailId)
        if(folderId)
          navigate(`/${folderId}`)
          else{
            navigate(`/search/${query}`)
          }
    } catch (error) {
        console.error('Error toggling star status:', error)
    }
};


// ------------------------ Page ------------------------------------
    return (
      <>
      <Header filter={filter} setFilter={setFilter} handleFilterSubmit={handleFilterSubmit} onSortClick={onSortClick}/>
      {showSortBar && <SortBar/>}
      <div className="body_container flex-row-center">
        <EmailFolderList onFolderClick={onFolderClick} unread={unread} currentFolder={folderId} onOpen={onOpenCompose}/>

        {(folderId || query) && <EmailList emails={emails}  onStarClick={onStarClick} onTrashClick={onTrashClick} onEmailClick={onEmailClick}/>}
        {(emailId && emailToDisplay) && <EmailDetails email={emailToDisplay} onUnreadEmailclick={onUnreadEmailclick} onTrashInEmailDetailsClick={onTrashInEmailDetailsClick}/>}
      </div>
      {showCompose && <EmailCompose onSend={onSend} onClose={onCloseCompose}/>}
      </>
    )
  }
  
  export default EmailIndex
  