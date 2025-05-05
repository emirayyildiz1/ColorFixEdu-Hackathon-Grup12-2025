function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== "") {
        const chatBox = document.getElementById('chatBox');

        const userMessage = document.createElement('div');
        userMessage.classList.add('chat-message', 'user-message');
        userMessage.innerHTML = `<p><strong>Siz:</strong> ${userInput}</p>`;
        chatBox.appendChild(userMessage);

        const botMessage = document.createElement('div');
        botMessage.classList.add('chat-message', 'bot-message');
        botMessage.innerHTML = `<p><strong>Bot:</strong> Merhaba! Size nasıl yardımcı olabilirim?</p>`;
        chatBox.appendChild(botMessage);

        document.getElementById('userInput').value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function resetChat() {
    document.getElementById('chatBox').innerHTML =
        '<div class="chat-message bot-message"><p><strong>Bot:</strong> Merhaba! Size nasıl yardımcı olabilirim?</p></div>';
}

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const chatBox = document.getElementById('chatBox');
        const imgMessage = document.createElement('div');
        imgMessage.classList.add('chat-message', 'user-message');
        imgMessage.innerHTML = `<p><strong>Siz:</strong> Yüklenen resim:</p><img src="${URL.createObjectURL(file)}" style="max-width: 100%; border-radius: 10px;">`;
        chatBox.appendChild(imgMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
