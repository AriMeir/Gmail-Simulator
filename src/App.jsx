import { HashRouter as Router, Routes, Route } from "react-router-dom"
import EmailIndex from "./cmps/EmailIndex"
import { UserMsg } from "./cmps/UserMsg"
import './App.css'
function App() {
  

  return (
    <>
    <Router>
    <Routes>
      <Route path='/:folderId?' element={<EmailIndex/>}/>
      <Route path='/search/:query' element={<EmailIndex/>}/>
      <Route path='/email/:emailId' element={<EmailIndex/>}/>
    </Routes>
    <UserMsg/>
    </Router>
  
    </>
  )
}

export default App
