# Abid Ahmad — Premium 3D Artist Portfolio

Static, multi-page portfolio site for Abid Ahmad (3D artist & data annotation specialist).

## Sources consolidated
- Behance: https://www.behance.net/abidahmadullah3d
- Fiverr: https://www.fiverr.com/abidahmadullah
- Upwork: https://www.upwork.com/freelancers/~01fbfe8b749241e0c5
- Official site: https://abidahmad3d.org

## Structure
- `index.html` — main one-page portfolio
- `projects/` — project case study pages
- `assets/` — downloaded, owned portfolio images
- `styles.css`, `script.js`
- `sitemap.xml`, `robots.txt`

## Preview locally
```
cd "C:\Users\WORK\abid-portfolio"
python -m http.server 8080
```
Then open http://localhost:8080

## Contact form
The form submits via the visitor's email client (mailto). To enable server-side delivery, replace the form action with a Formspree/Getform endpoint and re-add the field IDs. See the form in index.html.

## Placeholders to complete
- Verified software list (Blender/Maya/ZBrush etc.) — not stated in accessible sources; update Skills section.
- Verified testimonials/ratings — none accessible; section omitted.
- Detailed briefs/timelines for case studies — not available; pages use factual placeholders.
- Fiverr/Upwork pricing and ratings — inaccessible behind auth; confirm before publishing.
- Download higher-resolution source renders if available.

## Deploy
Upload folder contents to any static host (Netlify, GitHub Pages, Vercel, Hostinger) or point abidahmad3d.org at this build. Configure canonical domain and submit sitemap.xml.