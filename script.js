// --- [1. 게임 데이터 (V28 - 기획자님 수정사항 반영)] ---
const gameData = {
    introText: "25세 연구원 'Eloise'가 실종되었다.\n경찰은 단순 가출로 보지만, 당신은 직감한다.\n이것은 과학적 트릭으로 감춰진... 완벽한 납치극이다.\n\n단서는 6곳. 기회는 3번.",
    debriefText: "...모든 탐색이 끝났다.\n\n당신은 3번의 방문 기회를 모두 사용했다.\n이제 되돌릴 수 없다.\n\n인벤토리의 단서들을 조합하여\n그녀를 구할 단 하나의 진실을 꿰뚫어라.", 
    suspectIntro: {
        "1": "<strong>1. Olivia (대학 동기):</strong> Eloise의 룸메이트. \"15일 내내 기숙사에 있었다고 주장.\" (목격자 없음). Eloise의 학업 성과와 인기에 대해 <strong>강한 질투심</strong>을 보임. **(화학과 수석)**",
        "2": "<strong>2. John 교수 (담당 교수):</strong> \"15일, 온라인 학회에 참석했다고 주장.\" (행적 불명). <strong>과거 제자의 논문을 가로챘다는 의혹</strong>이 있으며, <strong>물리학과 화학에 모두 정통한</strong> 권위자.",
        "3": "<strong>3. David (조교):</strong> \"15일, 교수 면담 대기 및 논문 제출.\" (최근 '연구 실수'로 징계 이력). **사소한 숫자나 순서에 병적으로 집착하는 성격.**",
        "4": "<strong>4. Andrew (취업 컨설턴트):</strong> \"15일, '컨설팅' 건으로 Eloise를 만난 마지막 목격자.\" (불법적인 일에 연루되었다는 **경찰의 내사 정황** 포착.)"
    },
    screens: {
        intro: "images/location4.png",
        debrief: "images/location3.png",
        finalGuess: "images/location5.png",
        ending: "images/location3.png"
    },
    locations: {
        "1": {
            name: "Eloise의 자취방 (기숙사)", 
            type: "Tension", // True 1
            image: "images/location1.png", 
            intro: "...비밀번호를 누르고 들어선 Eloise와 Olivia의 기숙사 방.\n\n방 안은 놀라울 정도로 깔끔하게 정돈되어 있다.\n책상, 침대, 그리고 작은 휴지통이 눈에 띈다.",
            actions: {
                "1": { name: "[책상]을 조사한다.", is_true: true, hint_ids: ["A", "D", "B2"] },
                "2": { name: "[침대] 주변을 살펴본다.", is_true: false, hint_ids: ["F_Jealousy_Diary"] }, 
                "3": { name: "[휴지통]을 뒤져본다.", is_true: false, hint_ids: ["F_Flyer"] }
            }
        },
        "2": {
            name: "대학 의대 실험실", 
            type: "Safe", // True 2
            image: "images/location2.png", 
            intro: "늦은 밤, 불 꺼진 의대 실험실은 스산한 기운마저 감돈다.\nEloise가 조교로 일했던 곳이자, 용의자 'David'의 직장이다.\n\n공기 중에는 알 수 없는 약품 냄새가 진동한다.\n낡은 연구용 캐비닛, 구석의 쓰레기통, 그리고 교수의 연구실 문이 보인다.",
            actions: {
                "1": { name: "[연구용 캐비닛]을 조사한다.", is_true: true, hint_ids: ["C", "B", "H_Blood_Request", "pH_12"] }, 
                "2": { name: "[쓰레기통]을 뒤져본다.", is_true: true, hint_ids: ["pH_12_weak"] }, 
                "3": { name: "[교수 연구실] 문을 열어본다.", is_true: false, hint_ids: ["F_Alibi_Note"] }
            }
        },
        "3": {
            name: "마을 도서관", 
            type: "Tension", // True 1
            image: "images/location3.png", 
            intro: "마을 도서관은 언제나처럼 고요하지만, 공기는 무겁게 가라앉아 있다.\nEloise가 마지막으로 목격된 15일, 그녀는 이곳에 들렀다.\n\n당신은 그녀의 흔적을 찾기 시작했다.",
            actions: {
                "1": { name: "[과학/논문 섹션]을 조사한다.", is_true: true, hint_ids: ["G_Num", "G_Map", "C2"] },
                "2": { name: "[신문 자료실]을 조사한다.", is_true: false, hint_ids: ["F_Prof_Scandal", "F_David_Library"] },
                "3": { name: "[사기/구직 섹션]을 조사한다.", is_true: false, hint_ids: ["F_Job_Listing"] }
            }
        },
        "4": {
            name: "경찰서", 
            type: "Safe", // True 2
            image: "images/location4.png", 
            intro: "늦은 밤, 불이 켜진 경찰서 민원실은 피곤함으로 가라앉아 있다.\nEloise 실종 사건을 담당한 김 형사를 만나러 왔다.",
            actions: {
                "1": { name: "[공식 브리핑]을 듣는다.", is_true: true, hint_ids: ["C2_Police_Weak"] }, 
                "2": { name: "[용의자 4인 목록]을 재검토한다.", is_true: false, hint_ids: ["F_Police_Alibi"] },
                "3": { name: "[증거물 보관함]을 확인한다.", is_true: true, hint_ids: ["G_Map_Police", "C2_Police"] } 
            }
        },
        "5": {
            name: "용의자 임시 거처 (오두막)", 
            type: "Tension", // True 1
            image: "images/location5.png", 
            intro: "마을 외곽, 용의자들이 이곳을 드나들었다는 소문이 있다.\n문은 허술하게 잠겨있다.\n\n안으로 들어서자, 곰팡이 냄새와 함께 누군가 머물렀던 흔적이 보인다.",
            actions: {
                "1": { name: "[책상] 위를 살펴본다.", is_true: true, hint_ids: ["G_Num_Desk", "C2_Desk"] }, 
                "2": { name: "[쓰레기통]을 뒤져본다.", is_true: false, hint_ids: ["F_ID_Card"] },
                "3": { name: "[침낭] 주변을 조사한다.", is_true: false, hint_ids: ["F_News_Scrap"] }
            }
        },
        "6": {
            name: "사기 인터넷 카페", 
            type: "Tension", // True 1
            image: "images/location6.png", 
            intro: "Eloise가 '좋은 아르바이트'를 찾았던 인터넷 커뮤니티다.\n당신은 PC방에서 익명 아이디로 해당 커뮤니티에 접속했다.\n\n[고수익 알바] 게시판은 온갖 사기성 글들로 가득하다.",
            actions: {
                "1": { name: "[게시판]에서 Eloise의 ID를 검색한다.", is_true: true, hint_ids: ["G_Map_History"] }, 
                "2": { name: "[운영자]에게 쪽지로 문의한다.", is_true: false, hint_ids: ["F_Operator"] },
                "3": { name: "[사기 피해] 게시판을 열람한다.", is_true: false, hint_ids: ["F_Scam_Method"] } 
            }
        }
    },
    // [V28 수정] 기획자님 힌트 수정사항 반영
    hints: {
        "A": { name: "Eloise의 의료 기록 카드", text: "<span class='hint-title'>[의료 기록 카드]</span>\n> 이름: Eloise (25세)\n> 혈액형: O형 (Rh+)\n> 특이사항: \"타인에게 절대 수혈 불가. 지정 헌혈 필수.\"" },
        "D": { name: "Eloise의 수학 노트", text: "<span class='hint-title'>[수학 노트]</span>\n> \"질문: (x-1)(y-2)(z-3) = 1\"\n> ... (아래에 붉은 펜으로 엑스 표시가 되어있고, 글씨가 수정되어 있다.)\n> \"아니, (x-1)(y-2)(z-3) = **0**\"\n> \"방정식은 '0'이어야만 한다. **'1'**은 그가 모든 것을 망치는 **실수**다.\"" },
        "F_Jealousy_Diary": { name: "Olivia의 일기장", text: "<span class='hint-title'>[침대 밑 일기장 (Olivia의 것)]</span>\n> \"14일: Eloise가 또... 또 John 교수의 프로젝트에 단독으로 들어갔다. 정말 짜증 난다. 왜 항상 나만...\"" },
        "F_Flyer": { name: "구겨진 구인 전단", text: "<span class='hint-title'>[구겨진 전단지]</span>\n> \"고수익 보장! 💸 간단한 타이핑 업무. 월 500! (문의: ...)\"" },
        "C": { name: "희귀 혈액형 리포트", text: "<span class='hint-title'>[연구 리포트 요약]</span>\n> Case 2. 'H항원 결핍 (Hh 혈액형)'\n> - 식별: 겉보기엔 'O형'으로 판독됨.\n> - 비고: ...어떤 혈액도 수혈받을 수 없음." },
        "B": { name: "수상한 메모 (육각형)", text: "<span class='hint-title'>[파일 뒤에 덧붙여진 메모]</span>\n> \"...'봄베이'에서 발견된 그들... 푸코스(6탄당)의 결핍. 이 완벽한 육각형(Hexagon)...\"" }, 
        "H_Blood_Request": { name: "위조된 혈액 요청서", text: "<span class='hint-title'>[위조된 혈액 요청서]</span>\n> \"환자명: (가상인물)\n> 요청 혈액: O형 (Hh-Null / Bombay)\n> 담당의: (John 교수의 서명)\"\n\n...'John 교수'의 서명 부분이 'pH 12' 용액에 닿은 것처럼 살짝 번져있다." },
        "pH_12": { name: "얼룩 묻은 천 조각", text: "<span class='hint-title'>[시약병 라벨 및 천 조각]</span>\n> [시약병 라벨] / [현장 감식]\n> ...'pH 12' 이상의 용액으로, 특정 종류의 잉크를 지우고 문서를 위조하는 데 사용됨." },
        "pH_12_weak": { name: "쓰레기통의 얼룩", text: "<span class='hint-title'>[쓰레기통의 천 조각]</span>\n> 강한 암모니아 냄새가 난다. 잉크를 지울 때 쓰는 시약 같다." },
        "F_Trash": { name: "실험실 쓰레기통", text: "<span class='hint-title'>[일반 쓰레기통]</span>\n> 커피 컵, 낡은 실험용 장갑, 잉크가 떨어진 볼펜 등이 버려져 있다. 특별한 것은 보이지 않는다." },
        "F_Alibi_Note": { name: "교수 연구실 쪽지", text: "<span class='hint-title'>[John 교수가 David에게 보낸 쪽지]</span>\n> \"David. ...15일 오후 면담 전까지 연구실(실험실) 출입을 금지하네.\"" },
        "G_Num": { name: "물리 공식 메모", text: "<span class='hint-title'>[월간 과학 잡지]</span>\n> ...논문과는 관계없는 물리 공식이 페이지 귀퉁이에 적혀있다.\n> \"W = 780, F = 6. 이 거리가 나의 완벽한 해답이다.\"" },
        "G_Map": { name: "대학 편람 (거리 지도)", text: "<span class='hint-title'>[대학 편람 '거리 지도']</span>\n> (※ [1. Eloise의 자취방]을 기준으로 한 직선거리)\n> * [3. 마을 도서관] --- 250m\n> * [4. 경찰서] --- 800m\n> * [5. 용의자 임시 거처 (오두막)] --- 400m\n> * [2. 대학 의대 실험실] --- 130m" },
        "C2": { name: "잡지 (논문 마감일)", text: "<span class='hint-title'>[잡지 - 논문 정보란]</span>\n> 투고 마감일: 10월 15일" },
        "B2": { name: "자취방의 노트 조각", text: "<span class='hint-title'>[책상 위 다른 노트 조각]</span>\n> \"결국 모든 것은 '단 한 번의 과학적 실수'에서 비롯되었다.\"" },
        "F_Prof_Scandal": { name: "오래된 학술지 기사", text: "<span class='hint-title'>[오래된 학술지 기사]</span>\n> \"과거 'John 교수'가 제자의 논문을 가로챘다는 의혹이 있었으나, 내부 징계로 종결됨.\"" },
        "F_David_Library": { name: "도서관 대출 기록", text: "<span class='hint-title'>[도서관 대출 기록]</span>\n> \"15일 14:30, 'David (조교)'가 [월간 과학] 최신호와 [대학 편람]을 대출하려 했으나, '대출 불가' 도서라 열람만 하고 감.\""},
        "F_Job_Listing": { name: "고수익 의료 알바", text: "<span class='hint-title'>[구인/구직 섹션의 포스트잇]</span>\n> \"급구: '대학 병원 (신관)' 임상시험 참가자.\n> 15일 마감. 고액 지급 보장.\"" },
        "F_Police": { name: "김 형사의 브리핑", text: "<span class='hint-title'>[김 형사의 브리핑]</span>\n> \"우리는 단순 가출이나, 최근 유행하는 고수익 알바 사기에 연루된 걸로 보고 있어.\"" },
        "F_Police_Alibi": { name: "김 형사의 용의자 정보", text: "<span class='hint-title'>[김 형사의 대답]</span>\n> \"아, 다른 용의자들은 알리바이가 다 있더라고.\"\n> \"우린 그 'Andrew'를 쫓고 있지. 알고 보니 그놈, 예전에 불법 밀매를 한 적이 있더군.\"" },
        "G_Map_Police": { name: "경찰 수색 보고서", text: "<span class='hint-title'>[경찰 수색 보고서]</span>\n> \"실종자(Eloise)의 자취방을 기준으로 반경 100m를 수색했음.\"\n> \"수상한 정황은 발견되지 않음.\""},
        "C2_Police": { name: "15일자 CCTV 기록", text: "[15일자 CCTV 기록]\n> \"15일 14:00, Eloise가 마을 도서관을 방문한 것을 마지막으로 행적 종료.\""},
        "C2_Police_Weak": { name: "김 형사의 브리핑 (15일)", text: "[김 형사의 브리핑]\n> ... (중략) ... \"확실한 건, 그녀의 마지막 행적은 15일 오후 2시, 마을 도서관이었다는 거야.\"" },
        "F_Bus_Ticket": { name: "고속버스 예매 내역서", text: "<span class='hint-title'>[버스 예매 내역 (16일 자)]</span>\n> - 목적지: 지방(OO시)" },
        "G_Num_Desk": { name: "오두막의 계산 메모", text: "<span class='hint-title'>[책상 위 찢어진 메모]</span>\n> \"780 / 6 = 130...\"" },
        "C2_Desk": { name: "오두막의 달력", text: "<span class='hint-title'>[책상 위 달력]</span>\n> \"10월 15일\" 날짜에 붉은색으로 'D-DAY'라고 적혀있다." },
        "G_Map_History": { name: "PC방 검색 기록", text: "<span class='hint-title'>[브라우저 검색 기록]</span>\n> \"'Eloise'의 아이디로 검색한 마지막 기록: '자취방에서 의대 실험실까지 거리' (15일 14:30)\""},
        "F_Debt": { name: "빚 독촉장", text: "<span class='hint-title'>[빚 독촉장 및 주식 책]</span>\n> '단기간 고수익' 챕터가 심하게 접혀있다." },
        "F_ID_Card": { name: "파기된 병원 출입증", text: "<span class='hint-title'>[파기된 병원 출입증]</span>\n> (가위로 잘려 이름 부분이 보이지 않는다)\n> - 소속: 대학 병원 (신관)" },
        "F_News_Scrap": { name: "신문 스크랩", text: "<span class='hint-title'>[신문 스크랩]</span>\n> \"전국적 혈액 부족 사태... 불법 밀매 기승\"" },
        "F_Post": { name: "Eloise의 문의글", text: "<span class='hint-title'>[Eloise의 문의글]</span>\n> \"월 500 '타이핑 알바' 보고 연락드립니다.\" / (답변): \"네,'Andrew'에게 연락하세요.\"" },
        "F_Operator": { name: "카페 운영자의 쪽지", text: "<span class='hint-title'>[운영자의 답변]</span>\n> \"아, 그분. ...지금은 '지방 출장' 중이세요.\"" },
        "F_Scam_Method": { name: "사기 피해 게시글", text: "<span class'hint-title'>[피해자 A의 글]</span>\n> \"...저도 '월 500' 보고 갔다가 당할 뻔했어요. 그 사람들, 'Andrew'라는 컨설턴트가 주선자인데, 사람들을 '지방 연수원'으로 보낸다고 하더군요...\"" }
    },
    suspects: {
        "1": "Olivia (대학 동기)",
        "2": "John 교수 (담당 교수)",
        "3": "David (조교)",
        "4": "Andrew (취업 컨설턴트)"
    },
    finalLocations: {
        "1": "Eloise의 자취방 (기숙사)",
        "2": "대학 의대 실험실",
        "3": "마을 도서관",
        "4": "경찰서",
        "5": "용의자 임시 거처 (오두막)",
        "6": "사기 인터넷 카페",
        "7": "대학 병원 (신관)" 
    },
    correctAnswer: {
        location: "2",
        floor: "6",
        culprit: "3"
    },
    endings: {
        true: {
            title: "[...THE END...]",
            className: "true",
            text: "...당신의 확신에 찬 지목.\n긴급 출동한 경찰이 [대학 의대 실험실] 6층의 문을 강제로 개방한다.\n\n그곳에는... 겁에 질린 Eloise와,\n자신의 '완벽한' 계획이 무너진 것을 믿을 수 없다는 표정의 'David'가 서 있다.\n\n\"어떻게... 어떻게 이곳을...\"\n\n그는 자신의 '완벽한' 계획이 어떻게 무너졌는지 믿을 수 없다는 표정으로 당신을 바라본다.\n\n'pH 12' 용액으로 위조했던 알리바이도, '숫자 6'에 대한 강박도,\n모두 당신의 추리 앞에 무너졌다.\n\nEloise가 무사히 구출된다."
        },
        false: {
            title: "[...FAILURE...]",
            className: "false",
            text: "...당신의 지목에 따라 경찰이 긴급히 움직였다.\n\n(당신이 지목한 장소/인물에 대한 수사가 진행된다)\n\n...하지만 그곳은 비어있었다.\n\n(만약 범인을 잘못 지목했다면, 용의자는 조사를 받고 풀려났다.)\n\n...당신이 잘못된 곳에서 시간을 허비하는 사이,\n진짜 범인은 자신의 흔적을 지울 충분한 시간을 벌었다.\n\n\n다음 날 아침.\n사건 현장의 모든 증거는 완벽하게 인멸되었다.\n\n범인은 그날 이후로 종적을 감췄다.\n\nEloise는...\n끝내 돌아오지 못했다."
        }
    }
};

// --- [2. 플레이어 상태] ---
let playerState;

// --- [3. DOM 요소 캐싱 (V28 - 인벤토리 복구)] ---
const $ = (selector) => document.querySelector(selector);

const elements = {
    gameContainer: $('#game-container'),
    backgroundImage: $('#background-image'),
    
    introScreen: $('#intro-screen'), 
    locationSelectView: $('#location-select-view'),
    actionSelectView: $('#action-select-view'),
    resultView: $('#result-view'),
    debriefScreen: $('#debrief-screen'), 
    finalGuessView: $('#final-guess-view'),
    endingView: $('#ending-view'),

    introStory: $('#intro-story'),
    introSuspects: $('#intro-suspects'), 
    startGameBtn: $('#start-game-btn'), 
    
    visitCounter: $('.game-screen #visit-counter'), 
    locationButtons: $('#location-buttons'),
    earlyGuessBtn: $('#early-guess-btn'), 
    
    actionIntro: $('#action-intro'),
    actionTitle: $('#action-select-view h2'), 
    actionButtons: $('#action-buttons'),
    
    resultText: $('#result-text'),
    backToActionsBtn: $('#back-to-actions-btn'), 
    
    debriefText: $('#debrief-text'), 
    gotoFinalGuessBtn: $('#goto-final-guess-btn'), 

    guessStep1: $('#guess-step-1'),
    guessStep2: $('#guess-step-2'),
    guessStep3: $('#guess-step-3'),
    guessLocationButtons: $('#guess-location-buttons'), 
    guessFloor: $('#guess-floor'),
    guessCulpritButtons: $('#guess-culprit-buttons'), 
    gotoStep2Btn: $('#goto-step-2-btn'),
    gotoStep3Btn: $('#goto-step-3-btn'),
    submitFinalGuessBtn: $('#submit-final-guess-btn'),
    
    endingTitle: $('#ending-title'),
    endingText: $('#ending-text'),
    restartBtn: $('#restart-btn'),

    // [V28 수정] 인벤토리 DOM 요소 복구
    inventory: $('#inventory'),
    inventoryToggle: $('#inventory-toggle'),
    inventoryList: $('#inventory-list')
};

// --- [3.5. 타자기 효과] ---
let typingTimeout; 
let currentFullText = ""; 

/** 지능형 타자기 함수 */
function startTypewriter(element, text, speed = 25, callback) {
    clearTimeout(typingTimeout);
    element.innerHTML = ""; 
    currentFullText = text; 

    let i = 0;
    let cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);

    function typeChar() {
        if (i < text.length) {
            let char = text.charAt(i);
            let elementToInsert = null;

            if (char === '<') {
                let tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    let tag = text.substring(i, tagEnd + 1);
                    elementToInsert = document.createRange().createContextualFragment(tag);
                    i = tagEnd; 
                }
            } else if (char === '\n') {
                elementToInsert = document.createElement('br');
            } else {
                elementToInsert = document.createTextNode(char);
            }
            
            if (elementToInsert) {
                element.insertBefore(elementToInsert, cursor);
            }
            
            i++;
            element.scrollTop = element.scrollHeight; 
            typingTimeout = setTimeout(typeChar, speed);
        } else {
            cursor.remove(); 
            currentFullText = ""; 
            if (callback) callback();
        }
    }
    typeChar();
}

/** [V24 수정] 타자기 스킵 함수 (줄바꿈 버그 수정) */
function skipTyping(element, callback) {
    if (currentFullText) { 
        clearTimeout(typingTimeout);
        element.innerHTML = currentFullText.replace(/\n/g, '<br>'); 
        currentFullText = ""; 
        if (callback) callback();
    }
}

// --- [4. 게임 엔진 (V21)] ---

/** 게임 초기화 함수 (V28 수정) */
function initGame() {
    playerState = {
        visitCount: 0,
        visitedLocations: [],
        inventory: new Set(), 
        currentLocationId: null,
        actionsRemainingThisTurn: 2,
        selectedActionsThisTurn: [],
        finalGuess: {} 
    };

    showView('intro-screen'); 
    elements.backgroundImage.src = gameData.screens.intro;
    elements.backgroundImage.classList.add('visible');
    
    // [V28 수정] 인벤토리 초기화 복구
    elements.inventoryList.innerHTML = "아직 단서가 없습니다.";
    elements.inventory.classList.remove('open');

    populateFinalGuessOptions(); 
    
    elements.introSuspects.style.display = 'none'; 
    elements.startGameBtn.classList.add('hidden'); 
    
    startTypewriter(elements.introStory, gameData.introText, 30, () => { 
        showSuspectIntro(); 
    });
}

/** 인트로 용의자 목록 표시 함수 */
function showSuspectIntro() {
    let suspectHTML = "<h3>용의자 목록</h3>";
    for (const id in gameData.suspectIntro) {
        suspectHTML += `<p>${gameData.suspectIntro[id]}</p>`;
    }
    elements.introSuspects.innerHTML = suspectHTML;
    elements.introSuspects.style.display = 'block';
    elements.startGameBtn.classList.remove('hidden'); 
}


/** 특정 화면 보여주기 */
function showView(viewId) {
    document.querySelectorAll('.game-screen').forEach(view => {
        view.classList.add('hidden');
    });
    $(`#${viewId}`).classList.remove('hidden');
}

/** [화면 1] 장소 선택 화면 렌더링 (V21 수정) */
function renderLocationSelect() {
    showView('location-select-view');
    elements.backgroundImage.classList.remove('visible'); 
    
    const remainingVisits = 3 - playerState.visitCount;
    document.querySelectorAll('#visit-counter').forEach(el => {
        el.textContent = `남은 방문 기회: ${remainingVisits}`;
    });
    $('h2', elements.locationSelectView).textContent = `어디를 방문하시겠습니까? (남은 기회: ${remainingVisits})`;

    elements.locationButtons.innerHTML = "";
    
    for (const locId in gameData.locations) {
        const loc = gameData.locations[locId];
        const btn = document.createElement('button');
        btn.id = `loc-btn-${locId}`;
        btn.className = 'location-btn';
        btn.textContent = loc.name;
        btn.disabled = playerState.visitedLocations.includes(locId);
        
        btn.onclick = () => {
            playerState.currentLocationId = locId;
            playerState.actionsRemainingThisTurn = 2;
            playerState.selectedActionsThisTurn = [];
            renderActionSelect(locId); 
        };
        elements.locationButtons.appendChild(btn);
    }
    
    if (playerState.visitCount > 0 && playerState.visitCount < 3) {
        elements.earlyGuessBtn.classList.remove('hidden');
    } else {
        elements.earlyGuessBtn.classList.add('hidden');
    }
}

/** [화면 2] 행동 선택 화면 렌더링 */
function renderActionSelect(locId) {
    if (playerState.actionsRemainingThisTurn <= 0) {
        leaveLocation(); 
        return;
    }

    const loc = gameData.locations[locId];
    
    elements.backgroundImage.src = loc.image;
    elements.backgroundImage.classList.add('visible');
    showView('action-select-view');
    
    elements.actionTitle.classList.add('hidden');
    elements.actionButtons.classList.add('hidden');
    
    if (playerState.selectedActionsThisTurn.length > 0) {
        elements.actionIntro.innerHTML = loc.intro.replace(/\n/g, '<br>'); 
        renderActionButtons(locId); 
    } else {
        const fullIntroText = loc.intro; 
        startTypewriter(elements.actionIntro, fullIntroText, 30, () => {
            renderActionButtons(locId); 
        });
    }
}

/** [화면 2] 행동 버튼 렌더링 */
function renderActionButtons(locId) {
    const loc = gameData.locations[locId];
    
    elements.actionTitle.textContent = `이 장소에서 2가지 행동을 선택하십시오. (남은 선택: ${playerState.actionsRemainingThisTurn})`;
    elements.actionTitle.classList.remove('hidden'); 
    
    elements.actionButtons.innerHTML = ""; 
    
    for (const actionId in loc.actions) {
        const action = loc.actions[actionId];
        const btn = document.createElement('button');
        btn.id = `action-btn-${actionId}`;
        btn.className = 'action-btn';
        btn.textContent = action.name;
        
        btn.disabled = playerState.selectedActionsThisTurn.includes(actionId);
        
        btn.onclick = () => {
            if (playerState.actionsRemainingThisTurn > 0) {
                playerState.actionsRemainingThisTurn--;
                playerState.selectedActionsThisTurn.push(actionId);
                renderResultView(locId, actionId); 
            }
        };
        elements.actionButtons.appendChild(btn);
    }
    
    elements.actionButtons.classList.remove('hidden'); 
    
    if (playerState.actionsRemainingThisTurn <= 0) {
        elements.actionButtons.querySelectorAll('.action-btn').forEach(btn => btn.disabled = true);
        elements.actionTitle.textContent = "이 장소의 탐색을 마쳤습니다. (힌트 확인 후 자동 이동)";
    }
}

/** 장소 떠나기 로직 (자동 호출용) */
function leaveLocation() {
    playerState.visitCount++;
    playerState.visitedLocations.push(playerState.currentLocationId);
    
    elements.backgroundImage.classList.remove('visible'); 
    
    if (playerState.visitCount >= 3) {
        renderDebrief(); 
    } else {
        renderLocationSelect();
    }
}

/** 전환 화면 렌더링 함수 (V21 수정) */
function renderDebrief() {
    showView('debrief-screen');
    elements.backgroundImage.src = gameData.screens.debrief;
    elements.backgroundImage.classList.add('visible');
    
    elements.gotoFinalGuessBtn.classList.add('hidden');
    
    document.querySelectorAll('#visit-counter').forEach(el => {
        el.textContent = '남은 방문 기회: 0';
    });
    
    startTypewriter(elements.debriefText, gameData.debriefText, 40, () => { 
        elements.gotoFinalGuessBtn.classList.remove('hidden');
    });
}

/** [화면 3] 힌트 결과 화면 렌더링 (V28 수정) */
function renderResultView(locId, actionId) {
    showView('result-view');
    
    const loc = gameData.locations[locId];
    const action = loc.actions[actionId];
    
    let resultHTML = "";
    action.hint_ids.forEach(hintId => {
        const hint = gameData.hints[hintId];
        if (hint) {
            resultHTML += `${hint.text}\n\n\n`; 
            playerState.inventory.add(hintId); // [V28] 힌트 저장은 계속
        }
    });

    updateInventory(); // [V28] 인벤토리 UI 업데이트 호출
    
    elements.backToActionsBtn.classList.add('hidden');
    
    const fullResultText = resultHTML;
    startTypewriter(elements.resultText, fullResultText, 25, () => {
        elements.backToActionsBtn.classList.remove('hidden');
    });
}

/** 인벤토리 UI 업데이트 (V28 복구) */
function updateInventory() {
    if (!elements.inventoryList) return; // 인벤토리가 없으면 종료

    if (playerState.inventory.size === 0) {
        elements.inventoryList.innerHTML = "아직 단서가 없습니다.";
        return;
    }
    
    elements.inventoryList.innerHTML = "";
    playerState.inventory.forEach(hintId => {
        const hint = gameData.hints[hintId];
        if (hint) {
            const hintEl = document.createElement('div');
            hintEl.title = hint.text.replace(/<[^>]*>?/gm, ''); 
            hintEl.textContent = hint.name; 
            elements.inventoryList.appendChild(hintEl);
        }
    });
}

/** [화면 4] 최종 지목 화면 옵션 채우기 (V25 수정) */
function populateFinalGuessOptions() {
    elements.guessLocationButtons.innerHTML = '';
    for (const locId in gameData.finalLocations) {
        const locName = gameData.finalLocations[locId];
        const btn = createGuessButton(locId, locName, 'location');
        elements.guessLocationButtons.appendChild(btn);
    }
    
    elements.guessCulpritButtons.innerHTML = '';
    for (const culpritId in gameData.suspects) {
        const culpritName = gameData.suspects[culpritId];
        const btn = createGuessButton(culpritId, culpritName, 'culprit');
        elements.guessCulpritButtons.appendChild(btn);
    }
}

/** 공통 버튼 생성 함수 */
function createGuessButton(value, text, type) {
    const btn = document.createElement('button');
    btn.className = 'guess-choice-btn';
    btn.textContent = text;
    btn.dataset.value = value; 
    
    btn.onclick = () => {
        const parent = btn.parentElement;
        parent.querySelectorAll('.guess-choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        if (type === 'location') {
            playerState.finalGuess.location = value;
        } else if (type === 'culprit') {
            playerState.finalGuess.culprit = value;
        }
    };
    return btn;
}

/** 최종 지목 단계 렌더링 (V21 수정) */
function renderFinalGuessStep(step) {
    showView('final-guess-view');
    elements.backgroundImage.src = gameData.screens.finalGuess;
    elements.backgroundImage.classList.add('visible');
    
    elements.guessStep1.classList.add('hidden');
    elements.guessStep2.classList.add('hidden');
    elements.guessStep3.classList.add('hidden');
    
    $(`#guess-step-${step}`).classList.remove('hidden');
    
    if (step === 1) {
        playerState.finalGuess.location = null;
        elements.guessLocationButtons.querySelectorAll('.guess-choice-btn').forEach(b => b.classList.remove('selected'));
    } else if (step === 3) {
        playerState.finalGuess.culprit = null;
        elements.guessCulpritButtons.querySelectorAll('.guess-choice-btn').forEach(b => b.classList.remove('selected'));
    }
}

/** [화면 5] 엔딩 확인 및 렌더링 (V21 수정) */
function checkAndRenderEnding() {
    const playerGuess = playerState.finalGuess;
    const correct = gameData.correctAnswer;
    
    let isTrueEnding = (
        playerGuess.location === correct.location &&
        playerGuess.floor === correct.floor &&
        playerGuess.culprit === correct.culprit
    );
    
    const endingData = isTrueEnding ? gameData.endings.true : gameData.endings.false;
    
    showView('ending-view');
    elements.backgroundImage.src = gameData.screens.ending;
    elements.backgroundImage.classList.add('visible');
    
    elements.endingTitle.textContent = endingData.title;
    elements.endingTitle.className = endingData.className;
    
    elements.restartBtn.classList.add('hidden');
    
    const fullEndingText = endingData.text;
    startTypewriter(elements.endingText, fullEndingText, 30, () => {
        elements.restartBtn.classList.remove('hidden');
    });
}

// --- [5. 이벤트 리스너 (V28 - 인벤토리 복구)] ---

// (인트로) 게임 시작 버튼
elements.startGameBtn.onclick = () => {
    renderLocationSelect(); 
};
// [스킵] 인트로 화면 클릭
elements.introScreen.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
        skipTyping(elements.introStory, () => {
            showSuspectIntro(); 
        });
    }
};

// [V21] (조기 지목) 최종 지목 시작 버튼
elements.earlyGuessBtn.onclick = () => {
    if (confirm("아직 탐색 기회가 남았습니다.\n정말로 '최종 지목'을 시작하시겠습니까? (되돌릴 수 없습니다)")) {
        renderFinalGuessStep(1); 
    }
};

// (행동 선택) 화면 클릭 [스킵]
elements.actionSelectView.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
        if (playerState.selectedActionsThisTurn.length > 0) return;
        
        skipTyping(elements.actionIntro, () => {
            renderActionButtons(playerState.currentLocationId);
        });
    }
};

// (결과) '행동 선택으로 돌아가기' 버튼
elements.backToActionsBtn.onclick = () => {
    if (playerState.actionsRemainingThisTurn <= 0) {
        leaveLocation(); 
    } else {
        renderActionSelect(playerState.currentLocationId); 
    }
};
// [스킵] 결과 화면 클릭
elements.resultView.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
        skipTyping(elements.resultText, () => {
            elements.backToActionsBtn.classList.remove('hidden');
        });
    }
};

// 전환 화면 버튼 리스너
elements.gotoFinalGuessBtn.onclick = () => {
    renderFinalGuessStep(1);
};
// 전환 화면 스킵
elements.debriefScreen.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
        skipTyping(elements.debriefText, () => {
            elements.gotoFinalGuessBtn.classList.remove('hidden');
        });
    }
};

// 단계별 지목 버튼 리스너
elements.gotoStep2Btn.onclick = () => {
    if (!playerState.finalGuess.location) {
        alert("장소를 선택해야 합니다.");
        return;
    }
    renderFinalGuessStep(2); 
};

elements.gotoStep3Btn.onclick = () => {
     if (!elements.guessFloor.value) {
        alert("층수를 입력해야 합니다.");
        return;
    }
    playerState.finalGuess.floor = elements.guessFloor.value.trim();
    renderFinalGuessStep(3); 
};

elements.submitFinalGuessBtn.onclick = () => {
    if (!playerState.finalGuess.culprit) {
        alert("범인을 지목해야 합니다.");
        return;
    }
    checkAndRenderEnding(); 
};


// (엔딩) 다시 플레이하기 버튼
elements.restartBtn.onclick = () => {
    if (confirm("정말로 처음부터 다시 시작하시겠습니까?")) {
        initGame();
    }
};
elements.endingView.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
        skipTyping(elements.endingText, () => {
            elements.restartBtn.classList.remove('hidden');
        });
    }
};

// [V28 수정] 인벤토리 토글 버튼 복구
elements.inventoryToggle.onclick = () => {
    elements.inventory.classList.toggle('open');
};

// --- [6. 게임 시작 (V28)] ---
/** 게임 초기화 함수 */
function initGame() {
    playerState = {
        visitCount: 0,
        visitedLocations: [],
        inventory: new Set(), 
        currentLocationId: null,
        actionsRemainingThisTurn: 2,
        selectedActionsThisTurn: [],
        finalGuess: {} 
    };

    showView('intro-screen'); 
    elements.backgroundImage.src = gameData.screens.intro;
    elements.backgroundImage.classList.add('visible');
    
    // [V28 수정] 인벤토리 초기화 복구
    elements.inventoryList.innerHTML = "아직 단서가 없습니다.";
    elements.inventory.classList.remove('open');

    populateFinalGuessOptions(); 
    
    elements.introSuspects.style.display = 'none'; 
    elements.startGameBtn.classList.add('hidden'); 
    
    startTypewriter(elements.introStory, gameData.introText, 30, () => { 
        showSuspectIntro(); 
    });
}

initGame(); // 게임 시작!