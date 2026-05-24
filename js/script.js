const container = document.querySelector(".hero-container");
const staticImg = document.getElementById("staticImage");
const openVideo = document.getElementById("openVideo");
const fireVideo = document.getElementById("fireVideo");
const transitionVideo = document.getElementById("transitionVideo");
const heroText = document.querySelector(".hero-text");
const readyText = document.querySelector(".system-ready");
const mainTitle = document.querySelector(".main-title");
const globalNav = document.getElementById("global-nav");
const sectionAbout = document.getElementById("about");
const profVideo = document.getElementById("profVideo");
const skipText = document.querySelector(".skip-text");
const clickText = document.querySelector(".click-text");
const uxCard = document.getElementById("uxCard");
const assistToggleBtn = document.getElementById("assistToggleBtn");
const slider = document.getElementById("baSlider");

let leaveTimer = null;
let isFireVideoPlaying = false; // fireVideo が再生中かどうかのフラグ
// タッチデバイス（スマホ）かどうかの判定フラグ
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

// アニメーションを一括で開始する共通関数
function startHeroAnimation() {
  staticImg.style.opacity = "0";
  clickText.style.display = "none";
  skipText.style.display = "block";

  openVideo.style.display = "block";
  openVideo.muted = true; // スマホの自動再生には必須
  openVideo.play().catch((err) => console.log("再生エラー防止:", err));

  requestAnimationFrame(() => {
    openVideo.style.opacity = "1";
  });

  container.style.cursor = "progress";
  heroText.style.opacity = "1";
  mainTitle.style.opacity = "0";
  readyText.style.opacity = "1";
  readyText.classList.remove("blink-animation");
  void readyText.offsetWidth;
  readyText.classList.add("blink-animation");

  // 一定時間後にループ動画へ遷移する既存のタイマー
  // if (!isFireVideoPlaying) {
  //   setTimeout(() => {
  //     if (openVideo.style.opacity === "1") {
  //       transitionToLoop();
  //     }
  //   }, 4500); // Change.webmの長さに合わせて調整してください
  // }
}
// 1. マウスホバーで開始
// --- トリガーの分岐 ---
if (isTouchDevice) {
  // スマホの場合は、画面が開いて1秒後に自動で演出を開始させる
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(startHeroAnimation, 1000);
  });
} else {
  // PCの場合は、従来通りマウスが入った時に開始
  container.addEventListener("mouseenter", () => {
    if (leaveTimer) {
      clearTimeout(leaveTimer);
      leaveTimer = null;
    }
    startHeroAnimation();
  });
}

// 2. 開眼動画が終わったら炎動画へ
openVideo.addEventListener("ended", () => {
  openVideo.style.opacity = "0";
  skipText.style.display = "none";
  clickText.style.display = "block";

  fireVideo.style.display = "block";
  requestAnimationFrame(() => {
    fireVideo.style.opacity = "1";
  });

  setTimeout(() => {
    openVideo.style.display = "none";
  }, 400);

  container.style.cursor = "alias"; // クリックできることを示す
  readyText.style.opacity = "0";
  mainTitle.style.opacity = "1";

  fireVideo.play();
  isFireVideoPlaying = true; // フラグを立てる
});

// 3. マウスを離したら 0.4秒かけてフェードアウト → その後に停止・リセット
container.addEventListener("mouseleave", () => {
  openVideo.style.opacity = "0";
  fireVideo.style.opacity = "0";
  heroText.style.opacity = "0";

  leaveTimer = setTimeout(() => {
    openVideo.pause();
    openVideo.currentTime = 0;
    openVideo.style.display = "none";

    fireVideo.pause();
    fireVideo.currentTime = 0;
    fireVideo.style.display = "none";

    staticImg.style.opacity = "1";
    isFireVideoPlaying = false; // フラグをリセット

    leaveTimer = null;
  }, 400);
});

// 4. fireVideo 再生中にクリックしたら transitionVideo を再生
container.addEventListener("click", () => {
  if (!isFireVideoPlaying) {
    openVideo.currentTime = 5;
    return;
  }

  if (isFireVideoPlaying) {
    fireVideo.currentTime = 4.5;
  }

  // 既存の動画・テキストをすべてフェードアウト
  fireVideo.style.opacity = "0";
  heroText.style.opacity = "0";

  setTimeout(() => {
    fireVideo.pause();
    fireVideo.style.display = "none";
    staticImg.style.display = "none";
    staticImg.style.opacity = "0";
  }, 400);

  // transitionVideo を表示・再生
  transitionVideo.style.display = "block";
  requestAnimationFrame(() => {
    transitionVideo.style.opacity = "1";
  });
  transitionVideo.play();
  isFireVideoPlaying = false;
  container.style.cursor = "default";
});

// 5. transitionVideo 終了後にヒーローを非表示にしてコンテンツを表示
transitionVideo.addEventListener("ended", () => {
  transitionVideo.style.opacity = "0";

  setTimeout(() => {
    container.style.display = "none"; // ヒーローヘッダを隠す

    // コンテンツを表示
    document.getElementById("scrollBarWrapper").style.display = "block";
    const mainContent = document.querySelector(".main-content");
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.display = "block";
      requestAnimationFrame(() => {
        footer.style.opacity = "1";
      });
    }
    if (mainContent) {
      mainContent.style.display = "block";
      requestAnimationFrame(() => {
        mainContent.style.opacity = "1";
      });
    }
  }, 400);
});

// スクロール進捗バー
(function () {
  const fill = document.getElementById("scrollFill");
  const cursor = document.getElementById("scrollCursor");
  const label = document.getElementById("scrollLabel");
  const track = document.getElementById("scrollTrack");

  function updateBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;

    fill.style.height = pct + "%";
    cursor.style.top = "calc(" + pct + "% - 4px)";
    label.textContent = Math.round(pct) + "%";

    const rect = track.getBoundingClientRect();
    label.style.top = rect.top + (pct / 100) * rect.height - 7 + "px";
  }

  window.addEventListener("scroll", updateBar, { passive: true });
  updateBar();
})();

// Intersection Observerの設定
const observerOptions = {
  root: null, // ビューポート（画面）を基準
  threshold: 0, // 1pxでも画面外に出たら発火
};

// 監視時のコールバック関数
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    // ヒーローヘッダーが画面外に出た（交差していない）時
    if (!entry.isIntersecting) {
      globalNav.classList.add("active"); // activeクラスを付与（表示）
    } else {
      globalNav.classList.remove("active"); // activeクラスを削除（非表示）
    }
  });
};

// 監視を開始
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(container);

const profVideoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        profVideo.play(); // 画面に入ったら再生
      } else {
        profVideo.pause(); // 画面から消えたら停止して負荷軽減
      }
    });
  },
  { threshold: 0.2 },
); // 20%画面に入ったら発火

profVideoObserver.observe(sectionAbout);

// スキップ処理を1つの関数にまとめる
function forceSkipToContent() {
  // すでにスキップ済みの場合は何もしない
  if (container.style.display === "none") return;

  // すべての動画を停止・非表示
  [openVideo, fireVideo, transitionVideo].forEach((video) => {
    video.pause();
    video.style.display = "none";
  });
  staticImg.style.display = "none";
  heroText.style.opacity = "0";
  container.style.display = "none"; // ヒーローヘッダーを完全に隠す

  // メインコンテンツとフッターを即座に表示
  document.getElementById("scrollBarWrapper").style.display = "block";
  const mainContent = document.querySelector(".main-content");
  const footer = document.querySelector("footer");

  if (footer) {
    footer.style.display = "block";
    footer.style.opacity = "1";
  }
  if (mainContent) {
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
  }

  // グローバルナビも表示
  globalNav.classList.add("active");

  // スキップ後にAboutセクションへスムーズにスクロールさせる
  sectionAbout.scrollIntoView({ behavior: "smooth" });
}

// マウスホイールの回転を検知してスキップを発火
window.addEventListener(
  "wheel",
  (e) => {
    if (e.deltaY > 0) {
      // 下方向へのスクロールの場合のみ
      forceSkipToContent();
    }
  },
  { passive: true },
);

if (skipText) skipText.addEventListener("click", (e) => {
  e.stopPropagation(); // 予期せぬ暴発を防ぐ
  forceSkipToContent();
});
if (clickText) clickText.addEventListener("click", (e) => {
  e.stopPropagation();
  forceSkipToContent();
});

document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".fade-up-trigger");

  // 画面のどこまでスクロールしたら発火するか（0.4 = 画面の下から40%の位置に入ったら）
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 画面内に入ったら「is-active」クラスを付与してアニメーション開始
        entry.target.classList.add("is-active");
        // 一度発火したら監視を終了（何度もチカチカ動くのを防ぐ）
        observer.unobserve(entry.target);
      }
    });
  }, options);

  if (target) {
    observer.observe(target);
  }
});

if (assistToggleBtn && uxCard) {
  assistToggleBtn.addEventListener("click", () => {
    // クラスの付け外しでモードを切り替える
    uxCard.classList.toggle("accessible-mode");

    // ボタンのテキストを変更
    if (uxCard.classList.contains("accessible-mode")) {
      assistToggleBtn.textContent = "[ Click System: Normal Mode に戻す ]";
    } else {
      assistToggleBtn.textContent = "[ Click System: Assist Mode ]";
    }
  });
}

if (slider) {
  const afterWrapper = document.querySelector(".img-after-wrapper");
  const sliderLine = document.querySelector(".slider-line");
  const sliderButton = document.querySelector(".slider-button");

  slider.addEventListener("input", (e) => {
    const slideValue = e.target.value + "%";
    afterWrapper.style.width = slideValue;
    sliderLine.style.left = slideValue;
    sliderButton.style.left = slideValue;
  });
}
