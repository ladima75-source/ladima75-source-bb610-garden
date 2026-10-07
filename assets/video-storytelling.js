(() => {
  const VERSION = "20260929-video-v3";
  const stories = [
    { key: "zephyr-v2-install", type: "product", selector: '#blueberry img[src*="zephyr"]', parent: ".product-image", label: "Zephyr V2 / assembly" },
    { key: "ugroove-irrigation", type: "product", selector: '#blueberry img[src*="ugroove"]', parent: ".product-image", label: "U-Groove / irrigation" },
    { key: "higrow-strawberry", type: "section", selector: "#lysimeter", label: "Hi-Grow / strawberry" }
  ];

  const prefersReduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setState = (figure, state) => {
    figure.dataset.state = state;
    const button = figure.querySelector(".video-play-button");
    if (!button) return;
    button.setAttribute("aria-label", state === "playing" ? "Призупинити відео" : "Відтворити відео");
    button.innerHTML = state === "playing"
      ? '<span class="video-pause-icon"><i></i><i></i></span><em>Pause</em>'
      : '<span class="video-play-icon"></span><em>Play</em>';
  };

  const tryPlay = async (video) => {
    const figure = video.closest(".plantlogic-video-story");
    if (!figure || prefersReduced()) {
      if (figure) setState(figure, "paused");
      return false;
    }
    try {
      await video.play();
      setState(figure, "playing");
      return true;
    } catch (error) {
      setState(figure, "blocked");
      return false;
    }
  };

  const makeVideo = (story) => {
    const figure = document.createElement("figure");
    figure.className = "plantlogic-video-story plantlogic-video-" + story.type;
    figure.dataset.videoStory = story.key;
    figure.dataset.state = "loading";

    const video = document.createElement("video");
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.poster = "/media/video/" + story.key + "-poster.webp?v=" + VERSION;
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("controlslist", "nodownload noplaybackrate noremoteplayback");
    video.setAttribute("aria-label", story.label || "PlantLogic video");
    video.disablePictureInPicture = true;

    [["mp4","video/mp4"],["webm","video/webm"]].forEach(([ext,type]) => {
      const source = document.createElement("source");
      source.type = type;
      source.src = "/media/video/" + story.key + "." + ext + "?v=" + VERSION;
      video.append(source);
    });

    const shade = document.createElement("span");
    shade.className = "video-shade";
    shade.setAttribute("aria-hidden", "true");

    const caption = document.createElement("figcaption");
    caption.innerHTML = '<span>PLANTLOGIC / MOTION</span><strong>' + (story.label || "Engineering in motion") + '</strong>';

    const button = document.createElement("button");
    button.type = "button";
    button.className = "video-play-button";
    button.setAttribute("aria-label", "Відтворити відео");
    button.innerHTML = '<span class="video-play-icon"></span><em>Play</em>';

    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (video.paused) {
        const played = await tryPlay(video);
        if (!played) {
          video.controls = true;
          video.load();
        }
      } else {
        video.pause();
        setState(figure, "paused");
      }
    });

    video.addEventListener("playing", () => setState(figure, "playing"));
    video.addEventListener("pause", () => {
      if (figure.dataset.visible === "1") setState(figure, "paused");
    });
    video.addEventListener("canplay", () => {
      figure.classList.add("is-ready");
      if (figure.dataset.visible === "1") tryPlay(video);
    });
    video.addEventListener("loadeddata", () => figure.classList.add("is-ready"));
    video.addEventListener("error", () => {
      figure.classList.add("is-error");
      video.controls = true;
      setState(figure, "error");
    });

    figure.append(video, shade, caption, button);
    return figure;
  };

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(({target,isIntersecting}) => {
          const figure = target.closest(".plantlogic-video-story");
          if (!figure) return;
          figure.dataset.visible = isIntersecting ? "1" : "0";
          if (isIntersecting) {
            tryPlay(target);
          } else {
            target.pause();
          }
        });
      }, { rootMargin: "220px 0px", threshold: 0.12 })
    : null;

  const observe = (figure) => {
    const video = figure.querySelector("video");
    if (observer) {
      observer.observe(video);
    } else {
      figure.dataset.visible = "1";
      tryPlay(video);
    }
  };

  const mountProduct = (story, target) => {
    target.querySelectorAll("img").forEach((img) => img.style.display = "none");
    target.querySelectorAll(".product-volume,.round-plus").forEach((el) => el.style.display = "none");
    const figure = makeVideo(story);
    target.prepend(figure);
    target.classList.add("has-plantlogic-video");
    const card = target.closest(".product-card");
    if (card) {
      card.classList.add("has-product-video-story");
      if (card.parentElement) card.parentElement.classList.add("has-product-video-grid-item");
    }
    observe(figure);
  };

  const mountCorporate = (story, target) => {
    const section = document.createElement("section");
    section.className = "garden-video-band corporate-video-band section";
    section.id = "corporate-video";
    section.innerHTML =
      '<div class="wrap">' +
        '<div class="video-band-head">' +
          '<div><span class="eyebrow">PLANTLOGIC / MOTION STUDY</span><h2>Конструкція в роботі.</h2></div>' +
          '<p>Монтаж, геометрія, полив і робота системи — у коротких технологічних фрагментах.</p>' +
        '</div>' +
      '</div>';
    const inner = section.querySelector(".wrap");
    const figure = makeVideo(story);
    inner.append(figure);
    target.after(section);
    observe(figure);
  };

  const mountHiGrow = (story, target) => {
    const section = document.createElement("section");
    section.className = "higrow-section section";
    section.id = "strawberry";
    section.innerHTML =
      '<div class="wrap higrow-grid">' +
        '<div class="higrow-copy">' +
          '<span class="eyebrow">ПОЛУНИЦЯ / HI-GROW</span>' +
          '<h2>Hi-Grow у роботі.</h2>' +
          '<p>У відео видно підняту виробничу зону, модульну несучу конструкцію та окремий дренажний контур.</p>' +
        '</div>' +
        '<div class="higrow-media"></div>' +
      '</div>';
    const media = section.querySelector(".higrow-media");
    const figure = makeVideo(story);
    media.append(figure);
    target.after(section);
    observe(figure);
  };

  const mountOne = (story) => {
    if (document.querySelector('[data-video-story="' + story.key + '"]')) return true;
    let target = document.querySelector(story.selector);
    if (!target) return false;
    if (story.parent) target = target.closest(story.parent);
    if (!target) return false;

    if (story.type === "product") mountProduct(story, target);
    else if (story.type === "band") mountCorporate(story, target);
    else if (story.type === "section") mountHiGrow(story, target);
    return true;
  };

  const boot = () => {
    stories.forEach(mountOne);
    [240, 720, 1600, 3200].forEach((delay) => {
      setTimeout(() => stories.forEach(mountOne), delay);
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();