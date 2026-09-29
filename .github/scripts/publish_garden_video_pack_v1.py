from pathlib import Path
import json, os, subprocess

VERSION = "20260929-pack-v1"
PACK_URL = "https://drive.google.com/drive/folders/1aHjGhLXAdYLU3ZgPXw4Em7FcojjGMLPx"

stories_js = r'''(() => {
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
})();'''

stories_css = r'''.plantlogic-video-story{margin:0;position:relative;overflow:hidden;background:#0f2119;border-radius:5px;aspect-ratio:16/9}
.plantlogic-video-story video{display:block;width:100%;height:100%;object-fit:contain;background:#0f2119}
.has-plantlogic-video{position:relative}
.has-plantlogic-video>.plantlogic-video-story{position:absolute;inset:0;z-index:1;border-radius:inherit}
.has-plantlogic-video>.plantlogic-video-story video{height:100%;object-fit:contain;background:#edf0eb}
.garden-video-band{background:#10261d;color:#f4f6f1;padding-block:58px 72px}
.garden-video-band .video-band-head{display:flex;justify-content:space-between;align-items:center;gap:24px;margin-bottom:22px;font-size:12px;color:#bac7be}
.garden-video-band .eyebrow{color:#d7ff79}
.garden-video-band .plantlogic-video-story{width:100%;aspect-ratio:12/5;border-radius:8px}
.garden-video-band .plantlogic-video-story video{object-fit:contain;background:#10261d}
.higrow-section{background:#eef1e8}
.higrow-grid{display:grid;grid-template-columns:minmax(280px,.72fr) minmax(0,1.28fr);gap:72px;align-items:center}
.higrow-copy h2{font-size:clamp(2.3rem,4vw,4.6rem);line-height:1.02;letter-spacing:-.055em;margin:20px 0 24px}
.higrow-copy p{max-width:520px;color:#5e6d63;font-size:17px;line-height:1.7}
.higrow-media .plantlogic-video-story{aspect-ratio:12/5;border-radius:8px}
.higrow-media .plantlogic-video-story video{object-fit:contain;background:#10261d}
@media(max-width:900px){
  .garden-video-band{padding-block:46px 56px}
  .garden-video-band .video-band-head{align-items:flex-start;flex-direction:column;gap:6px}
  .garden-video-band .plantlogic-video-story,.higrow-media .plantlogic-video-story{aspect-ratio:16/9}
  .higrow-grid{grid-template-columns:1fr;gap:32px}
}
@media(max-width:760px){
  .garden-video-band{padding-block:36px 44px}
  .garden-video-band .plantlogic-video-story,.higrow-media .plantlogic-video-story{aspect-ratio:16/9}
  .higrow-copy h2{font-size:clamp(2.2rem,10vw,3.35rem)}
}
'''

Path("assets/video-storytelling.js").write_text(stories_js, encoding="utf-8")
Path("assets/video-storytelling.css").write_text(stories_css, encoding="utf-8")

index = Path("index.html").read_text(encoding="utf-8")
import re
index = re.sub(r'<link rel="stylesheet" href="/assets/video-storytelling\.css(?:\?[^"]*)?">', f'<link rel="stylesheet" href="/assets/video-storytelling.css?v={VERSION}">', index)
index = re.sub(r'<script defer src="/assets/video-storytelling\.js(?:\?[^"]*)?"></script>', f'<script defer src="/assets/video-storytelling.js?v={VERSION}"></script>', index)
Path("index.html").write_text(index, encoding="utf-8")

def ffprobe(path):
    return json.loads(subprocess.check_output([
        "ffprobe","-v","error","-show_entries","format=duration,size",
        "-show_entries","stream=width,height,codec_name",
        "-of","json",str(path)
    ], text=True))

items = {
    "corporate-quality": {
        "source_id":"3uS_RvFK5pQ",
        "drive_file_id":"1fhikwZXTvfeYl-uuq0yqHc6J96vUcfbA",
        "drive_file_name":"01_corporate_quality_ua.mp4",
        "poster_file_name":"01_corporate_quality_ua-poster.jpg",
        "placement":"after #offer / before technology concept",
    },
    "zephyr-v2-install": {
        "source_id":"qIm_5pw8CJA",
        "drive_file_id":"1DBeDsRunH4z4zQNJ1i0ekJCvXEtncWwm",
        "drive_file_name":"02_zephyr_v2_install_ua.mp4",
        "poster_file_name":"02_zephyr_v2_install_ua-poster.jpg",
        "placement":"Blueberry / Zephyr V2 product visual",
    },
    "ugroove-irrigation": {
        "source_id":"2tR1Wyt3JA4",
        "drive_file_id":"167CtVbrkZJu5KYwg4nXRAkuDb7d5ghoT",
        "drive_file_name":"03_40l_ugroove_ua_trimmed.mp4",
        "poster_file_name":"03_40l_ugroove_ua-poster.jpg",
        "placement":"Blueberry / 40L U-Groove product visual",
        "trimmed_version_confirmed": True,
    },
    "higrow-strawberry": {
        "source_id":"cjwHWuPH-H8",
        "drive_file_id":"1mFK2Z057EzW6a08pmJvPaxfkGXXqBT60",
        "drive_file_name":"04_higrow_strawberry_ua.mp4",
        "poster_file_name":"04_higrow_strawberry_ua-poster.jpg",
        "placement":"after Lysimeter / compact Strawberry Hi-Grow section",
    },
}

source_path=Path("media/sources.json")
data=json.loads(source_path.read_text(encoding="utf-8"))
video_loops={}
for key,meta in items.items():
    mp4=Path("media/video")/(key+".mp4")
    webm=Path("media/video")/(key+".webm")
    poster=Path("media/video")/(key+"-poster.webp")
    a=ffprobe(mp4); b=ffprobe(webm)
    stream=a["streams"][0]
    meta.update({
        "source":"BB610 Garden Video Pack V1",
        "pack_drive_url":PACK_URL,
        "mp4_size_bytes":mp4.stat().st_size,
        "webm_size_bytes":webm.stat().st_size,
        "poster_size_bytes":poster.stat().st_size,
        "duration_seconds":round(float(a["format"]["duration"]),6),
        "webm_duration_seconds":round(float(b["format"]["duration"]),6),
        "width":stream["width"],
        "height":stream["height"],
        "files":[str(webm),str(mp4),str(poster)]
    })
    video_loops[key]=meta
data["video_loops"]=video_loops
source_path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
