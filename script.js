const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

const randomMessages = [
    "อย่าปากแข็ง",
    "ใจอ่อนเถอะ",
    "เอาเถอะน้าาาาาา",
    "กด yes ได้มุ้ย"
];

let lastMessage = "";  // เก็บข้อความล่าสุดที่แสดง

yesBtn.addEventListener("click", () => {
    // ซ่อนปุ่ม Yes และ No
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    
    // เปลี่ยนข้อความ
    question.innerHTML = "I love you too😘";
    gif.src = "https://i.pinimg.com/originals/55/3d/42/553d42bea9b10e0662a05aa8726fc7f4.gif";

    // ดึง IP ของผู้ใช้และส่ง Webhook ไปยัง Discord
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const webhookUrl = 'https://discord.com/api/webhooks/1290361528918216755/MO0uoxLrZ2rzBljDpfct4GzfYML9NDfLsHW7GclQ9kHFMnvQdEi8DX8QSEGxvL8hDKQB';

            // ส่งข้อมูลไปยัง Discord Webhook
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `ผู้ใช้กดปุ่ม Yes พร้อม IP: ${ip}`
                })
            }).then(() => {
                console.log('ข้อมูลถูกส่งไปยัง Discord Webhook สำเร็จ');
            }).catch(err => {
                console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', err);
            });
        })
        .catch(err => {
            console.error('เกิดข้อผิดพลาดในการดึง IP:', err);
        });
});

noBtn.addEventListener("mouseover", () => {
    // เคลื่อนที่ปุ่ม No
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    // สุ่มข้อความเมื่อปุ่ม No เคลื่อนที่
    let randomIndex;
    let message;
    do {
        randomIndex = Math.floor(Math.random() * randomMessages.length);
        message = randomMessages[randomIndex];
    } while (message === lastMessage);  // สุ่มใหม่จนกว่าจะไม่ซ้ำ

    lastMessage = message;  // เก็บข้อความที่เพิ่งแสดง

    const messageElement = document.createElement("div");
    messageElement.innerHTML = message;
    messageElement.style.position = "fixed";
    messageElement.style.top = "10px";
    messageElement.style.right = "10px";
    messageElement.style.backgroundColor = "rgba(233, 77, 88, 0.9)";
    messageElement.style.color = "white";
    messageElement.style.padding = "10px";
    messageElement.style.borderRadius = "10px";
    messageElement.style.boxShadow = "0 2px 4px gray";
    messageElement.style.fontSize = "1.2em";

    // ลบข้อความเดิมก่อนหน้าที่เคยแสดง
    const existingMessage = document.querySelector('.random-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    messageElement.classList.add('random-message');
    document.body.appendChild(messageElement);

    // ตั้งเวลาให้ข้อความหายไปหลังจาก 3 วินาที
    setTimeout(() => {
        messageElement.remove();
    }, 3000);  // 3000 มิลลิวินาที = 3 วินาที
});
