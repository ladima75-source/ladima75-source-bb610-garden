(() => {
  const stories = [
    { key: "ugroove-irrigation", selector: '#blueberry img[src*="ugroove"]', parent: ".product-image", mode: "replace" }
  ];

  const captions = {
    "ugroove-irrigation": "Квадратний горщик 40 л з U-пазами та бічними отворами"
  };

  const makeVideo = (key) => {
    const figure = document.createElement("figure");
    figure.className = "plantlogic-video-story";
    figure.dataset.videoStory = key;
    const video = document.createElement("video");
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "none";
    video.poster = "/media/video/" + key + "-poster.webp";
    video.setAttribute("aria-label", "Офіційний відеоматеріал PlantLogic");
    [["webm","video/webm"],["mp4","video/mp4"]].forEach(([ext,type]) => {
      const source = document.createElement("source");
      source.type = type;
      source.dataset.src = "/media/video/" + key + "." + ext;
      video.append(source);
    });
    figure.append(video);
    if (captions[key]) {
      const caption = document.createElement("figcaption");
      caption.className = "plantlogic-video-caption";
      caption.textContent = captions[key];
      figure.append(caption);
      video.setAttribute("aria-label", captions[key]);
    }
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

  const mountOne = (story) => {
    if (document.querySelector('[data-video-story="' + story.key + '"]')) return true;
    let target = document.querySelector(story.selector);
    if (!target) return false;
    if (story.parent) target = target.closest(story.parent);
    if (!target) return false;
    const figure = makeVideo(story.key);
    if (story.mode === "replace") {
      target.querySelectorAll("img").forEach((img) => img.style.display = "none");
      target.querySelectorAll(".photo-pill,.drainage-flow,.image-coordinate,.image-tag,.product-volume,.round-plus").forEach((el) => el.style.display = "none");
      target.prepend(figure);
      target.classList.add("has-plantlogic-video");
    } else if (story.mode === "before") {
      target.before(figure);
    } else {
      target.after(figure);
    }
    const video = figure.querySelector("video");
    observer ? observer.observe(video) : hydrate(video);
    return true;
  };

  let tries = 0;
  const timer = setInterval(() => {
    const ready = stories.every(mountOne);
    tries += 1;
    if (ready || tries > 80) clearInterval(timer);
  }, 180);
})();