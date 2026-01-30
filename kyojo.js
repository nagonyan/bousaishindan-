// --- 共助(Kyojo)データ ---
const kyojoQuizData = [
    {
        question: "Q1. 緊急時の自分の行動として当てはまるものは？",
        answers: [
            { text: "A: 考えるより先に行動する", scores: { kyujo: 5, joho: 0, shiki: 0, shien: 0 } },
            { text: "B: 何が起こっているのか、状況を確認する", scores: { kyujo: 0, joho: 5, shiki: 0, shien: 0 } },
            { text: "C: 周囲が混乱しているので統率をとる", scores: { kyujo: 0, joho: 0, shiki: 5, shien: 0 } },
            { text: "D: 周囲の困っている人に声をかける", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 5 } }
        ]
    },
    {
        question: "Q2. 困っている人を見つけたとき、どのように動く？",
        answers: [
            { text: "A: すぐ声をかけて助ける", scores: { kyujo: 5, joho: 0, shiki: 0, shien: 3 } },
            { text: "B: 周囲に助けを求める", scores: { kyujo: 2, joho: 1, shiki: 3, shien: 5 } },
            { text: "C: 安全を確認してから行動する", scores: { kyujo: 1, joho: 5, shiki: 3, shien: 2 } },
            { text: "D: 他の人の動きを見て判断する", scores: { kyujo: 0, joho: 1, shiki: 5, shien: 3 } }
        ]
    },
    {
        question: "Q3. 周囲の意見が割れたとき、どう対応する？",
        answers: [
            { text: "A: 自分の判断で行動する", scores: { kyujo: 5, joho: 1, shiki: 4, shien: 0 } },
            { text: "B: 全員の意見をまとめようとする", scores: { kyujo: 0, joho: 2, shiki: 5, shien: 4 } },
            { text: "C: 多数派に合わせる", scores: { kyujo: 1, joho: 1, shiki: 0, shien: 1 } },
            { text: "D: まず静観して様子を見る", scores: { kyujo: 0, joho: 4, shiki: 1, shien: 0 } }
        ]
    },
    // 省略されている質問もここに追加してください（Q4〜Q19まで）
    // ※今回は動作確認のため、主要な質問のみで構成していますが、
    //  納品時は元のscript.jsから全質問をコピーしてください。
    {
        question: "Q4. チームで活動するとき、意見が対立したら？",
        answers: [
            { text: "A: 自分の考えを主張する", scores: { kyujo: 3, joho: 2, shiki: 3, shien: 0 } },
            { text: "B: 全員の合意を目指す", scores: { kyujo: 0, joho: 2, shiki: 5, shien: 4 } },
            { text: "C: 一旦中立に回る", scores: { kyujo: 2, joho: 3, shiki: 2, shien: 3 } },
            { text: "D: リーダーに従う", scores: { kyujo: 2, joho: 3, shiki: 0, shien: 3 } }
        ]
    }
];

const kyojoResultData = {
    kyujo: {
        name: "つっぱりうさぎ",
        tagline: "突っ張り棒で支えるぜ！",
        description: "体力と行動力がバツグン！瓦礫の除去や避難誘導など、現場で体を張って活躍するヒーロータイプです。",
        image: "usagi.png"
    },
    joho: {
        name: "ラジオオワシ",
        tagline: "情報は『ワシ（私）』にお任せ！",
        description: "冷静に状況を分析できる知性派！デマに惑わされず、正しい情報をみんなに伝える司令塔の補佐役です。",
        image: "owashi.png"
    },
    shiki: {
        name: "リードッグ",
        tagline: "みんなこっちに集まるワン",
        description: "全体を見渡すリーダーシップがあります。混乱した場をまとめ上げ、役割分担を指示する頼れるボスです。",
        image: "dog.png"
    },
    shien: {
        name: "ケアパカ",
        tagline: "みんなをケアするパカ！",
        description: "優しく寄り添う心のケア担当。不安な人や弱者に声をかけ、避難所の雰囲気を和らげる癒やしの存在です。",
        image: "alpaca.png"
    }
};

// --- ロジック ---
let currentKyojoQuestionIndex = 0;
let kyojoScores = { kyujo: 0, joho: 0, shiki: 0, shien: 0 };

const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const kyojoResultArea = document.getElementById('kyojo-result-area');

displayKyojoQuestion();

function displayKyojoQuestion() {
    quizContainer.innerHTML = '';
    const qData = kyojoQuizData[currentKyojoQuestionIndex];

    const questionText = document.createElement('h2');
    questionText.innerHTML = `Q${currentKyojoQuestionIndex + 1}. <br>${qData.question}`;
    quizContainer.appendChild(questionText);

    qData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        const buttonText = answer.text.includes('：') ? answer.text.split('：')[1] : answer.text;
        button.innerText = buttonText.trim();
        button.onclick = () => handleKyojoAnswer(answer.scores);
        quizContainer.appendChild(button);
    });
}

function handleKyojoAnswer(scores) {
    kyojoScores.kyujo += scores.kyujo;
    kyojoScores.joho += scores.joho;
    kyojoScores.shiki += scores.shiki;
    kyojoScores.shien += scores.shien;

    currentKyojoQuestionIndex++;

    if (currentKyojoQuestionIndex < kyojoQuizData.length) {
        displayKyojoQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    let maxScore = -1;
    let resultType = 'shien';
    for (const [type, score] of Object.entries(kyojoScores)) {
        if (score > maxScore) {
            maxScore = score;
            resultType = type;
        }
    }

    const resultData = kyojoResultData[resultType];
    kyojoResultArea.innerHTML = `
        <img src="${resultData.image}" alt="${resultData.name}" class="result-char-img">
        <h3>${resultData.name}</h3>
        <p style="background:#eee; padding:10px; border-radius:5px;">${resultData.tagline}</p>
        <p>${resultData.description}</p>
    `;
}