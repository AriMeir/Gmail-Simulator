
export const utilService = {
    makeId,
    generateRandomEmail,
    generateRandomBody,
    generateRandomSubject,
    saveToStorage,
    loadFromStorage
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function generateRandomEmail() {
    const names = ["john", "jane", "alex", "emma", "michael", "sophia", "william", "olivia", "david", "emily"];
    const domains = ["example.com", "test.com", "gmail.com", "yahoo.com", "hotmail.com"];
    
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomDomainIndex = Math.floor(Math.random() * domains.length);

    const name = names[randomNameIndex];
    const domain = domains[randomDomainIndex];

    return `${name}@${domain}`;
}
function generateRandomSubject() {
    const words = [
        "Meeting", "Update", "Reminder", "Invitation", "Request", "Confirmation", 
        "Information", "Notice", "Agenda", "Discussion", "Plan", "Report", "Summary", 
        "Details", "Feedback", "Follow-up", "Notification", "Alert", "Response"
    ];

    function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    const subjectLength = Math.floor(Math.random() * 2) + 2; 
    let subject = '';

    for (let i = 0; i < subjectLength; i++) {
        subject += (i > 0 ? ' ' : '') + getRandomWord();
    }

    return subject;
}
function generateRandomBody() {
    const words = [
        "Please", "review", "the", "attached", "document", "at", "your", "earliest", "convenience", 
        "Let", "me", "know", "if", "you", "have", "any", "questions", "Thank", "you", "for", 
        "your", "time", "and", "consideration", "Looking", "forward", "to", "hearing", "from", 
        "you", "soon", "We", "appreciate", "your", "feedback", "on", "this", "matter", "Best", 
        "regards", "Sincerely", "Kind", "regards", "Best", "wishes", "I", "hope", "you", "are",
        "doing", "well", "This", "is", "a", "gentle", "reminder", "regarding", "our", "upcoming",
        "meeting", "scheduled", "for", "tomorrow"
    ];

    function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    const bodyLength = 50
    let body = 'Hello \n';


    for (let i = 0; i < bodyLength; i++) {
        body += (i > 0 ? ' ' : '') + getRandomWord();
    }

    return body + '.';
}
const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

