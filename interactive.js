(function () {
  "use strict";

  function getLang() {
    try { return localStorage.getItem('nt-lang') === 'en' ? 'en' : 'tr'; } catch (e) { return 'tr'; }
  }
  var lang = getLang();

  /* ============ shared string tables ============ */
  var T = {
    tr: {
      tabGame: "Stroop Oyunu", tabQuiz: "Zihinsel Check-in",
      gameTitle: "Renk mi, Kelime mi?", gameDesc: "Ekranda beliren kelimenin ne olduğuna değil, hangi renkte yazıldığına bak. Doğru rengin butonuna bas — ama beynin seni yanıltmaya çalışacak.",
      startBtn: "Oyunu Başlat", round: "Tur", of: "/",
      resultTitle: "Sonuçların", correctLabel: "Doğru", avgLabel: "Ort. Tepki Süresi", ms: "ms",
      replayBtn: "Tekrar Oyna",
      tag90: "Zihnin inanılmaz çevik! Beynin, çelişkili bilgiyi filtrelemekte gerçekten başarılı.",
      tag70: "Gayet iyi bir performans — Stroop etkisine karşı oldukça dirençlisin.",
      tag50: "Fena değil! Stroop etkisi çoğu insanı biraz yavaşlatır, sen de istisna değilsin.",
      tag0: "Stroop etkisi seni de yakaladı — bu tamamen normal. Beynin kelimeyi otomatik okuyor, rengi görmezden geliyor.",
      infoSummary: "Stroop etkisi nedir?",
      infoBody: "1935'te John Ridley Stroop tarafından tanımlanan bu klasik deney, beynimizin kelime okumayı otomatikleştirdiğini gösterir. 'MAVİ' kelimesi kırmızı renkte yazıldığında, kelimeyi okumak renk adlandırmaktan daha hızlı gerçekleştiği için bir çelişki yaşarız — tepki sürelerimiz uzar ve hata yapma ihtimalimiz artar.",
      colorRed: "KIRMIZI", colorBlue: "MAVİ", colorGreen: "YEŞİL", colorAmber: "SARI",
      quizIntro: "Aşağıdaki altı soruyu şu anki haline göre yanıtla. Bu bir test değil, kısa bir öz farkındalık molası.",
      submitBtn: "Sonucu Gör", low: "Düşük", high: "Yüksek",
      dimEnergy: "Enerji", dimMood: "Ruh Hali", dimStress: "Stres", dimSleep: "Uyku", dimConnection: "Bağlantı", dimFocus: "Odak",
      notes: {
        energy: ["Enerjin bugün oldukça düşük görünüyor. Kısa bir mola ya da erken bir uyku iyi gelebilir.", "Enerji seviyen orta düzeyde — günü dengeli bir tempoyla sürdürebilirsin.", "Enerjin oldukça yüksek! Bunu üretken bir şeye kanalize etmek için iyi bir gün olabilir."],
        mood: ["Ruh halin bugün biraz düşük seyrediyor olabilir. Kendine nazik davranmaya çalış.", "Ruh halin dengeli görünüyor.", "Bugün oldukça iyi hissediyor gibisin — bu enerjiyi paylaşmak güzel olabilir."],
        stress: ["Stres seviyen düşük — bu harika bir denge işareti.", "Orta düzeyde bir stres taşıyorsun; birkaç dakikalık nefes molası fark yaratabilir.", "Stres seviyen yüksek görünüyor. Kısa bir yürüyüş ya da derin nefes egzersizi düşünebilirsin."],
        sleep: ["Uyku kaliten düşük görünüyor — bu gün boyunca odaklanmanı etkileyebilir.", "Uykun ortalama düzeyde.", "Dinlenmiş görünüyorsun, bu da güne iyi bir başlangıç demek."],
        connection: ["Şu aralar biraz yalnız hissediyor olabilirsin. Yakın birine mesaj atmak iyi gelebilir.", "Sosyal bağlantı düzeyin dengeli görünüyor.", "Çevrenle güçlü bir bağ hissediyorsun — bu, iyi oluş için değerli bir kaynak."],
        focus: ["Odaklanmakta zorlanıyor olabilirsin bugün — küçük adımlarla ilerlemek yardımcı olabilir.", "Odak düzeyin orta seviyede.", "Zihnin bugün oldukça net ve odaklı görünüyor."]
      },
      disclaimerGame: "Bu araç yalnızca eğlence ve genel farkındalık amaçlıdır; bilişsel bir değerlendirme ya da tanı aracı değildir.",
      disclaimerQuiz: "Bu kısa check-in bir tanı testi değildir ve klinik bir değerlendirmenin yerini tutmaz — yalnızca öz farkındalık içindir. Zorlandığını hissediyorsan bir uzmanla konuşmak her zaman iyi bir adımdır."
    },
    en: {
      tabGame: "Stroop Game", tabQuiz: "Mental Check-in",
      gameTitle: "Color or Word?", gameDesc: "Don't read the word — look at the color it's printed in. Tap the matching color button, but your brain will try to trick you.",
      startBtn: "Start Game", round: "Round", of: "/",
      resultTitle: "Your Results", correctLabel: "Correct", avgLabel: "Avg. Reaction Time", ms: "ms",
      replayBtn: "Play Again",
      tag90: "Your mind is remarkably quick! Your brain is genuinely good at filtering out conflicting information.",
      tag70: "Solid performance — you're pretty resistant to the Stroop effect.",
      tag50: "Not bad! The Stroop effect slows most people down a little, and you're no exception.",
      tag0: "The Stroop effect got you too — completely normal. Your brain reads the word automatically, overriding the color.",
      infoSummary: "What is the Stroop effect?",
      infoBody: "First described by John Ridley Stroop in 1935, this classic experiment shows that reading words is a largely automatic process for our brains. When the word 'BLUE' is printed in red ink, reading the word happens faster than naming the color, creating a conflict — reaction times slow down and error rates rise.",
      colorRed: "RED", colorBlue: "BLUE", colorGreen: "GREEN", colorAmber: "YELLOW",
      quizIntro: "Answer the six questions below based on how you feel right now. This isn't a test — just a short moment of self-awareness.",
      submitBtn: "See Result", low: "Low", high: "High",
      dimEnergy: "Energy", dimMood: "Mood", dimStress: "Stress", dimSleep: "Sleep", dimConnection: "Connection", dimFocus: "Focus",
      notes: {
        energy: ["Your energy seems quite low today. A short break or an early night might help.", "Your energy is at a moderate level — you can keep a steady pace today.", "Your energy is high! This could be a good day to channel it into something productive."],
        mood: ["Your mood might be a bit low today. Try to be gentle with yourself.", "Your mood looks fairly balanced.", "You seem to be feeling quite good today — sharing that energy could be nice."],
        stress: ["Your stress level is low — a great sign of balance.", "You're carrying a moderate amount of stress; a few minutes of deep breathing could help.", "Your stress level looks high. A short walk or a breathing exercise might be worth trying."],
        sleep: ["Your sleep quality looks low — this may affect your focus today.", "Your sleep is at an average level.", "You seem well-rested, which is a good start to the day."],
        connection: ["You might be feeling a bit isolated lately. Reaching out to someone close could help.", "Your sense of social connection looks balanced.", "You feel strongly connected to those around you — a valuable resource for well-being."],
        focus: ["You may be finding it hard to focus today — small steps can help.", "Your focus is at a moderate level.", "Your mind seems clear and focused today."]
      },
      disclaimerGame: "This tool is for entertainment and general awareness only; it is not a cognitive assessment or diagnostic instrument.",
      disclaimerQuiz: "This short check-in is not a diagnostic test and does not replace a clinical assessment — it's for self-reflection only. If you're struggling, talking to a professional is always a good step."
    }
  };

  var COLORS = [
    { key: "red", hex: "#b5432c" },
    { key: "blue", hex: "#2f5f8a" },
    { key: "green", hex: "#3f6b45" },
    { key: "amber", hex: "#c98a2b" }
  ];
  function colorLabel(key, L) {
    if (key === "red") return T[L].colorRed;
    if (key === "blue") return T[L].colorBlue;
    if (key === "green") return T[L].colorGreen;
    return T[L].colorAmber;
  }

  var ROUNDS_TOTAL = 15;
  var ROUND_TIMEOUT = 4000;

  var gameEl, quizEl;
  var game = { screen: "start", round: 0, results: [], current: null, roundStart: 0, timer: null };

  function buildRound() {
    var word = COLORS[Math.floor(Math.random() * COLORS.length)];
    var ink;
    if (Math.random() < 0.22) {
      ink = word;
    } else {
      var others = COLORS.filter(function (c) { return c.key !== word.key; });
      ink = others[Math.floor(Math.random() * others.length)];
    }
    return { word: word, ink: ink };
  }

  function renderGame() {
    if (!gameEl) return;
    var L = lang;
    if (game.screen === "start") {
      gameEl.innerHTML =
        '<div class="game-intro">' +
        '<h2>' + T[L].gameTitle + '</h2>' +
        '<p>' + T[L].gameDesc + '</p>' +
        '<button class="game-start-btn" id="stroop-start">' + T[L].startBtn + '</button>' +
        '</div>';
      var b = document.getElementById('stroop-start');
      if (b) b.addEventListener('click', startGame);
    } else if (game.screen === "playing") {
      var r = game.current;
      gameEl.innerHTML =
        '<div class="game-progress" style="width:' + (game.round / ROUNDS_TOTAL * 100) + '%"></div>' +
        '<div class="game-meta-row">' + T[L].round + ' ' + game.round + T[L].of + ROUNDS_TOTAL + '</div>' +
        '<div class="flash-overlay" id="flash"></div>' +
        '<div class="stroop-word" id="stroop-word" style="color:' + r.ink.hex + '">' + colorLabel(r.word.key, L) + '</div>' +
        '<div class="color-buttons" id="color-buttons"></div>';
      var wrap = document.getElementById('color-buttons');
      COLORS.forEach(function (c) {
        var btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.style.background = c.hex;
        btn.textContent = colorLabel(c.key, L);
        btn.addEventListener('click', function () { answer(c.key); });
        wrap.appendChild(btn);
      });
      game.roundStart = performance.now();
      clearTimeout(game.timer);
      game.timer = setTimeout(function () { answer(null); }, ROUND_TIMEOUT);
    } else if (game.screen === "result") {
      var correct = game.results.filter(function (r) { return r.correct; }).length;
      var avgTime = Math.round(game.results.reduce(function (s, r) { return s + r.time; }, 0) / game.results.length);
      var pct = correct / game.results.length;
      var tag = pct >= 0.9 ? T[L].tag90 : pct >= 0.7 ? T[L].tag70 : pct >= 0.5 ? T[L].tag50 : T[L].tag0;
      gameEl.innerHTML =
        '<div class="game-result">' +
        '<h2>' + T[L].resultTitle + '</h2>' +
        '<div class="result-score">' + correct + '<span style="opacity:.3">/' + game.results.length + '</span></div>' +
        '<div class="result-stats">' +
        '<div><div class="result-stat-num">' + correct + '/' + game.results.length + '</div><div class="result-stat-label">' + T[L].correctLabel + '</div></div>' +
        '<div><div class="result-stat-num">' + avgTime + ' ' + T[L].ms + '</div><div class="result-stat-label">' + T[L].avgLabel + '</div></div>' +
        '</div>' +
        '<p class="result-tagline">' + tag + '</p>' +
        '<button class="game-replay-btn" id="stroop-replay">' + T[L].replayBtn + '</button>' +
        '</div>';
      var rb = document.getElementById('stroop-replay');
      if (rb) rb.addEventListener('click', startGame);
    }
  }

  function startGame() {
    game.screen = "playing";
    game.round = 1;
    game.results = [];
    game.current = buildRound();
    renderGame();
  }

  function answer(colorKey) {
    clearTimeout(game.timer);
    var r = game.current;
    var correct = colorKey === r.ink.key;
    var time = Math.min(Math.round(performance.now() - game.roundStart), ROUND_TIMEOUT);
    game.results.push({ correct: correct, time: time });

    var wordEl = document.getElementById('stroop-word');
    var flash = document.getElementById('flash');
    if (wordEl) { wordEl.classList.add('pulse'); }
    if (flash) { flash.className = 'flash-overlay ' + (correct ? 'correct' : 'wrong'); }

    setTimeout(function () {
      if (game.round >= ROUNDS_TOTAL) {
        game.screen = "result";
        renderGame();
      } else {
        game.round += 1;
        game.current = buildRound();
        renderGame();
      }
    }, 260);
  }

  /* ============ reflection quiz ============ */
  var DIMS = ["energy", "mood", "stress", "sleep", "connection", "focus"];
  var quizValues = { energy: 3, mood: 3, stress: 3, sleep: 3, connection: 3, focus: 3 };
  var quizSubmitted = false;

  function dimLabel(key, L) {
    var map = { energy: "dimEnergy", mood: "dimMood", stress: "dimStress", sleep: "dimSleep", connection: "dimConnection", focus: "dimFocus" };
    return T[L][map[key]];
  }

  function renderQuizForm() {
    if (!quizEl) return;
    var L = lang;
    var formHtml = '<p class="quiz-intro">' + T[L].quizIntro + '</p><div id="quiz-sliders">';
    DIMS.forEach(function (d) {
      formHtml +=
        '<div class="slider-row">' +
        '<div class="slider-row-head"><span class="slider-label">' + dimLabel(d, L) + '</span><span class="slider-value" id="val-' + d + '">' + quizValues[d] + ' / 5</span></div>' +
        '<input type="range" min="1" max="5" step="1" value="' + quizValues[d] + '" data-dim="' + d + '">' +
        '<div class="slider-endpoints"><span>' + T[L].low + '</span><span>' + T[L].high + '</span></div>' +
        '</div>';
    });
    formHtml += '</div><button class="quiz-submit" id="quiz-submit-btn">' + T[L].submitBtn + '</button>';
    formHtml += '<div class="quiz-result" id="quiz-result"></div>';
    quizEl.innerHTML = formHtml;

    quizEl.querySelectorAll('input[type="range"]').forEach(function (input) {
      input.addEventListener('input', function () {
        var d = input.dataset.dim;
        quizValues[d] = parseInt(input.value, 10);
        var v = document.getElementById('val-' + d);
        if (v) v.textContent = quizValues[d] + ' / 5';
      });
    });
    var submitBtn = document.getElementById('quiz-submit-btn');
    if (submitBtn) submitBtn.addEventListener('click', function () {
      quizSubmitted = true;
      renderQuizResult();
    });

    if (quizSubmitted) renderQuizResult();
  }

  function radarSvg() {
    var size = 320, pad = 70, vbW = size + pad * 2, vbH = size + pad * 2, cx = size / 2, cy = size / 2, maxR = 100;
    var n = DIMS.length;
    function pt(i, r) {
      var angle = -Math.PI / 2 + i * (2 * Math.PI / n);
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    }
    var rings = [0.2, 0.4, 0.6, 0.8, 1].map(function (f) {
      var pts = [];
      for (var i = 0; i < n; i++) { var p = pt(i, maxR * f); pts.push(p[0] + ',' + p[1]); }
      return '<polygon points="' + pts.join(' ') + '" fill="none" stroke="var(--line)" stroke-width="1"/>';
    }).join('');
    var axes = '';
    var labels = '';
    for (var i = 0; i < n; i++) {
      var p = pt(i, maxR);
      axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="var(--line)" stroke-width="1"/>';
      var lp = pt(i, maxR + 32);
      var anchor = lp[0] < cx - 4 ? 'end' : lp[0] > cx + 4 ? 'start' : 'middle';
      labels += '<text class="radar-axis-label" x="' + lp[0] + '" y="' + lp[1] + '" text-anchor="' + anchor + '" dominant-baseline="middle" data-dim-label="' + DIMS[i] + '">' + '</text>';
    }
    var dataPts = [];
    for (var j = 0; j < n; j++) {
      var val = quizValues[DIMS[j]] / 5;
      var p2 = pt(j, maxR * val);
      dataPts.push(p2[0] + ',' + p2[1]);
    }
    var poly = '<polygon class="radar-poly" id="radar-poly" points="' + dataPts.join(' ') + '"/>';
    return '<svg viewBox="' + (-pad) + ' ' + (-pad) + ' ' + vbW + ' ' + vbH + '" width="' + vbW + '" height="' + vbH + '">' + rings + axes + poly + labels + '</svg>';
  }

  function renderQuizResult() {
    var L = lang;
    var resultEl = document.getElementById('quiz-result');
    if (!resultEl) return;
    resultEl.classList.add('show');
    var notesHtml = DIMS.map(function (d) {
      var v = quizValues[d];
      var tier = v <= 2 ? 0 : v === 3 ? 1 : 2;
      var text = T[L].notes[d][tier];
      return '<div class="reflection-note"><div class="reflection-note-dim">' + dimLabel(d, L) + '</div><div class="reflection-note-text">' + text + '</div></div>';
    }).join('');
    resultEl.innerHTML = '<div class="radar-wrap">' + radarSvg() + '</div><div class="reflection-notes">' + notesHtml + '</div>';

    resultEl.querySelectorAll('[data-dim-label]').forEach(function (el) {
      el.textContent = dimLabel(el.getAttribute('data-dim-label'), L);
    });

    requestAnimationFrame(function () {
      var poly = document.getElementById('radar-poly');
      if (poly) requestAnimationFrame(function () { poly.classList.add('drawn'); });
    });
  }

  /* ============ tabs ============ */
  function initTabs() {
    var tabs = document.querySelectorAll('.tool-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('.tool-panel').forEach(function (p) { p.classList.remove('active'); });
        var target = document.getElementById(tab.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  }

  /* ============ lang integration ============ */
  function relabelStaticText() {
    document.querySelectorAll('.js-tool-tab-label').forEach(function (el) {
      el.textContent = el.dataset.tab === 'game' ? T[lang].tabGame : T[lang].tabQuiz;
    });
    var infoSummary = document.getElementById('stroop-info-summary');
    var infoBody = document.getElementById('stroop-info-body');
    if (infoSummary) infoSummary.textContent = T[lang].infoSummary;
    if (infoBody) infoBody.textContent = T[lang].infoBody;
    var dg = document.getElementById('disclaimer-game');
    var dq = document.getElementById('disclaimer-quiz');
    if (dg) dg.textContent = T[lang].disclaimerGame;
    if (dq) dq.textContent = T[lang].disclaimerQuiz;
  }

  function reRenderAll() {
    relabelStaticText();
    renderGame();
    var wasSubmitted = quizSubmitted;
    renderQuizForm();
    quizSubmitted = wasSubmitted;
    if (quizSubmitted) renderQuizResult();
  }

  document.addEventListener('DOMContentLoaded', function () {
    gameEl = document.getElementById('stroop-game');
    quizEl = document.getElementById('reflection-quiz');
    if (!gameEl && !quizEl) return;

    initTabs();
    relabelStaticText();
    renderGame();
    renderQuizForm();

    var prevSetLang = window.setLang;
    window.setLang = function (newLang) {
      if (typeof prevSetLang === 'function') prevSetLang(newLang);
      lang = newLang;
      reRenderAll();
    };
  });
})();
