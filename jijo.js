// --- 自助(Jijo)データ ---
const jijoQuizData = {
    question: "Q1: あなたが地震時の対策を知りたいシチュエーションを選んでください",
    options: {
        "選択肢A: 自宅": {
            question: "Q2：暮らしかたは？",
            options: {
                "選択肢A-1：一人暮らし": {
                    question: "Q3：家の中で、よく過ごすのは？",
                    options: {
                        "選択肢A-2-a: 居間（リビング）": {
                            step0: "家具の固定は大丈夫？背の高い本棚は必ず固定しよう！",
                            step1: "揺れが起きたら、テーブルの下に身を隠そう！",
                            step2: "揺れが収まったら、玄関を開けて避難経路を確保！"
                        },
                        "選択肢A-2-b: キッチン": {
                            step0: "電子レンジ台の固定と、冷蔵庫の上に物を置かないようにしよう！",
                            step1: "揺れが起きたら、火の元から離れ、テーブル下へ！",
                            step2: "揺れが収まったら、火を消してガスの元栓を締めよう！"
                        },
                        "選択肢A-1-c: 寝室": {
                            step0: "懐中電灯とスリッパを枕元に準備しておこう！",
                            step1: "揺れが起きたら、布団で頭を守り、ベッドの上で丸まろう！",
                            step2: "揺れが収まったら、スリッパを履いて移動しよう！"
                        }
                    }
                },
                "選択肢A-2：実家暮らし": {
                    question: "Q3：家の中で、よく過ごすのは？",
                    options: {
                        "選択肢A-2-a: 居間（リビング）": {
                            step0: "家族と安否確認方法を決めておこうね！",
                            step1: "揺れが起きたら、テーブルの下に身を隠そう！",
                            step2: "揺れが収まったら、まず家族の安否確認！"
                        },
                        "選択肢A-2-b: キッチン": {
                            step0: "家族みんなの水と食料は備蓄してる？",
                            step1: "揺れが起きたら、食器棚から離れテーブル下へ！",
                            step2: "揺れが収まったら、火を消し、ガスの元栓を締めよう！"
                        },
                        "選択肢A-2-c: 寝室": {
                            step0: "家族みんなの寝室の家具固定も手伝おう！",
                            step1: "揺れが起きたら、布団で頭を守ろう！",
                            step2: "揺れが収まったら、スリッパを履いて家族の元へ！"
                        }
                    }
                }
            }
        },
        "選択肢B：アルバイト先": {
            question: "Q2：職種は？",
            options: {
                "選択肢B-1：小売": {
                    question: "Q3：主な担当業務は？",
                    options: {
                        "選択肢B-1-a：レジ/接客": {
                            step0: "レジ後ろの棚が固定されているか確認してみよう！",
                            step1: "揺れが起きたら、カウンターの足につかまって！",
                            step2: "揺れが収まったら、お客様を避難経路へ案内しよう！"
                        },
                        "選択肢B-1-b：品出し・バックヤード": {
                            step0: "在庫や段ボールで非常口を塞がないように整理しよう！",
                            step1: "揺れが起きたら、頑丈な作業台の下へ！",
                            step2: "揺れが収まったら、すぐに出口を確保！"
                        }
                    }
                },
                "選択肢B-2：塾講師": {
                    step0: "生徒の避難誘導マニュアルを確認しておこう！",
                    step1: "揺れが起きたら、机の下に隠れ、生徒にも指示を出して！",
                    step2: "揺れが収まったら、ドアを開け、生徒を誘導しよう！"
                },
                "選択肢B-3：飲食": {
                    question: "Q3：主な担当業務は？",
                    options: {
                        "選択肢B-3-a：ホール": {
                            step0: "消火器の場所を確認しておこう！",
                            step1: "揺れが起きたら、料理を置き、テーブルの脚を掴んで頭を守ろう！",
                            step2: "揺れが収まったら、ガラス破片に注意しお客様を誘導！"
                        },
                        "選択肢B-3-b：キッチン": {
                            step0: "油や火を扱う場所の整理整頓は徹底してる？",
                            step1: "揺れが起きたら、火のそばでもまず身を守るのが最優先！",
                            step2: "揺れが収まったら、火を消してガスの元栓を締めよう！"
                        }
                    }
                }
            }
        },
        "選択肢C：大学": {
            question: "Q2：よくいる場所は？",
            options: {
                "選択肢C-1：大教室": {
                    step0: "非常口の位置を確認する癖をつけよう！",
                    step1: "揺れが起きたら、机の下に隠れて！",
                    step2: "揺れが収まったら、ドアを開け避難経路を確保！"
                },
                "選択肢C-2：研究室": {
                    step0: "薬品棚や実験機器は固定してある？",
                    step1: "揺れが起きたら、机の下へ。薬品棚からは離れて！",
                    step2: "揺れが収まったら、火の元と薬品の状況を確認！"
                },
                "選択肢C-3：図書館": {
                    step0: "本棚から離れた席を選ぶようにしよう！",
                    step1: "揺れが起きたら、カバンで頭を守り机の下へ！",
                    step2: "揺れが収まったら、本棚から離れ広い場所へ！"
                },
                "選択肢C-4：体育館": {
                    step0: "壁際の器具が固定されているか確認！",
                    step1: "揺れが起きたら、中央へ移動し頭を守ろう！",
                    step2: "揺れが収まったら、落下物に注意し避難！"
                },
                "選択肢C-5：食堂/生協": {
                    step0: "ガラス面の位置を確認しておこう！",
                    step1: "揺れが起きたら、テーブルの下へ！",
                    step2: "揺れが収まったら、破片に注意し移動！"
                }
            }
        },
        "選択肢D: 移動中": {
            question: "Q2: 主な移動手段は？",
            options: {
                "D-1: 電車": {
                    question: "Q3: どちらにいますか？",
                    options: {
                        "D-1-a:電車内": {
                            step0: "手すりやつり革の近くに立とう！",
                            step1: "揺れが起きたら、しっかり掴まり姿勢を低く！",
                            step2: "揺れが収まったら、乗務員の指示に従おう！"
                        },
                        "D-1-b:ホーム": {
                            step0: "なるべく柱の近くや壁際を歩こう！",
                            step1: "揺れが起きたら、柱のそばでしゃがもう！",
                            step2: "揺れが収まったら、係員の指示に従おう！"
                        }
                    }
                },
                "D-2: 車": {
                    question: "Q3: 主にどこを走る？",
                    options: {
                        "D-2-a: 市街地": {
                            step0: "ガソリンは常に半分以上を心がけよう！",
                            step1: "ハザードを焚き、左に寄せて停車！",
                            step2: "避難時はキーを付けたままにしよう！"
                        },
                        "D-2-b: 高速道路": {
                            step0: "車内に防災グッズは積んである？",
                            step1: "急ブレーキ厳禁！ゆっくり左に寄せて停車！",
                            step2: "車を置いて歩かないようにしよう！"
                        },
                        "D-2-c: 山道": {
                            step0: "土砂災害ハザードマップを確認！",
                            step1: "崖のそばを避け、開けた場所で停車！",
                            step2: "土砂崩れに注意し安全な場所へ！"
                        }
                    }
                },
                "D-3: 徒歩・自転車": {
                    step0: "看板やブロック塀の下を歩かない意識を！",
                    step1: "その場で立ち止まり、カバンで頭を守ろう！",
                    step2: "広い場所（公園や学校）へ移動しよう！"
                }
            }
        },
        "選択肢E: 外出先（屋内)": {
            question: "Q2: シチュエーションを選んでください",
            options: {
                "E-1-a: 店舗内・地下街": {
                    step0: "避難経路を必ず確認する癖をつけよう！",
                    step1: "商品棚から離れ、柱のそばや壁際で身を低く！",
                    step2: "慌てず係員の指示に従おう！"
                },
                "E-1-b: エレベーター": {
                    step0: "必ず手すりに掴まろう！",
                    step1: "全ての階のボタンを押し、停止した階で降りる！",
                    step2: "閉じ込められたら非常ボタンで連絡を！"
                },
                "E-1-c: エスカレーター": {
                    step0: "必ず手すりに掴まろう！",
                    step1: "手すりに掴まり、その場でしゃがんで！",
                    step2: "揺れが収まったら歩いて降りよう！"
                }
            }
        },
        "選択肢F: 外出先（屋外)": {
            question: "Q2: シチュエーションを選んでください",
            options: {
                "F-1: ビル街": {
                    step0: "看板や室外機の下を歩かないように！",
                    step1: "カバンで頭を守り、頑丈なビルの柱のそばへ！",
                    step2: "落下物に注意し広い場所へ！"
                },
                "F-2: 公園": {
                    step0: "地域の広域避難場所を確認しておこう！",
                    step1: "その場でしゃがんで頭を守ろう！",
                    step2: "広い場所へ移動しよう！"
                }
            }
        }
    }
};

// --- ロジック ---
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const jijoResultArea = document.getElementById('jijo-result-area');

// 最初の質問を表示
displayJijoQuestion(jijoQuizData);

function displayJijoQuestion(node) {
    quizContainer.innerHTML = ''; 
    const questionText = document.createElement('h2');
    questionText.innerText = node.question;
    quizContainer.appendChild(questionText);

    Object.keys(node.options).forEach(key => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        // "選択肢A: 自宅" のような文字から "自宅" だけ取り出す処理
        const buttonText = key.split('：')[1] || key.split(' ')[1] || key;
        button.innerText = buttonText.trim();
        button.onclick = () => handleJijoAnswer(node.options[key]);
        quizContainer.appendChild(button);
    });
}

function handleJijoAnswer(nextNode) {
    if (nextNode.question) {
        displayJijoQuestion(nextNode);
    } else if (nextNode.step0) {
        showJijoResult(nextNode);
    }
}

function showJijoResult(result) {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    jijoResultArea.innerHTML = `
        <p><strong>【Step 0: 備え】</strong><br>${result.step0}</p>
        <p><strong>【Step 1: 揺れたら】</strong><br>${result.step1}</p>
        <p><strong>【Step 2: 揺れが収まったら】</strong><br>${result.step2}</p>
    `;
}