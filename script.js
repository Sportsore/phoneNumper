// تسجيل الدخول
document.getElementById('login-btn').addEventListener('click', function () {
    const code = document.getElementById('login-code').value;

    if (code === 'PHONE-QW-SOF') { // الكود المطلوب
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
    } else {
        alert('الكود غير صحيح.');
    }
});

// بدء العملية
document.getElementById('start-btn').addEventListener('click', function () {
    const phoneList = document.getElementById('phone-list');
    const selectedValue = phoneList.value;

    if (selectedValue.startsWith('paid')) {
        // إذا كان الرقم مدفوعًا
        alert('هذا الرقم يتطلب اشتراك بقيمة 5$. تواصل معنا على تيليجرام.');
        window.open('https://t.me/caser7', '_blank');
    } else {
        // إذا كان الرقم مجانيًا
        fetchMessages(selectedValue);
    }
});

function fetchMessages(phone) {
    const url = "https://www.mytrashmobile.com/ajax.php?task=receive";
    const payload = `number=${phone}&osname=&uid=&lang=&appversion=&appident=`;

    document.getElementById('messages').innerHTML = '<p>Loading messages...</p>';

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
            'x-requested-with': "XMLHttpRequest"
        },
        body: payload
    })
    .then(response => response.text())
    .then(data => {
        const pattern = /<td class="message-content">(.*?)<\/td>/g;
        let match;
        const messages = [];

        while ((match = pattern.exec(data)) !== null) {
            messages.push(match[1].trim());
        }

        displayMessages(messages);
    })
    .catch(error => {
        console.error('Error fetching messages:', error);
        document.getElementById('messages').innerHTML = '<p>Error loading messages.</p>';
    });
}

function displayMessages(messages) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';

    if (messages.length > 0) {
        messages.forEach(msg => {
            const messagePanel = document.createElement('div');
            messagePanel.style.border = "1px solid #28a745";
            messagePanel.style.padding = "10px";
            messagePanel.style.marginBottom = "5px";
            messagePanel.style.borderRadius = "5px";
            messagePanel.style.backgroundColor = "#d4edda";
            messagePanel.style.color = "#155724";

            messagePanel.innerHTML = msg;
            messagesDiv.appendChild(messagePanel);
        });
    } else {
        messagesDiv.innerHTML = '<p>No messages found.</p>';
    }
}
