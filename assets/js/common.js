/**
 * common.js - 全局公共功能
 * 《最后的信号》- 一个父亲跨越12年的爱
 *
 * 线索：memory_00 的工号后缀 00 代表 0003
 * 密码提示：天涯(TY) 高德(GD) 微信(WX)
 */

(function () {
  'use strict';

  // ========== 信号连接动画 ==========
  function showSignalBoot() {
    const overlay = document.createElement('div');
    overlay.id = 'signal-boot-overlay';
    overlay.innerHTML = `
      <div class="boot-content">
        <div class="boot-icon">📡</div>
        <div class="boot-text" id="boot-text">正在连接信号源...</div>
        <div class="boot-bars">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>`;
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;background:#0a0a1a;
      display:flex;align-items:center;justify-content:center;
      flex-direction:column;transition:opacity .8s;`;
    document.body.appendChild(overlay);

    const bars = overlay.querySelectorAll('.boot-bars span');
    const text = overlay.querySelector('#boot-text');
    let i = 0;
    const interval = setInterval(() => {
      if (i < bars.length) {
        bars[i].style.cssText = 'background:#e8a87c;box-shadow:0 0 10px #e8a87c;';
        i++;
      } else {
        clearInterval(interval);
        text.textContent = '信号强度：▓▓▓▓▓ 满格';
        text.style.color = '#e8a87c';
        setTimeout(() => {
          overlay.style.opacity = '0';
          setTimeout(() => overlay.remove(), 800);
        }, 600);
      }
    }, 250);
  }

  // ========== 全局时间显示 ==========
  function updateClock() {
    const clockEl = document.getElementById('global-clock');
    if (!clockEl) return;
    const now = new Date(2026, 7, 23, new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
    const pad = n => String(n).padStart(2, '0');
    clockEl.textContent = `2026年8月23日 ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
  }

  // ========== 页面标题闪烁 ==========
  function initTitleFlicker() {
    const originalTitle = document.title;
    const flickerTitles = ['信号满格', '爸爸在', '📡 正在接收...', originalTitle];
    let idx = 0;
    setInterval(() => {
      if (document.hidden) {
        idx = (idx + 1) % flickerTitles.length;
        document.title = flickerTitles[idx];
      } else {
        document.title = originalTitle;
      }
    }, 3000);
  }

  // ========== 彩蛋：输入 dad / 爸爸 ==========
  function initDadEasterEgg() {
    let buf = '';
    let resetTimer;
    document.addEventListener('keydown', (e) => {
      // Don't trigger when typing in input fields
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      buf += e.key.toLowerCase();
      if (buf.length > 10) buf = buf.slice(-10);
      if (buf.includes('dad') || buf.includes('爸爸')) {
        buf = '';
        showSignalIcon();
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { buf = ''; }, 2000);
    });
  }

  function showSignalIcon() {
    const icon = document.createElement('div');
    icon.textContent = '📡';
    icon.style.cssText = `
      position:fixed;bottom:20px;right:20px;z-index:99998;
      font-size:2rem;animation:signalPulse .5s ease-in-out 3;
      pointer-events:none;`;
    if (!document.getElementById('signal-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'signal-pulse-style';
      style.textContent = `@keyframes signalPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.5}}`;
      document.head.appendChild(style);
    }
    document.body.appendChild(icon);
    setTimeout(() => icon.remove(), 1600);
  }

  // ========== Konami Code 彩蛋 ==========
  function initKonami() {
    const pattern = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let pos = 0;
    document.addEventListener('keydown', (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
      if (e.key === pattern[pos] || e.key.toLowerCase() === pattern[pos]) {
        pos++;
        if (pos === pattern.length) {
          pos = 0;
          showKonamiCard();
        }
      } else {
        pos = 0;
      }
    });
  }

  function showKonamiCard() {
    const card = document.createElement('div');
    card.innerHTML = `
      <div style="font-size:3rem;margin-bottom:1rem;">📡</div>
      <div style="font-size:1.4rem;color:#e8a87c;margin-bottom:.5rem;">小夏，爸爸为你骄傲</div>
      <div style="font-size:.85rem;color:#888;">—— memory_00，2014年春</div>`;
    card.style.cssText = `
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      z-index:99999;background:#1a1a2e;border:2px solid #e8a87c;
      border-radius:16px;padding:2.5rem 3rem;text-align:center;
      box-shadow:0 0 40px rgba(232,168,124,.3);animation:cardPop .4s ease-out;
      max-width:90vw;`;
    if (!document.getElementById('konami-style')) {
      const style = document.createElement('style');
      style.id = 'konami-style';
      style.textContent = `@keyframes cardPop{0%{transform:translate(-50%,-50%) scale(.5);opacity:0}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}`;
      document.head.appendChild(style);
    }
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99998;';
    overlay.onclick = () => { overlay.remove(); card.remove(); };
    document.body.appendChild(overlay);
    document.body.appendChild(card);
  }

  // ========== 鼠标信号波纹 ==========
  function initSignalRipple() {
    let rippleCount = 0;
    document.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.97 && rippleCount < 1) {
        rippleCount++;
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position:fixed;left:${e.clientX}px;top:${e.clientY}px;
          width:4px;height:4px;border-radius:50%;
          border:1px solid rgba(232,168,124,.25);
          pointer-events:none;z-index:99990;
          animation:rippleFade 1.2s ease-out forwards;`;
        if (!document.getElementById('ripple-style')) {
          const style = document.createElement('style');
          style.id = 'ripple-style';
          style.textContent = `@keyframes rippleFade{0%{width:4px;height:4px;opacity:.6}100%{width:80px;height:80px;opacity:0;margin-left:-38px;margin-top:-38px}}`;
          document.head.appendChild(style);
        }
        document.body.appendChild(ripple);
        setTimeout(() => { ripple.remove(); rippleCount--; }, 1200);
      }
    });
  }

  // ========== 控制台温暖提示 ==========
  function consoleGreeting(pageName) {
    const greetings = {
      blog: '%c📡 记忆碎片\n%c小夏，如果你看到这里，说明你和爸爸一样喜欢刨根问底。\n信号满格，爸爸在。',
      forum: '%c📡 天芽论坛\n%c别查了，他只是在不远处看着你。\n—— memory_00',
      map: '%c📡 高嘚地图\n%c坐标 39.903, 116.4\n第一个信号从这里发出，1998年。',
      wechat: '%c📡 威信\n%c"信号满格！爸爸就知道你行。"',
      email: '%c📡 安全邮箱\n%c密码很简单，就是你常说的那三个词的首字母。\n爸爸打错了字，你别笑。',
      archive: '%c📡 加密存档\n%c用户名: memory_00  密码: TYGDWX\n爸爸的信号，永远满格。'
    };
    const msg = greetings[pageName] || greetings.blog;
    console.log(msg, 'font-size:20px;color:#e8a87c;font-weight:bold;', 'font-size:13px;color:#888;');
  }

  // ========== 本地存储辅助 ==========
  const storage = {
    get(key, def) {
      try { return JSON.parse(localStorage.getItem('arg_' + key)) ?? def; }
      catch { return def; }
    },
    set(key, val) {
      try { localStorage.setItem('arg_' + key, JSON.stringify(val)); } catch {}
    }
  };

  // ========== 深色/浅色模式 ==========
  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    const saved = storage.get('theme', 'dark');
    document.documentElement.setAttribute('data-theme', saved);
    toggle.textContent = saved === 'dark' ? '☀️' : '🌙';
    toggle.onclick = () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      storage.set('theme', next);
      toggle.textContent = next === 'dark' ? '☀️' : '🌙';
    };
  }

  // ========== 返回顶部 ==========
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.style.opacity = window.scrollY > 300 ? '1' : '0';
      btn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
    });
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========== 全局导航栏毛玻璃 ==========
  function initNavBlur() {
    const nav = document.querySelector('.navbar, .global-nav, header');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.style.backdropFilter = 'blur(12px)';
        nav.style.background = 'rgba(26,26,46,.85)';
      } else {
        nav.style.backdropFilter = 'none';
        nav.style.background = '';
      }
    });
  }

  // ========== 初始化 ==========
  document.addEventListener('DOMContentLoaded', () => {
    // Boot animation only on first visit per session
    if (!sessionStorage.getItem('arg_booted')) {
      sessionStorage.setItem('arg_booted', '1');
      showSignalBoot();
    }
    initClock();
    initTitleFlicker();
    initDadEasterEgg();
    initKonami();
    initSignalRipple();
    initThemeToggle();
    initBackToTop();
    initNavBlur();

    // Page-specific greeting
    const page = document.body.dataset.page || 'blog';
    consoleGreeting(page);
  });

  // Expose utilities globally
  window.ARG = { storage, showSignalIcon, consoleGreeting };
})();
