// --- HTML要素の取得 ---
const quizContainer = document.getElementById('quiz-container');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const jijoResultArea = document.getElementById('jijo-result-area');
const kyojoResultArea = document.getElementById('kyojo-result-area');

// --- 状態管理のための変数 ---
let currentJijoNode; // 自助クイズの現在のノード
let currentKyojoQuestionIndex = 0; // 共助クイズの現在の質問番号
let jijoResult; // 確定した自助アクション
let kyojoScores = { kyujo: 0, joho: 0, shiki: 0, shien: 0 }; // 共助スコア

// --- 1. 自助(Jijo)セクションのデータ ---
const jijoQuizData = {
    question: "Q1: あなたが地震時の対策を知りたいシチュエーションを選んでください",
    options: {
        "選択肢A: 自宅": {
            question: "Q2：暮らしかたは？",
            options: {
                "選択肢A-1：一人暮らし": {
                    question: "Q3：家の中で、よく過ごすのは？",
                    options: {
                        "選択肢A-2-a:  居間（リビング）": {
                            step0: "みんなは家具（本棚、テレビ台、電子レンジ台）の固定をしてる？特に背の高い本棚は必ず固定しよう！（100円ショップの突っ張り棒や滑り止めシートでも効果あり）",
                            step1: "揺れが起きたら、テーブルの下に身を隠そう！",
                            step2: "揺れが収まったら、玄関のドアが歪む前に開け、避難経路を確保してね！助けはすぐ来ない前提で、友達や家族に連絡をしよう！"
                        },
                        "選択肢A-2-b:  キッチン": {
                            step0: "1Kの狭いキッチンでは、冷蔵庫、レンジ、食器棚が密集し危険がいっぱい！電子レンジ台の固定と、冷蔵庫の上に物を置いちゃダメだよ！",
                            step1: "揺れが起きたら、火の元から即座に離れ、テーブル下などに隠れよう！",
                            step2: "揺れが収まったら、すぐに火を消してガスの元栓を締めよう！揺れで自動停止しても、ガス漏れや再通電火災のリスクがあるから、要確認！"
                        },
                        "選択肢A-1-c:  寝室": {
                            step0: "割れたガラスで足を怪我しないように、懐中電灯とスリッパを準備しておこう！寝る場所の真横には、本棚などの倒れる家具を置かないようにしよう！",
                            step1: "揺れが起きたら、枕や布団で頭を守り、ベッドの上で体を丸めよう！",
                            step2: "揺れが収まったら、常備したスリッパを履いてからベッドを降りてね！避難経路を確保しよう！"
                        }
                    }
                },
                "選択肢A-2：実家暮らし": {
                    question: "Q3：家の中で、よく過ごすのは？",
                    options: {
                        "選択肢A-2-a:  居間（リビング）": {
                            step0: "みんなは家具(本棚、テレビなど)をL字金具や突っ張り棒で固定してる？家族と安否確認方法を決めておこうね！",
                            step1: "揺れが起きたら、テーブルの下に身を隠そう！",
                            step2: "揺れが収まったら、まず家族の安否確認！手分けして火の元確認や避難経路を確保しよう！"
                        },
                        "選択肢A-2-b:  キッチン": {
                            step0: "家族みんなの水と食料は備蓄してる？いざという時のために準備しよう！",
                            step1: "揺れが起きたら、食器棚や冷蔵庫から離れ、テーブルの下に隠れよう！",
                            step2: "揺れが収まったら、火を消し、ガスの元栓を締めてね！他の部屋にいる家族に「キッチンは大丈夫！」と声をかけ、状況を共有しよう！"
                        },
                        "選択肢A-2-c:  寝室": {
                            step0: "懐中電灯とスリッパを準備してる？ 割れたガラスで足を怪我するのを防げるよ！自分の部屋だけでなく、家族みんなの寝室の家具固定も手伝おう！",
                            step1: "揺れが起きたら、枕や布団で頭を守り、ベッドの上で体を丸めよう！",
                            step2: "揺れが収まったら、スリッパを履いて、自室の安全を確保してね！その後はすぐに家族の部屋へ安否確認に向かおう！"
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
                            step0: "バイト先の避難経路とマニュアル（お客様の誘導方法）は確認した？レジ後ろの棚（タバコ棚など）が固定されているか確認してみよう！",
                            step1: "揺れが起きたら、その場にしゃがみ込み、カウンターの足などにしっかりつかまって！レジ後ろの商品が倒れてくるかも！",
                            step2: "揺れが収まったら、お客様に「落ち着いてください」と声をかけて！避難経路を案内しよう！"
                        },
                        "選択肢B-1-b：品出し・バックヤード": {
                            step0: "バイト先の避難経路（非常口）を塞がないように在庫や段ボールの整理整頓をしておいてね！高い棚はきちんと固定されてる？",
                            step1: "揺れが起きたら、その場でしゃがんで、頭を守ろう！棚の倒壊が一番危険だよ！頑丈な作業台の下が最適！",
                            step2: "揺れが収まったら、すぐに出口（避難経路）を確保しよう！"
                        }
                    }
                },
                "選択肢B-2：塾講師": {
                    step0: "教室の避難経路、生徒の避難誘導マニュアルを確認しておこうね！本棚やロッカーはきちんと固定されてる？",
                    step1: "揺れが起きたら、まず自分が机の下に隠れよう！ 同時に生徒に「机の下に入って！」と大声で指示を出して安心させてあげよう！",
                    step2: "揺れが収まったら、すぐにドアを開け、避難経路を確保！生徒を落ち着かせて誘導しよう！"
                },
                "選択肢B-3：飲食": {
                    question: "Q3：主な担当業務は？",
                    options: {
                        "選択肢B-3-a：ホール": {
                            step0: "お客様を誘導する避難経路とマニュアルは完璧に覚えてる？消火器の場所を確認しておこう！",
                            step1: "揺れが起きたら、手に持っている料理は床に置き、その場でしゃがむ！ 可能ならテーブルの脚を掴み頭を守ろう！",
                            step2: "揺れが収まったら、食器やガラスの破片に注意し、お客様を誘導しよう！"
                        },
                        "選択肢B-3-b：キッチン": {
                            step0: "油や火を扱う場所、食器棚の整理整頓は徹底してる？消火器の場所と使い方は確認しておこう！",
                            step1: "揺れが起きたら、その場でしゃがんで、頭を守って！ 火のそばでも、まず身を守ることを最優先！棚や冷蔵庫から離れよう！",
                            step2: "揺れが収まったら、すぐに火を消して、ガスの元栓を締めよう！"
                        }
                    }
                }
            }
        },
        "選択肢C：大学": {
            question: "Q2：よくいる場所は？",
            options: {
                "選択肢C-1：大教室": {
                    step0: "教室に入ったら、まず非常口（避難経路）の位置を確認する癖をつけよう！",
                    step1: "揺れが起きたら、まず机の下に隠れて！揺れで動けない時は、その場で身を守ることが最優先！",
                    step2: "揺れが収まったら、すぐにドアを開け、避難経路を確保しよう！出口に殺到すると圧死の危険！冷静に行動してね！"
                },
                "選択肢C-2：研究室": {
                    step0: "薬品棚やボンベ、重量のある実験機器は厳重に固定してあるか確認してみて！消火器や緊急シャワーの場所は把握してる？",
                    step1: "揺れが起きたら、まずその場でしゃがみ、頑丈な机の下に隠れて！火の元や薬品棚の近くは危険！なるべく離れよう！",
                    step2: "揺れが収まったら、すぐに火の元と薬品の状況を確認しよう！必要なら初期消火や避難をしよう！"
                },
                "選択肢C-3：図書館": {
                    step0: "入館時に非常口を確認しようね！自習する際は、倒壊の危険があるから、なるべく本棚から離れた閲覧席を選ぶようにしよう！",
                    step1: "揺れが起きた時、 本棚の間にいたら、その場でカバン等で頭を守って、しゃがもう！ 閲覧席の近くなら、机の下に隠れよう！",
                    step2: "揺れが収まったら、本棚から離れ、広いスペースや柱のそばへ移動しよう！"
                },
                "選択肢C-4：体育館": {
                    step0: "活動前に非常口を確認しておこう！壁際の器具（バスケットゴール、棚など）は固定されているか確認してね！",
                    step1: "揺れが起きたら、その場で動きを止め、頭を守ろう！ 天井の照明や部材の落下に注意！体育館中央の方が安全だよ！",
                    step2: "揺れが収まったら、周囲の落下物や倒れた器具に注意し、避難経路を確認しよう！"
                },
                "選択肢C-5：食堂/生協": {
                    step0: "食堂の避難経路と、ガラス面（窓やショーケース）の位置を確認するようにしよう！",
                    step1: "揺れが起きた時、座席に座っていたら、丈夫なテーブルの下に隠れよう！レジや列に並んでいたら、その場でしゃがんで、カバンで頭を守ろう！",
                    step2: "揺れが収まったら、食器やガラスの破片に注意してね！安全な場所へ移動しよう！"
                }
            }
        },
        "選択肢D: 移動中": {
            question: "Q2: 主な移動手段は？",
            options: {
                "D-1: 電車（地下鉄・地上）": {
                    question: "Q3: どちらにいますか？",
                    options: {
                        "D-1-a:電車内": {
                            step0: "乗車したら、手すりやつり革の近くに立つようにしよう！",
                            step1: "揺れが起きたら、緊急停止に備え、手すりやつり革にしっかり掴まって！姿勢を低くすると安定するよ！",
                            step2: "揺れが収まったら、乗務員の指示に従ってね！勝手に外（線路）に出ちゃダメだよ！"
                        },
                        "D-1-b:ホーム": {
                            step0: "ホームでは、なるべく柱の近くや壁際を歩くようにして、線路に転落しないよう注意してね！",
                            step1: "揺れが起きたら、柱のそばでしゃがもう！それか、カバンで頭を守ってその場でしゃがもう！絶対に線路に下りちゃダメ！",
                            step2: "揺れが収まったら、落下物に注意して！係員の指示に従おう！"
                        }
                    }
                },
                "D-2: 車（運転・同乗）": {
                    question: "Q3: 主にどこを走る？",
                    options: {
                        "D-2-a: 市街地・交通量の多い道": {
                            step0: "車内に防災グッズ（水、食料、簡易トイレ）は積んである？ガソリンは常に半分以上を心がけようね！",
                            step1: "揺れが起きたら、慌ててブレーキを踏まないようにしてね！ハザードを焚いて、ゆっくりと左に寄せ、交差点を避けて停車しよう！",
                            step2: "揺れが収まったら、ラジオで情報を確認してね！車を置いて避難するときは、緊急車両が動かせるようにキーを付けたままにしよう！"
                        },
                        "D-2-b: 高速道路・有料道路": {
                            step0: "車内に防災グッズ（水、食料、簡易トイレ）は積んである？ガソリンは常に半分以上を心がけようね！",
                            step1: "揺れが起きたら、急ブレーキは厳禁だよ！ハザードを焚いて、ゆっくり減速して左車線に寄せて停車しよう！",
                            step2: "揺れが収まったら、ラジオで情報を確認してみて！後続車が追突する危険があるから、高速道路上では絶対に車を置いて歩かないようにしよう！"
                        },
                        "D-2-c: 山道・崖のそば": {
                            step0: "山間部を走る際は、土砂災害ハザードマップを確認するようにしてね！",
                            step1: "揺れを感じたら、絶対にトンネルや橋、崖のそばを避けてね！できるだけ開けた場所を探して停車しよう！",
                            step2: "揺れが収まったら、土砂崩れや落石に注意してね！安全な場所へ移動しよう！"
                        }
                    }
                },
                "D-3: 徒歩・自転車": {
                    step0: "普段から、ビルの看板や古いエアコンの室外機、ブロック塀の真下を歩かないように意識してるかな？",
                    step1: "揺れが起きたら、その場で立ち止まってしゃがんでね！ カバンで頭を守ろう！建物、電柱、自動販売機からできるだけ離れてみて！",
                    step2: "揺れが収まったら、落下物に注意してね！広い場所（公園や学校）へ移動しよう！"
                }
            }
        },
        "選択肢E: 外出先（屋内)": {
            question: "Q2: 特に地震時の対策を知りたいシチュエーションを選んでください",
            options: {
                "E-1-a: 店舗内・通路・飲食店街": {
                    step0: "施設に入ったら、避難経路（非常口の緑のマーク）を必ず確認する癖をつけよう！地下街では停電とパニックが最大の敵だと知ってた？",
                    step1: "揺れが起きたら、その場でしゃがんで、頭を守ろう！商品棚、ショーウィンドウ、吊り下げ照明から離れて！近くの太い柱のそばや、壁際で身を低くしよう！",
                    step2: "揺れが収まったら、係員の指示に従おう！地下街では慌てちゃダメだよ！出口（階段）に殺到しちゃうからね！"
                },
                "E-1-b: エレベーター": {
                    step0: "急停止することがあるの知ってた？必ず手すりに掴まろうね！",
                    step1: "揺れが起きたら、全ての階のボタンを押して！最初に停まった階で降りよう！",
                    step2: "降りれなかったら、慌てずに「非常電話ボタン」で外部に連絡してね！救助を待とう！"
                },
                "E-1-c: エスカレーター": {
                    step0: "エスカレーターが急停止する危険があること知ってた？必ず手すりに掴まろうね！",
                    step1: "揺れが起きたら、手すりにしっかり掴まり、その場でしゃがんでね！",
                    step2: "揺れが収まったら、落下物に注意して！歩いて降りよう！"
                }
            }
        },
        "選択肢F: 外出先（屋外)": {
            question: "Q2: 特に地震時の対策を知りたいシチュエーションを選んでください",
            options: {
                "F-1: ビル街・商店街": {
                    step0: "普段から、ビルの看板や古いエアコンの室外機、ブロック塀、自動販売機の真下を歩かないように意識してみて！",
                    step1: "揺れが起きたら、その場でしゃがんで、カバンで頭を守ろう！落下物（看板、窓ガラス、外壁）が一番危険だよ！無理に動かないで、近くの頑丈なビルの柱のそばや、落下物のない空間で身を守ろう！",
                    step2: "揺れが収まったら、落下物に注意してね！広い場所（公園など）へ移動しよう！"
                },
                "F-2: 公園・広場": {
                    step0: "地域の広域避難場所（大きな公園など）は知ってる？をハザードマップで確認しておこう！",
                    step1: "揺れが起きたら、その場でしゃがんで、頭を守ろう！",
                    step2: "揺れが収まったら、落下物に注意してね！広い場所へ移動しよう！"
                }
            }
        }
    }
};

// --- 2. 共助(Kyojo)セクションの質問データ ---
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
    {
        question: "Q4. チームで活動するとき、意見が対立したら？",
        answers: [
            { text: "A: 自分の考えを主張する", scores: { kyujo: 3, joho: 2, shiki: 3, shien: 0 } },
            { text: "B: 全員の合意を目指す", scores: { kyujo: 0, joho: 2, shiki: 5, shien: 4 } },
            { text: "C: 一旦中立に回る", scores: { kyujo: 2, joho: 3, shiki: 2, shien: 3 } },
            { text: "D: リーダーに従う", scores: { kyujo: 2, joho: 3, shiki: 0, shien: 3 } }
        ]
    },
    {
        question: "Q5. 体力・技術が劣る仲間がいた場合、あなたはどうする？",
        answers: [
            { text: "A: サポートに回る", scores: { kyujo: 1, joho: 2, shiki: 1, shien: 5 } },
            { text: "B: 代わりに作業を引き受ける", scores: { kyujo: 5, joho: 0, shiki: 0, shien: 2 } },
            { text: "C: 役割分担を見直す提案をする", scores: { kyujo: 2, joho: 2, shiki: 5, shien: 2 } },
            { text: "D: 自分の担当を優先する", scores: { kyujo: 5, joho: 2, shiki: 2, shien: 2 } }
        ]
    },
    {
        question: "Q6. SNSで誤情報が拡散しているのを見たら？",
        answers: [
            { text: "A: 正しい情報をSNSに投稿する", scores: { kyujo: 1, joho: 5, shiki: 1, shien: 1 } },
            { text: "B: 静観する", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } },
            { text: "C: 公式情報を友人に共有する", scores: { kyujo: 2, joho: 5, shiki: 2, shien: 3 } },
            { text: "D: 拡散を止めようと呼びかける", scores: { kyujo: 1, joho: 2, shiki: 5, shien: 3 } }
        ]
    },
    {
        question: "Q7. 地図を読む・状況を整理するのが得意か？",
        answers: [
            { text: "はい", scores: { kyujo: 2, joho: 5, shiki: 3, shien: 0 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q8. イベント運営やチームリーダーの経験があるか？",
        answers: [
            { text: "はい", scores: { kyujo: 3, joho: 3, shiki: 5, shien: 2 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q9. 複数の作業を同時に進めるのが得意か？",
        answers: [
            { text: "はい", scores: { kyujo: 1, joho: 4, shiki: 4, shien: 2 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q10. 子どもや高齢者と接する機会が多いか？",
        answers: [
            { text: "はい", scores: { kyujo: 1, joho: 0, shiki: 0, shien: 5 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q11. 強い緊張や恐怖を感じたとき、深呼吸して冷静さを取り戻せるか？",
        answers: [
            { text: "はい", scores: { kyujo: 3, joho: 5, shiki: 5, shien: 2 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q12. 自分より年上の人にも臆せず意見を伝えられるか？",
        answers: [
            { text: "はい", scores: { kyujo: 2, joho: 1, shiki: 5, shien: 3 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q13. 体力や運動能力に自信はあるか",
        answers: [
            { text: "はい", scores: { kyujo: 5, joho: 0, shiki: 0, shien: 0 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q14. 応急処置やAEDの使い方を学び、今でも覚えているか",
        answers: [
            { text: "はい", scores: { kyujo: 5, joho: 4, shiki: 1, shien: 1 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q15. 語学が得意か",
        answers: [
            { text: "はい", scores: { kyujo: 0, joho: 3, shiki: 0, shien: 5 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q16. SNSや情報発信が得意か",
        answers: [
            { text: "はい", scores: { kyujo: 2, joho: 5, shiki: 2, shien: 2 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q17. 人前で話すのが得意か？",
        answers: [
            { text: "はい", scores: { kyujo: 3, joho: 1, shiki: 5, shien: 4 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q18. 登山やキャンプなど、屋外活動の経験があるか？",
        answers: [
            { text: "はい", scores: { kyujo: 5, joho: 3, shiki: 3, shien: 0 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    },
    {
        question: "Q19. 非常食の調理や簡易的な炊き出しができるか？",
        answers: [
            { text: "はい", scores: { kyujo: 3, joho: 0, shiki: 2, shien: 5 } },
            { text: "いいえ", scores: { kyujo: 0, joho: 0, shiki: 0, shien: 0 } }
        ]
    }
];

// --- 3. 共助(Kyojo)セクションの結果データ ---
const kyojoResultData = {
    kyujo: {
        name: "つっぱりうさぎ",
        tagline: "突っ張り棒で支えるぜ！",
        description: "お前さんは体力も行動力もバチバチにキマってて、災害現場じゃ実践的な援護が大得意ってヤツだな。瓦礫のブッ壊しからケガ人の運び出し、避難の仕切りまで、持ち前のパワーと根性で人をガンガン救ってくタイプだ。どんだけ場がゴタついてても、まず自分が体張って動こうとするその姿勢、周りにとっちゃめちゃくちゃ心強いぜ。",
        image: "usagi.png"
    },
    joho: {
        name: "ラジオオワシ",
        tagline: "情報は『ワシ（私）』にお任せ！ デマは許さないワシ！",
        description: "君はまるでワシみたいなタイプじゃな。冷静に物事を見て、必要な情報を正確に集めて伝えるのがとても上手いんじゃ。デマにも振り回されず、SNSや避難所の掲示板を通じて安否情報や物資の情報をしっかり発信・共有できるから、多くの人の不安を取り除き、救助活動をぐっと効率的にしてくれる存在じゃぞ。",
        image: "owashi.png"
    },
    shiki: {
        name: "リードッグ",
        tagline: "みんなこっちに集まるワン",
        description: "お前さんは判断力バチバチで、人をまとめるのがやたら得意なリーダー犬だワン。どんだけ場がゴチャつこうが、全体をガッと見渡して、避難班の役割をズバッと決めてやるし、支援活動の調整もバッチリ仕切っちまうワン。お前のリーダーシップがあるから、コミュニティの力がググッとまとまって最大限に発揮されるってわけだワン。頼れるボス犬ってのは、まさにお前だワン。",
        image: "dog.png"
    },
    shien: {
        name: "ケアパカ",
        tagline: "みんなをケアするパカ！",
        description: "あなたはね、ほわほわっとあったかい心を持っていて、みんなの気持ちにそっと寄り添うのがとっても得意なんだ〜。不安でモフモフを求めてる人や、子どもさん・お年寄りみたいに特に気づかいが必要な人の話を、ゆっくり聞いてあげて安心させちゃうの。避難所での生活をサポートしたり、心のケアをしたりして、コミュニティのみんなをまとめる大事な存在なんだよ〜。",
        image: "alpaca.png"
    }
};

// --- 4. 診断ロジックの関数 ---

/**
 * [自助] 質問を表示する関数
 * @param {object} node - jijoQuizDataの現在のノード
 */
function displayJijoQuestion(node) {
    quizContainer.innerHTML = ''; // コンテナをクリア

    // 質問文を表示
    const questionText = document.createElement('h2');
    questionText.innerText = node.question;
    quizContainer.appendChild(questionText);

    // 選択肢ボタンを作成
    Object.keys(node.options).forEach(key => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        // "選択肢A: 自宅" から "自宅" の部分だけを抽出
        const buttonText = key.split('：')[1] || key.split(' ')[1] || key;
        button.innerText = buttonText.trim();
        
        button.onclick = () => handleJijoAnswer(node.options[key]);
        quizContainer.appendChild(button);
    });
}

/**
 * [自助] 回答を処理する関数
 * @param {object} nextNode - 選択された次のノード
 */
function handleJijoAnswer(nextNode) {
    if (nextNode.question) {
        // 次の質問がある場合
        displayJijoQuestion(nextNode);
    } else if (nextNode.step0) {
        // 最終結果（アクション）に到達した場合
        jijoResult = nextNode;
        startKyojoQuiz(); // 共助セクションへ
    }
}

/**
 * [共助] 診断セクションを開始する関数
 */
function startKyojoQuiz() {
    currentKyojoQuestionIndex = 0;
    kyojoScores = { kyujo: 0, joho: 0, shiki: 0, shien: 0 };
    
    // タイトルを「共助診断」に変更
    const title = document.getElementById('main-title');
    if(title) title.innerText = "あなたの共助タイプ診断";

    displayKyojoQuestion();
}

/**
 * [共助] 質問を表示する関数
 */
function displayKyojoQuestion() {
    quizContainer.innerHTML = ''; // コンテナをクリア
    const qData = kyojoQuizData[currentKyojoQuestionIndex];

    const questionText = document.createElement('h2');
    questionText.innerHTML = `Q${currentKyojoQuestionIndex + 1}/${kyojoQuizData.length}<br>${qData.question}`;
    quizContainer.appendChild(questionText);

    // 選択肢ボタンを作成
    qData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        // "A: 考えるより先に行動する" から "考えるより先に行動する" を抽出
        const buttonText = answer.text.includes('：') ? answer.text.split('：')[1] : answer.text;
        button.innerText = buttonText.trim();

        button.onclick = () => handleKyojoAnswer(answer.scores);
        quizContainer.appendChild(button);
    });
}

/**
 * [共助] 回答を処理する関数
 * @param {object} scores - 選択肢に紐づくスコア
 */
function handleKyojoAnswer(scores) {
    // スコアを加算
    kyojoScores.kyujo += scores.kyujo;
    kyojoScores.joho += scores.joho;
    kyojoScores.shiki += scores.shiki;
    kyojoScores.shien += scores.shien;

    currentKyojoQuestionIndex++;

    if (currentKyojoQuestionIndex < kyojoQuizData.length) {
        // 次の質問へ
        displayKyojoQuestion();
    } else {
        // 最後の質問が終わったら結果表示
        showFinalResult();
    }
}

/**
 * [共助] スコアから最大値のタイプを決定する関数
 * @returns {string} - 'kyujo', 'joho', 'shiki', 'shien' のいずれか
 */
function calculateKyojoResult() {
    let maxScore = -1;
    let resultType = 'shien'; // デフォルト (同点の場合など)

    // Object.entriesで [キー, 値] の配列に変換してループ
    for (const [type, score] of Object.entries(kyojoScores)) {
        if (score > maxScore) {
            maxScore = score;
            resultType = type;
        }
    }
    return resultType;
}

/**
 * 最終結果を表示する関数
 */
function showFinalResult() {
    // 質問エリアとボタンを非表示
    quizContainer.style.display = 'none';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';

    // メインタイトルを「診断結果」に変更
    const title = document.getElementById('main-title');
    if(title) title.innerText = "大学生のための 防災行動診断";

    // --- 自助結果の表示 ---
    jijoResultArea.innerHTML = '<h2>あなたの自助アクション</h2>';
    jijoResultArea.innerHTML += `<p><strong>【Step 0: 備え】</strong>${jijoResult.step0}</p>`;
    jijoResultArea.innerHTML += `<p><strong>【Step 1: 揺れたら】</strong>${jijoResult.step1}</p>`;
    jijoResultArea.innerHTML += `<p><strong>【Step 2: 揺れが収まったら】</strong>${jijoResult.step2}</p>`;

    // --- 共助結果の表示 ---
    const resultType = calculateKyojoResult();
    const resultData = kyojoResultData[resultType];

    kyojoResultArea.innerHTML = '<h2>あなたの共助タイプ</h2>';
    // 画像を表示するタグ
    kyojoResultArea.innerHTML += `<img src="${resultData.image}" alt="${resultData.name}" class="result-char-img">`;
    kyojoResultArea.innerHTML += `<h3>${resultData.name}</h3>`;
    kyojoResultArea.innerHTML += `<blockquote style="font-style: italic; background: #f9f9f9; border-left: 5px solid #ccc; padding: 10px; margin: 10px 0;">${resultData.tagline}</blockquote>`;
    kyojoResultArea.innerHTML += `<p>${resultData.description}</p>`;

    // 結果コンテナを表示
    resultContainer.style.display = 'block';
}

/**
 * 診断を最初からやり直す関数 (index.htmlから呼ばれる)
 */
function restartQuiz() {
    location.reload();
}


// --- 5. 診断の開始 ---
// ページが読み込まれたら、自助診断の最初の質問を表示
document.addEventListener('DOMContentLoaded', () => {
    currentJijoNode = jijoQuizData;
    displayJijoQuestion(currentJijoNode);
});