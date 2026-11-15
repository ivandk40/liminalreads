# idkloves.com 🤍

A curated digital cabinet of personal obsessions, slow rituals, and compendious amusements dredged from the far reaches of the internet.

Built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🏛️ Structure

The website is architected into two core sections:

1. **Section 1: Things I Love** (`src/data/thingsILove.json`)
   - An ongoing, personal canon of everyday artifacts, analog tools, books, coffee rituals, hardware, music, and quiet atmospheres.
   - Interactive in-app editor: click **"+ Add Love"** in the top navigation to add any new favorite item directly from the browser with `localStorage` persistence and a 1-click **Export JSON** feature.

2. **Section 2: Curated Miscellany** (`src/data/curatedGems.json`)
   - Complete migration of **62 curated gems** from *Sherpa’s Miscellany Of Compendious Amusements*.
   - Spanning 13 thematic categories: *Essays (Paul Graham, etc.)*, *The New Yorker (David Grann, etc.)*, *Articles (Wait But Why, Morgan Housel, etc.)*, *Aviation Disasters (Admiral Cloudberg)*, *Sad, Creepy & Disturbing*, *Museum of Reddit*, *Sci-Fi & Philosophy (Ted Chiang)*, *Podcasts (Darknet Diaries)*, *Webcomics (Junji Ito, The Oatmeal)*, and more.
   - Built-in reader modal for longform stories (*The Black Tag*, *Rabies is Scary*, *The Smiling Man*, *On Grief*, *France Is Bacon*, *The Lazy Naval Officer & The Bagel*).
   - "Rabbit Hole" button for random late-night browsing.
   - Live full-text search across titles, authors, and blurbs.
   - Dark mode & light mode toggle with system preference detection.

---

## 🚀 Quick Start (Local Development)

```bash
cd idkloves
npm install
npm run dev
```

Visit `http://localhost:5173` to view the site.

---

## 🌐 Deploying to `idkloves.com`

You can host this site for **\$0/month** with zero backend maintenance.

### Option 1: Vercel (Recommended — Takes 60 Seconds)

1. Install the Vercel CLI or connect your GitHub repo:
   ```bash
   cd idkloves
   npx vercel
   ```
2. Accept the default prompts. Vercel will build and deploy your site to an instant URL.
3. In the Vercel dashboard:
   - Go to **Project Settings** → **Domains**.
   - Enter `idkloves.com` and `www.idkloves.com`.
4. In your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains, etc.), set up your DNS records:
   - **Type A**: `@` → `76.76.21.21`
   - **Type CNAME**: `www` → `cname.vercel-dns.com`

### Option 2: Cloudflare Pages / Netlify / GitHub Pages

1. Build the static production bundle:
   ```bash
   npm run build
   ```
   This generates the pure static files in the `dist/` directory.
2. Drag and drop the `dist` folder into Netlify Drop or Cloudflare Pages, or push to GitHub and set the custom domain in your repo settings.

---

## ✍️ Adding or Editing Items

- **Things I Love**: Edit `src/data/thingsILove.json` or use the "+ Add Love" button in the web UI.
- **Curated Miscellany**: Edit `src/data/curatedGems.json`. Each entry supports `title`, `author`, `description`, `url`, `category`, `type`, `isStaffPick`, and an optional `paragraphs` array for longform reading.
