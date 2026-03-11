// ===== VOICE & CHATBOT WIDGET =====
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const voiceBtn = document.getElementById('voice-btn');
const chatbotMessages = document.getElementById('chatbot-messages');

let isRecording = false;
let recognition = null;

// Initialize Web Speech API if supported
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        isRecording = true;
        voiceBtn.classList.add('recording');
        chatInput.placeholder = "Listening...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        sendMessage();
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        stopRecording();
    };

    recognition.onend = () => {
        stopRecording();
    };
} else {
    if (voiceBtn) voiceBtn.style.display = 'none'; // Hide if voice not supported
}

function stopRecording() {
    isRecording = false;
    if (voiceBtn) voiceBtn.classList.remove('recording');
    if (chatInput) chatInput.placeholder = "Type or speak a message...";
}

// Toggle logic
if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.add('active');
    });
}

if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
        stopRecording();
        if (recognition) recognition.stop();
    });
}

// Messaging logic
function addMessage(text, sender) {
    if (!chatbotMessages) return;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.textContent = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Fast Voice Synthesizer for Bot
    if (sender === 'bot' && 'speechSynthesis' in window) {
        // Stop any current talking so it doesn't overlap
        window.speechSynthesis.cancel();
        
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1.1;
        utterance.rate = 1.05;
        // Try to find a good female English voice if available
        const voices = synth.getVoices();
        const preferredVoice = voices.find(v => v.lang.includes('en') && v.name.includes('Female'));
        if (preferredVoice) utterance.voice = preferredVoice;
        
        synth.speak(utterance);
    }
}

function handleBotResponse(userText) {
    const text = userText.toLowerCase();
    let response = "I'm Tanya's virtual assistant! I can help you with bookkeeping questions or direct you to schedule a consultation. Would you like to book a call?";
    
    if (text.includes('price') || text.includes('cost')) {
        response = "Our bookkeeping packages are custom-tailored to your business's size and transaction volume. I'd highly recommend booking a free 15-minute consultation to get an exact quote!";
    } else if (text.includes('tax')) {
        response = "We specialize exclusively in daily bookkeeping to give you hyper-accurate, audit-ready financials. This means your CPA will have pristine books to file your taxes stress-free!";
    } else if (text.includes('book') || text.includes('schedule') || text.includes('call') || text.includes('appointment')) {
        response = "Great! You can schedule a free consultation with Tanya directly using the 'Free Consultation' button at the top of the page or the calendar below.";
    } else if (text.includes('hi') || text.includes('hello')) {
        response = "Hello there! How can I help you streamline your financials today? Try asking me about our services or scheduling a call.";
    }

    setTimeout(() => {
        addMessage(response, 'bot');
    }, 600);
}

function sendMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    chatInput.value = '';
    
    // Disable voice recording if manual send
    if (isRecording) {
        recognition.stop();
        stopRecording();
    }

    handleBotResponse(text);
}

if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
        // Initialize voices for synthesis purely down here if needed
        window.speechSynthesis.getVoices();

        if (isRecording) {
            recognition.stop();
            stopRecording();
        } else {
            if (recognition) {
                recognition.start();
            }
        }
    });
}
