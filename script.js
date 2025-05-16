const startBtn = document.getElementById("start-btn");
const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const currentQuestionEl = document.getElementById("current-question");
const options = document.querySelectorAll(".option");
const scoreEl = document.getElementById("score");
const nameInput = document.getElementById("player-name");
const playerNameDisplay = document.getElementById("player-name-display");
const nameEntry = document.getElementById("name-entry");

let quizStartTime;
let currentQuestionIndex = 0;
let score = 0;
let playerAnswers = [];
let shownQuestions = [];

const totalQuestions = 30; // 29 random + 1 cố định

// 100 câu hỏi giả lập
const questions = [
        { question: "Câu hỏi 1", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 2", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 3", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 4", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 5", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 6", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 7", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 8", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 9", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 10", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 11", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 12", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 13", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 14", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 15", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 16", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 17", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 18", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 19", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 20", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 21", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 22", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 23", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 24", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 25", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 26", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 27", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 28", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 29", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 30", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 31", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 32", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 33", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 34", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 35", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 36", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 37", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 38", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 39", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 40", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 41", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 42", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 43", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 44", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 45", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 46", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 47", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 48", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 49", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Tôi có đẹp zai khomg?", options: ["Có", "Không", "Không chắc", "Xấu lắm"], answer: "Có" },
        { question: "Câu hỏi 51", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 52", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 53", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 54", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 55", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 56", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 57", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 58", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 59", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 60", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 61", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 62", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 63", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 64", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 65", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 66", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 67", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 68", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 69", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 70", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 71", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 72", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 73", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 74", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 75", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 76", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 77", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 78", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 79", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 80", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 81", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 82", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 73", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 74", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 75", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 76", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 77", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 78", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 79", options: ["A", "B", "C", "D"], answer: "A" },
        { question: "Câu hỏi 80", options: ["A", "B", "C", "D"], answer: "A" },
    ]
    // Câu hỏi cố định ở vị trí 30 (index 29)
const fixedQuestion = questions[49]; // câu 50, index 49

// Lấy 29 câu random từ 99 câu còn lại (bỏ câu 50)
function getRandomQuestions(allQuestions, count, excludeIndex) {
    // lọc bỏ câu hỏi cố định
    const filtered = allQuestions.filter((_, idx) => idx !== excludeIndex);
    // Loại bỏ câu hỏi trùng nhau theo nội dung (hoặc bạn có thể dùng ID nếu có)
    const uniqueQuestions = Array.from(new Set(filtered.map(q => JSON.stringify(q))))
        .map(qStr => JSON.parse(qStr));
    // xáo trộn
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    // lấy count câu
    return shuffled.slice(0, count);
}

let quizQuestions = [];

// Khởi tạo bộ câu hỏi quiz lần chơi
function initQuiz() {
    quizStartTime = new Date();
    const random29 = getRandomQuestions(questions, 29, 49);
    // Chèn câu cố định vào vị trí 29 (index 29)
    quizQuestions = [...random29.slice(0, 29), fixedQuestion];
    currentQuestionIndex = 0;
    score = 0;
    currentQuestionEl.textContent = 1;
}

// Hiển thị câu hỏi tại index
function showQuestion(index) {
    const q = quizQuestions[index];
    questionText.textContent = q.question;
    options.forEach((btn, i) => {
        btn.disabled = false;
        btn.style.backgroundColor = "";
        btn.textContent = q.options[i];
        btn.onclick = () => {
            // Vô hiệu hóa các nút sau khi chọn
            options.forEach(o => o.disabled = true);

            shownQuestions.push(q.question);
            playerAnswers.push(q.options[i]);

            if (q.options[i] === q.answer) {
                btn.style.backgroundColor = "green";
                score++;
            } else {
                btn.style.backgroundColor = "red";
                // Tô màu đáp án đúng
                options.forEach(o => {
                    if (o.textContent === q.answer) {
                        o.style.backgroundColor = "green";
                    }
                });
            }
            // Chờ 1 giây rồi sang câu tiếp theo
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex >= totalQuestions) {
                    showResult();
                } else {
                    currentQuestionEl.textContent = currentQuestionIndex + 1;
                    showQuestion(currentQuestionIndex);
                }
            }, 500);
        };
    });
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreEl.textContent = `Bạn trả lời đúng ${score}/${totalQuestions}`;
    if (score >= 15) {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
}

// Bắt đầu chơi
startBtn.addEventListener("click", () => {
    introScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");
    initQuiz();
    showQuestion(currentQuestionIndex);
});

// Xử lý nhập tên
const submitNameBtn = document.getElementById("submit-name");
submitNameBtn.addEventListener("click", handleNameSubmit);
nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleNameSubmit();
    }
});

function handleNameSubmit() {
    const name = nameInput.value.trim();
    if (name !== "") {
        playerNameDisplay.textContent = `Thanks for playing, ${name}!`;
        playerNameDisplay.classList.remove("hidden");
        nameEntry.classList.add("hidden");

        const quizEndTime = new Date();
        const durationSeconds = Math.round((quizEndTime - quizStartTime) / 1000);
        const data = {
            name: name,
            score: score,
            result: `${score}/${totalQuestions}`,
            time_taken_seconds: durationSeconds,
            timestamp: new Date().toISOString(),
            questions: shownQuestions,
            answers: playerAnswers
        };

        fetch("/.netlify/functions/submitQuiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

    }
}


// Cảnh báo khi thoát trang
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = "Bạn sẽ mất tiến độ nếu rời khỏi trang đấy";
});