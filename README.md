# Kowshin V — VLSI Portfolio

Semiconductor-themed personal portfolio: RTL design, ASIC flow, Tiny Tapeout (APTPU) and embedded projects.

**Live site:** https://kowshinv.github.io  *(after you publish — see below)*

## Publish on GitHub Pages
1. Create a repository named **`kowshinV.github.io`** (public).
2. Upload everything from this folder to the repository root (so `index.html` is at the top level).
3. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. Wait 1–2 minutes — your site is live at `https://kowshinv.github.io`.

(Any other repository name also works; the URL becomes `https://kowshinv.github.io/<repo-name>/`.)

## Structure
```
index.html            main page
style.css / script.js theme and behaviour
*-certificates.html   certificate galleries
assets/               images, certificates, project files, resume
```

## Edit your content
- Text, links, projects: `index.html`
- Colours: variables at the top of `style.css` (`--cyan`, `--green`, `--gold`)
- Resume: replace `assets/resume/resume.pdf` (keep the same file name)
- Profile photo: replace `assets/images/profile.png` (square, transparent background works best)
