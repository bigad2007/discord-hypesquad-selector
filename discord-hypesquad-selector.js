/**
 * =====================================================================
 * @name         Discord HypeSquad House Selector
 * @description  One-click HypeSquad badge assigner with multi-token scan
 * @author       비가드 (Bigad)
 * @copyright    Copyright (c) 2026 비가드. All rights reserved.
 * @purpose      FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY
 * =====================================================================
 */

(async () => {
  // 1. 기존 모달 정리 / Clean up existing modal
  const old = document.getElementById("hs-super-modal");
  if (old) old.remove();

  // ----------------------------------------------------
  // [엔진 / ENGINE] 다중 토큰 자동 스캔 / Multi-token auto scanner
  // ----------------------------------------------------
  const getDiscordToken = async () => {
    // 1단계: 격리 iframe 생성 후 localStorage 스캔
    try {
      const f = document.createElement("iframe");
      f.style.display = "none";
      document.body.appendChild(f);
      const storage = f.contentWindow.localStorage;
      const t = storage.getItem("token");
      f.remove();
      if (t) return JSON.parse(t);
    } catch (_) {}

    // 2단계: Webpack 청크 모듈 캐시 탐색
    try {
      let wp;
      window.webpackChunkdiscord_app.push([[Symbol("tk-scan")], {}, (e) => { wp = e; }]);
      window.webpackChunkdiscord_app.pop();
      if (wp?.c) {
        for (const id in wp.c) {
          const m = wp.c[id]?.exports?.default || wp.c[id]?.exports;
          if (!m) continue;
          if (typeof m.getToken === "function") {
            const t = m.getToken();
            if (t) return t;
          }
          if (typeof m.getRawToken === "function") {
            const t = m.getRawToken();
            if (t) return t;
          }
          if (m.token && typeof m.token === "string" && m.token.length > 50) {
            return m.token;
          }
        }
      }
    } catch (_) {}

    // 3단계: window 전역 프로퍼티 검사
    try {
      for (const k in window) {
        if (k.toLowerCase().includes("token") && typeof window[k] === "string" && window[k].length > 50) {
          return window[k];
        }
      }
    } catch (_) {}

    // 4단계: IndexedDB 세션 데이터베이스 조회
    try {
      const dbPromise = new Promise((resolve) => {
        const req = indexedDB.open("keyval-store");
        req.onsuccess = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains("keyval")) return resolve(null);
          const tx = db.transaction("keyval", "readonly");
          const getReq = tx.objectStore("keyval").get("token");
          getReq.onsuccess = () => resolve(getReq.result || null);
          getReq.onerror = () => resolve(null);
        };
        req.onerror = () => resolve(null);
      });
      const idbToken = await dbPromise;
      if (idbToken) return idbToken;
    } catch (_) {}

    return null;
  };

  // ----------------------------------------------------
  // [데이터 / DATA] 다국어 텍스트 및 배지 에셋
  // ----------------------------------------------------
  let currentLang = "ko";

  const i18n = {
    ko: {
      title: "HypeSquad 배지 선택",
      desc: "원하는 공식 배지를 클릭하면 즉시 프로필에 영구 등록됩니다.",
      defaultStatus: "원하는 배지를 클릭하세요.",
      scanning: "🔍 내부 토큰 확인 중...",
      waitingClick: "💬 채팅창이나 채널을 한 번만 클릭해주세요 (자동 감지 대기 중)",
      tokenFail: "❌ 토큰을 감지하지 못했습니다. F5 새로고침 후 다시 시도하세요.",
      sending: (name) => `${name} 배지 등록 요청 전송 중...`,
      success: (name) => `✅ [${name}] 배지 적용 성공! 프로필을 확인하세요.`,
      serverError: (code) => `❌ 서버 응답 에러: HTTP ${code}`,
      netError: "❌ 통신 실패",
      subtitles: { 1: "용기 (보라)", 2: "탁월함 (주황)", 3: "조화 (청록)" },
      copyright: "© 2026 비가드 (Bigad). All rights reserved.",
      educational: "[ 본 스크립트는 교육 및 연구 목적으로 제작되었습니다 ]"
    },
    en: {
      title: "Select HypeSquad Badge",
      desc: "Click an official badge to permanently apply it to your profile.",
      defaultStatus: "Click a badge to apply.",
      scanning: "🔍 Checking internal token...",
      waitingClick: "💬 Please click any channel or chat to detect token...",
      tokenFail: "❌ Token not detected. Please press F5 and try again.",
      sending: (name) => `Applying ${name} badge...`,
      success: (name) => `✅ [${name}] badge applied! Check your profile.`,
      serverError: (code) => `❌ Server Error: HTTP ${code}`,
      netError: "❌ Network error",
      subtitles: { 1: "Bravery (Purple)", 2: "Brilliance (Orange)", 3: "Balance (Teal)" },
      copyright: "© 2026 Bigad. All rights reserved.",
      educational: "[ FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY ]"
    }
  };

  // 왼쪽(Bravery)은 엑박 없는 내장 벡터 데이터 적용, 가운데/오른쪽은 원래 정상 작동하던 공식 CDN 링크 유지
  const houses = [
    {
      id: 1,
      name: "Bravery",
      color: "#9b84ee",
      img: "data:image/svg+xml;utf8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="44" height="44">
          <rect x="8.5" y="8.5" width="31" height="31" rx="6.5" transform="rotate(45 24 24)" fill="#9b84ee"/>
          <path d="M24 14.5L28 20.5L24 24L20 20.5Z" fill="#232428"/>
          <path d="M16 23.5L24 35L32 23.5L28.5 22.5L24 28L19.5 22.5Z" fill="#232428"/>
        </svg>
      `)
    },
    {
      id: 2,
      name: "Brilliance",
      color: "#f47b67",
      img: "https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png"
    },
    {
      id: 3,
      name: "Balance",
      color: "#45ddc0",
      img: "https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png"
    }
  ];

  // ----------------------------------------------------
  // [UI 렌더링 / UI RENDERING]
  // ----------------------------------------------------
  const overlay = document.createElement("div");
  overlay.id = "hs-super-modal";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "999999",
    fontFamily: "'gg sans', 'Noto Sans KR', sans-serif"
  });

  const modal = document.createElement("div");
  Object.assign(modal.style, {
    backgroundColor: "#313338",
    padding: "26px",
    borderRadius: "14px",
    width: "500px",
    maxWidth: "92%",
    boxShadow: "0 10px 32px rgba(0,0,0,0.6)",
    color: "#f2f3f5",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  });

  modal.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h2 id="hs-title" style="margin:0; font-size:20px; font-weight:700;">${i18n[currentLang].title}</h2>
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="display:flex; background:#232428; border-radius:6px; padding:2px;">
          <button id="lang-ko" style="padding:4px 8px; font-size:12px; font-weight:700; border:none; border-radius:4px; cursor:pointer; background:#5865f2; color:#fff;">한국어</button>
          <button id="lang-en" style="padding:4px 8px; font-size:12px; font-weight:700; border:none; border-radius:4px; cursor:pointer; background:transparent; color:#b5bac1;">English</button>
        </div>
        <button id="hs-close" style="background:none; border:none; color:#b5bac1; font-size:20px; cursor:pointer;">✕</button>
      </div>
    </div>
    <p id="hs-desc" style="margin:0; font-size:13px; color:#b5bac1;">${i18n[currentLang].desc}</p>
    <div id="hs-cards" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px;"></div>
    <div id="hs-status" style="font-size:13px; text-align:center; min-height:18px; color:#949ba4;">${i18n[currentLang].defaultStatus}</div>
    
    <!-- 저작권 및 교육 목적 안내 ("본 도구 뭐시기" 문구 삭제 완료) -->
    <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:12px; display:flex; flex-direction:column; align-items:center; gap:4px;">
      <span id="hs-copyright" style="font-size:11px; font-weight:600; color:#80848e;">${i18n[currentLang].copyright}</span>
      <span id="hs-edu" style="font-size:10px; font-weight:700; color:#5865f2;">${i18n[currentLang].educational}</span>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  document.getElementById("hs-close").onclick = close;
  overlay.onclick = (e) => { if (e.target === overlay) close(); };

  const cardsContainer = document.getElementById("hs-cards");
  const statusEl = document.getElementById("hs-status");
  const titleEl = document.getElementById("hs-title");
  const descEl = document.getElementById("hs-desc");
  const copyrightEl = document.getElementById("hs-copyright");
  const eduEl = document.getElementById("hs-edu");
  const btnKo = document.getElementById("lang-ko");
  const btnEn = document.getElementById("lang-en");

  // ----------------------------------------------------
  // [언어 전환 / LANGUAGE SWITCHER]
  // ----------------------------------------------------
  const updateLanguage = (lang) => {
    currentLang = lang;
    titleEl.innerText = i18n[lang].title;
    descEl.innerText = i18n[lang].desc;
    statusEl.innerText = i18n[lang].defaultStatus;
    copyrightEl.innerText = i18n[lang].copyright;
    eduEl.innerText = i18n[lang].educational;

    if (lang === "ko") {
      btnKo.style.background = "#5865f2";
      btnKo.style.color = "#fff";
      btnEn.style.background = "transparent";
      btnEn.style.color = "#b5bac1";
    } else {
      btnEn.style.background = "#5865f2";
      btnEn.style.color = "#fff";
      btnKo.style.background = "transparent";
      btnKo.style.color = "#b5bac1";
    }

    houses.forEach(h => {
      const sub = document.getElementById(`sub-${h.id}`);
      if (sub) sub.innerText = i18n[lang].subtitles[h.id];
    });
  };

  btnKo.onclick = () => updateLanguage("ko");
  btnEn.onclick = () => updateLanguage("en");

  // ----------------------------------------------------
  // [전송 로직 / API DISPATCH]
  // ----------------------------------------------------
  const executeJoin = async (houseId, name) => {
    const text = i18n[currentLang];
    statusEl.style.color = "#e9a820";
    statusEl.innerText = text.scanning;

    let token = await getDiscordToken();

    if (!token) {
      statusEl.style.color = "#5865f2";
      statusEl.innerText = text.waitingClick;

      token = await new Promise((resolve) => {
        const origSet = XMLHttpRequest.prototype.setRequestHeader;
        XMLHttpRequest.prototype.setRequestHeader = function(k, v) {
          if (k.toLowerCase() === "authorization" && v && !v.startsWith("Bot")) {
            XMLHttpRequest.prototype.setRequestHeader = origSet;
            resolve(v);
          }
          return origSet.apply(this, arguments);
        };
        setTimeout(() => {
          XMLHttpRequest.prototype.setRequestHeader = origSet;
          resolve(null);
        }, 5000);
      });
    }

    if (!token) {
      statusEl.style.color = "#f23f43";
      statusEl.innerText = text.tokenFail;
      return;
    }

    statusEl.style.color = "#949ba4";
    statusEl.innerText = text.sending(name);

    try {
      const res = await fetch("https://discord.com/api/v9/hypesquad/online", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ house_id: houseId })
      });

      if (res.status === 204 || res.ok) {
        statusEl.style.color = "#23a55a";
        statusEl.innerText = text.success(name);
        setTimeout(close, 2200);
      } else {
        statusEl.style.color = "#f23f43";
        statusEl.innerText = text.serverError(res.status);
      }
    } catch (err) {
      statusEl.style.color = "#f23f43";
      statusEl.innerText = text.netError;
      console.error(err);
    }
  };

  // ----------------------------------------------------
  // [버튼 렌더링 / BUTTON RENDER]
  // ----------------------------------------------------
  houses.forEach(h => {
    const btn = document.createElement("button");
    Object.assign(btn.style, {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      padding: "18px 8px",
      backgroundColor: "#2b2d31",
      border: `2px solid ${h.color}`,
      borderRadius: "10px",
      cursor: "pointer",
      color: "#f2f3f5",
      transition: "all 0.18s ease"
    });

    btn.onmouseover = () => {
      btn.style.transform = "translateY(-4px)";
      btn.style.backgroundColor = "#35373c";
      btn.style.boxShadow = `0 4px 12px ${h.color}33`;
    };
    btn.onmouseout = () => {
      btn.style.transform = "none";
      btn.style.backgroundColor = "#2b2d31";
      btn.style.boxShadow = "none";
    };

    btn.innerHTML = `
      <img src="${h.img}" alt="${h.name}" style="width: 44px; height: 44px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));" />
      <span style="font-weight: 700; font-size: 15px; color: ${h.color};">${h.name}</span>
      <span id="sub-${h.id}" style="font-size: 11px; color: #b5bac1;">${i18n[currentLang].subtitles[h.id]}</span>
    `;

    btn.onclick = () => executeJoin(h.id, h.name);
    cardsContainer.appendChild(btn);
  });
})();