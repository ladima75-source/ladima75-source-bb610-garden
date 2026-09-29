from pathlib import Path
import hashlib
import json
import subprocess

CAPTION = "Квадратний горщик 40 л з U-пазами та бічними отворами"

js_path = Path("assets/video-storytelling.js")
js = js_path.read_text(encoding="utf-8")
if CAPTION not in js:
    marker = "  const makeVideo = (key) => {"
    captions = (
        '  const captions = {\n'
        '    "ugroove-irrigation": "' + CAPTION + '"\n'
        '  };\n\n'
    )
    if marker not in js:
        raise SystemExit("makeVideo marker not found")
    js = js.replace(marker, captions + marker, 1)
    old = '    figure.append(video);\n    return figure;'
    new = (
        '    figure.append(video);\n'
        '    if (captions[key]) {\n'
        '      const caption = document.createElement("figcaption");\n'
        '      caption.className = "plantlogic-video-caption";\n'
        '      caption.textContent = captions[key];\n'
        '      figure.append(caption);\n'
        '      video.setAttribute("aria-label", captions[key]);\n'
        '    }\n'
        '    return figure;'
    )
    if old not in js:
        raise SystemExit("figure append marker not found")
    js = js.replace(old, new, 1)
    js_path.write_text(js, encoding="utf-8")

css_path = Path("assets/video-storytelling.css")
css = css_path.read_text(encoding="utf-8")
token = "/* U-GROOVE APPROVED INSERT */"
if token not in css:
    css += """
/* U-GROOVE APPROVED INSERT */
[data-video-story="ugroove-irrigation"]{background:#edf0eb}
[data-video-story="ugroove-irrigation"] video{object-fit:contain;background:#edf0eb}
.plantlogic-video-caption{position:absolute;left:10px;right:10px;bottom:10px;z-index:3;margin:0;padding:7px 9px;border-radius:4px;background:rgba(8,18,13,.68);color:#fff;font-size:12px;font-weight:650;line-height:1.28;letter-spacing:-.01em;text-align:left;backdrop-filter:blur(3px)}
@media(max-width:760px){.plantlogic-video-caption{left:8px;right:8px;bottom:8px;padding:7px 8px;font-size:12px;line-height:1.25}}
"""
    css_path.write_text(css, encoding="utf-8")

def duration(path):
    return round(float(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=nw=1:nk=1", str(path)
    ], text=True).strip()), 6)

mp4 = Path("media/video/ugroove-irrigation.mp4")
webm = Path("media/video/ugroove-irrigation.webm")
poster = Path("media/video/ugroove-irrigation-poster.webp")
for path in (mp4, webm, poster):
    if not path.exists() or path.stat().st_size == 0:
        raise SystemExit(f"missing output: {path}")

mp4_d = duration(mp4)
webm_d = duration(webm)
if not 7.90 <= mp4_d <= 7.99:
    raise SystemExit(f"bad mp4 duration: {mp4_d}")
if not 7.90 <= webm_d <= 7.99:
    raise SystemExit(f"bad webm duration: {webm_d}")

master = Path(".master/plantlogic-40l-ugroove-master.mp4")
source = Path("media/sources.json")
data = json.loads(source.read_text(encoding="utf-8"))
data["video_loops"]["ugroove-irrigation"] = {
    "source": "PlantLogic official MASTER / Google Drive",
    "source_id": "2tR1Wyt3JA4",
    "title": "Plantlogic® | New 40L Square Pot with U-grooves & Side holes",
    "master_drive_url": "https://drive.google.com/file/d/1mQUXl1dzu4GiqsmRqJrsJZ6Fz5a6DAYk/view",
    "master_file_name": "20260604 - Plantlogic® ｜ New 40L Square Pot with U-grooves & Side holes [2tR1Wyt3JA4].mp4",
    "master_sha256": hashlib.sha256(master.read_bytes()).hexdigest(),
    "clip_start_seconds": 5,
    "clip_end_seconds": 12.97,
    "duration_seconds": 7.97,
    "final_mp4_duration_seconds": mp4_d,
    "final_webm_duration_seconds": webm_d,
    "caption_uk": CAPTION,
    "files": [
        "media/video/ugroove-irrigation.webm",
        "media/video/ugroove-irrigation.mp4",
        "media/video/ugroove-irrigation-poster.webp",
    ],
}
source.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
