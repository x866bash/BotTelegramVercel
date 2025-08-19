## 🤖 Telegram Bot – Vercel (Indonesia Utilities)

_Bot Telegram dengan berbagai fitur untuk grup & channel, dijalankan di Vercel (Edge Runtime) dengan framework grammY + TypeScript._

## ✨ Fitur Utama
 1. 📊 Kumpulkan data anggota (join/leave) di grup & channel → bisa diekspor .json.gz
 2. 🛡️ Anti-spam (rate limit, filter kata kasar)
 3. 👋 Welcome & Farewell Message (pesan sambutan & perpisahan otomatis)
 4. 🔨 Admin Tools
  - /kick – keluarkan anggota
  - /invite – buat link undangan (bot tidak bisa “memasukkan” user secara paksa, hanya bisa buat link invite)
 5. 🌦️ Cuaca dari OpenWeatherMap
 6. 📰 Berita dari NewsAPI (khusus Indonesia)
 7. 🔍 Search Engine (Google, Yandex, Bing, Yahoo, DuckDuckGo via SerpAPI)
 8. 📦 Kompresi hasil query (.json.gz) agar lebih kecil
---

## 🚀 Deploy ke Vercel
1. Clone repo
```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
```
---
2. Install dependencies
```bash
pnpm install
```
---
3. Tambahkan ke GitHub, lalu hubungkan ke Vercel.
4. Atur Environment Variables di Vercel Dashboard:
    - Hubungkan repo (isi file dari canvas).
    - Tambahkan Environment Variables:
        - `TELEGRAM_BOT_TOKEN` → dari [@BotFather]`(https://t.me/BotFather`)
        - `TELEGRAM_WEBHOOK_SECRET` → string acak panjang
        - `APP_BASE_URL` → domain Vercel Anda (`https://xxxxx.vercel.app`)
        - (Opsional) `OPENWEATHER_KEY` → [OpenWeatherMap](https://openweathermap.org/api)
        - (OPsional) `NEWSAPI_KEY` → [NewsAPI](https://newsapi.org)
        - (Opsional) `SERPAPI_KEY` → [SerpAPI](https://serpapi.com)
        - (Opsional) `VERCEL_KV_REST_URL`, `VERCEL_KV_REST_TOKEN` → untuk simpan data di Vercel KV
---
5. Deploy ke Vercel → otomatis membuat webhook.
---
## 📜 Perintah Bot
🔹 Admin Tools
  - `/kick <@username|userId>` – keluarkan anggota
  - `/invite` – buat link undangan
🔹 Pesan Otomatis
  - `/setwelcome <teks>` – set pesan sambutan
  - `/setfarewell <teks>` – set pesan perpisahan
🔹 Anti Spam
  - `/antispam  on|off` – aktifkan/nonaktifkan filter spam
  - `/setrate <jumlah>` <detik> – rate limit
  - `/badwords kata1 kata2 ...` – tambah daftar kata terlarang
🔹 Info & Tools
  - `/weather` <kota> – cek cuaca
  - `/news` <topik> – berita terkini Indonesia
  - `/search <engine> <query> [--zip]` – cari informasi (engine: google, yandex, bing, yahoo, ddg)
  - `/exportmembers` – unduh data anggota (`.json.gz`)
---
## ⚠️ Batasan Telegram API
- Bot tidak bisa menarik daftar anggota lama yang sudah ada sebelum bot masuk.
- Bot tidak bisa menambahkan user secara paksa ke grup/channel. Hanya bisa membuat invite link.
---
## 📄 Lisensi
MIT License – silakan gunakan & modifikasi sesuai kebutuhan.
---
---

> Gunakan `--zip` untuk mengirim hasil terkompresi (`.json.gz`).
---
---
```text
MIT License


Copyright (c) 2025 Dani


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
