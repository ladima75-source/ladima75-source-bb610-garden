(() => {
  const VERSION = "20260929-pack-v1";
  const stories = [
    { key: "corporate-quality", type: "band", selector: "#offer" },
    { key: "zephyr-v2-install", type: "product", selector: '#blueberry img[src*="zephyr"]', parent: ".product-image" },
    { key: "ugroove-irrigation", type: "product", selector: '#blueberry img[src*="ugroove"]', parent: ".product-image" },
    { key: "higrow-strawberry", type: "section", selector: "#lysimeter" }
  ];

  const makeVideo = (story) => {
    const figure = document.createElement("figure");
    figure.className = "plantlogic-video-story plantlogic-video-" + story.type;
    figure.dataset.videoStory = story.key;

    const video = document.createElement("video");
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "none";
    video.poster = "/media/video/" + story.key + "-poster.webp?v=" + VERSION;
    video.setAttribute("aria-label", "BB610 Garden / PlantLogic video");

    [["webm","video/webm"],["mp4","video/mp4"]].forEach(([ext,type]) => {
      const source = document.createElement("source");
      source.type = type;
      source.dataset.src = "/media/video/" + story.key + "." + ext + "?v=" + VERSION;
      video.append(source);
    });

    figure.append(video);
    return figure;
  };

  const hydrate = (video) => {
    if (video.dataset.hydrated) return;
    video.querySelectorAll("source[data-src]").forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute("data-src");
    });
    video.dataset.hydrated = "1";
    video.load();
  };

  const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach(({target,isIntersecting}) => {
      if (isIntersecting) {
        hydrate(target);
        if (!matchMedia("(prefers-reduced-motion: reduce)").matches) target.play().catch(() => {});
      } else {
        target.pause();
      }
    });
  }, { rootMargin: "320px 0px", threshold: 0.08 }) : null;

  const observe = (figure) => {
    const video = figure.querySelector("video");
    observer ? observer.observe(video) : hydrate(video);
  };

  const mountProduct = (story, target) => {
    target.querySelectorAll("img").forEach((img) => img.style.display = "none");
    target.querySelectorAll(".product-volume,.round-plus").forEach((el) => el.style.display = "none");
    const figure = makeVideo(story);
    target.prepend(figure);
    target.classList.add("has-plantlogic-video");
    observe(figure);
  };

  const mountCorporate = (story, target) => {
    const section = document.createElement("section");
    section.className = "garden-video-band corporate-video-band section";
    section.id = "corporate-video";
    section.innerHTML = '<div class="wrap"><div class="video-band-head"><span class="eyebrow">PLANTLOGIC / ВИРОБНИЦТВО</span><span>BB610 Garden Video Pack V1</span></div></div>';
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
    section.innerHTML = '<div class="wrap higrow-grid"><div class="higrow-copy"><span class="eyebrow">ПОЛУНИЦЯ / HI-GROW</span><h2>Hi-Grow — система для професійного вирощування полуниці</h2><p>Піднята система вирощування, де робоча зона культури організована над рівнем ґрунту.</p></div><div class="higrow-media"></div></div>';
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

  let tries = 0;
  const timer = setInterval(() => {
    const ready = stories.every(mountOne);
    tries += 1;
    if (ready || tries > 80) clearInterval(timer);
  }, 180);
})();