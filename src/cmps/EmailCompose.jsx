import React, { useState } from 'react';
import '../assets/style/EmailCompose.css';

function EmailCompose({ onClose, onSend }) {
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

  return (
    <div className="email-compose">
      <div className="message-header">
        <span>New Message</span>
        <button className="close-button" onClick={onClose}>&times;</button>
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
