import { HashRouter as Router, Routes, Route } from "react-router-dom"
import EmailIndex from "./cmps/EmailIndex"
import Header from "./cmps/Header"
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
    </Router>
  
    </>
  )
}

export default App
