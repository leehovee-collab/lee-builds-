# Lee's Builds

A scrapbook portfolio: a kraft folder with a spinning ring of polaroids. Tap one and that build's page opens out of it.

GitHub repo: <https://github.com/leehovee-collab/lee-builds->
(The folder on this computer is still called `lees-builds-scrapbook`. That's fine; the names don't need to match.)

## What's in the folder

| File / folder | What it is | Edit it? |
|---|---|---|
| `content.js` | **All the wording**: titles, tags, notes, captions, about me, made with, image paths | Yes, in Notepad |
| `index.html` | The page skeleton | Rarely |
| `css/style.css` | The design: colours, fonts, tape, polaroids | Only for design changes |
| `js/orbit.js` | The spinning ring and opening/closing build pages | No |
| `js/herbal-viewer.js` | The 3D can viewer on the Herbal Ice page | No |
| `images/` | Every picture on the site, one folder per build | Add new pictures here |
| `images/herbal/textures/` | The can artwork for the 3D viewer (`-sm` = phone size) | No |
| `Staticfile` | Tells Railway "this is a plain website" | No |
| `.gitignore` | Files that must never be uploaded (old 8 MB data file, original photos) | No |

## Changing the wording

1. Right-click `content.js` → **Open with** → **Notepad**.
2. Change only the text between the `"double quotes"`. Keep the commas.
3. `*word*` makes the coloured italic word in a title. `**words**` makes bold text in a note.
4. Save, then refresh the page.

## Adding a picture

Put the file in the right folder and use the same path in `content.js`. For example, the classroom polaroid will appear as soon as `images/classroom/thumb.jpg` exists. Until then the site shows a "photo needed" placeholder naming the file.

**Privacy check before any new screenshot goes live** (heavy pixelated blur, then preview it):

- **Lead tracker:** blur Instagram handles, real people's or business names, profile links, place names that identify a business, and named programmes or communities. Keep the approach rating, niche, score, follower count, country and general description.
- **Rosalynn:** blur money amounts (risk, reward, profit, balance, account numbers). Keep prices, pips, lot sizes and pattern details.
- **JobWatch:** blur the client's name or initials anywhere, including avatars and reactions.
- **Cynthia's orders:** crop off map previews; blur customer names, addresses, postcodes and phone numbers.
- **Everywhere:** crop off the phone status bar, keyboard and chat lists; blur emails, phone numbers and anything else personal.

## Looking at the site on your computer

In PowerShell:

```powershell
cd "$HOME\OneDrive\Desktop\lees-builds-scrapbook"
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser. Press **Ctrl + C** in PowerShell to stop it.
(Opening `index.html` by double-clicking mostly works too, but the 3D cans need the little server.)

## Putting it online (GitHub → Railway)

### 1. Create the empty repo on GitHub
1. Go to <https://github.com/new> and sign in.
2. **Repository name:** `lee-builds-` (already done). Choose Public or Private (both work with Railway).
3. **Don't** tick "Add a README" or add a .gitignore or licence. The repo must start empty.
4. Click **Create repository**.

### 2. First commit and push (PowerShell)

```powershell
# go into the project folder
cd "$HOME\OneDrive\Desktop\lees-builds-scrapbook"

# turn this folder into its own Git project, with a branch called "main"
git init -b main

# stage every file (the .gitignore list is skipped automatically)
git add .

# check the list: herbal-data.js and the .jpeg originals must NOT appear
git status

# save this snapshot with a short note
git commit -m "First version of Lee's Builds"

# tell Git where the GitHub repo lives
git remote add origin https://github.com/leehovee-collab/lee-builds-.git

# upload it (a browser window may pop up asking you to sign in to GitHub)
git push -u origin main
```

### 3. Connect it in Railway
1. Go to <https://railway.com> → **New Project** → **Deploy from GitHub repo**.
2. If asked, click **Configure GitHub App** and give Railway access to `lee-builds-`.
3. Pick `lee-builds-`. Railway sees `index.html` and builds it as a static site automatically.
4. Click the new service → **Variables** → **New Variable**: name `PORT`, value `8080` → Add.
5. **Settings** → **Networking** → **Generate Domain**. If it asks for a port, type `8080`.
6. Your live link appears, ending in `.up.railway.app`. Open it on your phone.

### 4. Updating the site later

```powershell
cd "$HOME\OneDrive\Desktop\lees-builds-scrapbook"
git add .
git commit -m "Describe what you changed"
git push
```

Railway notices the push and redeploys by itself in a minute or two.
