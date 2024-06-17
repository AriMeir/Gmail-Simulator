import React, { useState } from 'react';
import { CgArrowsExpandLeft } from "react-icons/cg";
import '../assets/style/EmailCompose.css';

function EmailCompose({ onClose, onSend }) {
  const [minimize, setMinimize] = useState(false);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = { to, subject, body };
    onSend(email);
    setTo('');
    setSubject('');
    setBody('');
    onClose(); 
  };

  function onMinimizeComposeWindow() {
    setMinimize(prev => !prev)
  }

  if (minimize) return <div className='minimizeEmail'></div>
  return (
    <div className="email-compose">
      <div className="message-header">
        <span>New Message</span>
        <div className='compose-button-options flex-row-reverse-center gap'>
        <button className="close-button" onClick={onClose}>&times;</button>
        <button className="close-button open-bigger-compose-button" onClick={onClose}><CgArrowsExpandLeft /></button>
        <button className="close-button minimize-button" onClick={onMinimizeComposeWindow}>_</button>
        </div>
      </div>
      <form className="compose-form" onSubmit={handleSubmit}>
        <div className="form-group">
          
          <input 
            type="email" 
            id="to" 
            name="to" 
            value={to}
            placeholder='To:'
            onChange={(e) => setTo(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          
          <input 
            type="text" 
            id="subject" 
            placeholder='Subject:'
            name="subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required 
          />
        </div>
        <div className="form-group flex-one">
          <textarea 
            id="body" 
            name="body" 
            rows="13" 
            placeholder="Type your message here" 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="footer">
          <button type="submit" className="send-button">Send</button>
        </div>
      </form>
    </div>
  );
}

export default EmailCompose;
