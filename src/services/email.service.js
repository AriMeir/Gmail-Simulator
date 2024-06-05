import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    toggleStarStatus,
    markAsRemoved,
    handleSendEmail,
    toggleReadStatus,
    markAsUnread,
    markAsRead,
    getEmailById,
    getUnreadMessages
}
const user = 'user@appsus.com'
const STORAGE_KEY = 'emails'

_createEmails()

async function query(filterBy) {
    try {
        let emails = await storageService.query(STORAGE_KEY);
        if (filterBy) {
            let { status = '', text = '', isRead } = filterBy;

            // Filter by status
            if (status === 'inbox') {
                emails = emails.filter(email => !email.removedAt && email.from !== user);
            } else if (status === 'sent') {
                emails = emails.filter(email => !email.removedAt && email.from === user);
            } else if (status === 'star') {
                emails = emails.filter(email => email.isStarred);
            } else if (status === 'trash') {
                emails = emails.filter(email => email.removedAt);
            }

            //Filter by text
             if (text) {
                const toLowerCaseFilter = text.toLowerCase()
                emails = emails.filter(email =>
                email.from.toLowerCase().includes(toLowerCaseFilter) ||
                email.subject.toLowerCase().includes(toLowerCaseFilter) ||
                email.body.toLowerCase().includes(toLowerCaseFilter)
            )}

           
           /*  if (isRead !== undefined) {
                emails = emails.filter(email =>
                    isRead === null || email.isRead === isRead
                );
            }  */
        }
        return emails;
    } catch (error) {
        console.log('error:', error);
        throw error;
    }
}
async function getEmailById(emailId) {
    try {
        let emails = await storageService.query(STORAGE_KEY);
        const email = emails.find(email => email.id === emailId); 
        return email; 
    } catch (error) {
        console.log('error:', error);
        throw error;
    }
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}



function getDefaultFilter() {
    return {
        type: '',
        minBatteryStatus: 0,
        maxBattery: '',
        model: ''
    }
}

function createEmail() {
    let timestamp = Date.now();
    return {
        id: utilService.makeId(),
        subject: utilService.generateRandomSubject(),
        body: utilService.generateRandomBody(),
        isRead: false,
        isStarred: false,
        sentAt: timestamp,
        removedAt: null,
        from: utilService.generateRandomEmail(),
        to: user
    };
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    if (!emails || !emails.length) {
        emails = [];
        for (let i = 0; i < 50; i++) {
            emails.push(createEmail());
        }
        utilService.saveToStorage(STORAGE_KEY, emails);
    }
}
function toggleStarStatus(emailId) {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    const emailIndex = emails.findIndex(email => email.id === emailId);
    
    if (emailIndex !== -1) {
        emails[emailIndex].isStarred = !emails[emailIndex].isStarred;
        
        utilService.saveToStorage(STORAGE_KEY, emails);
        return Promise.resolve();
    } else {
        return Promise.reject(new Error('Email not found'));
    }
}
function markAsRead(emailId) {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    const emailIndex = emails.findIndex(email => email.id === emailId);

    if (emailIndex !== -1) {
        if (!emails[emailIndex].isRead) {
            emails[emailIndex].isRead = true;
            utilService.saveToStorage(STORAGE_KEY, emails);
        }
        return Promise.resolve();
    } else {
        return Promise.reject(new Error('Email not found'));
    }
}
function markAsUnread(emailId) {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    const emailIndex = emails.findIndex(email => email.id === emailId);

    if (emailIndex !== -1) {
        if (emails[emailIndex].isRead) {
            emails[emailIndex].isRead = false;
            utilService.saveToStorage(STORAGE_KEY, emails);
        }
        return Promise.resolve();
    } else {
        return Promise.reject(new Error('Email not found'));
    }
}
function toggleReadStatus(emailId) {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    const emailIndex = emails.findIndex(email => email.id === emailId);
    
    if (emailIndex !== -1) {
        emails[emailIndex].isRead = !emails[emailIndex].isRead;
        
        utilService.saveToStorage(STORAGE_KEY, emails);
        return Promise.resolve();
    } else {
        return Promise.reject(new Error('Email not found'));
    }
}
function markAsRemoved(emailId) {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    const emailIndex = emails.findIndex(email => email.id === emailId);
    
    if (emailIndex !== -1) {
        const email = emails[emailIndex];
        if (!email.removedAt) { 
            email.removedAt = Date.now();
            utilService.saveToStorage(STORAGE_KEY, emails);
        }
        return Promise.resolve();
    } else {
        return Promise.reject(new Error('Email not found'));
    }
}
function handleSendEmail(email) {
    let timestamp = Date.now();
    const newEmail = {
        subject: email.subject,
        body: email.body,
        isRead: true,
        isStarred: false,
        sentAt: timestamp,
        removedAt: null,
        from: user,
        to: email.to
    }; 
    save(newEmail)
    
}
function getUnreadMessages() {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    const inbox= emails.filter(email => !email.removedAt && email.from !== user && email.isRead == false).length
    const starred= emails.filter(email => email.isStarred && email.isRead == false).length
    const trash= emails.filter(email => email.removedAt && email.isRead == false).length
    return {inbox, starred, trash }
}



