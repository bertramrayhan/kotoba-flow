# Bunmix 🎌

Bunmix is a lightweight web application for learning Japanese vocabulary through AI‑generated example sentences. Users input Japanese words (hiragana & katakana only) and the app uses the Google Gemini API to create natural sentences that highlight the target words — also in hiragana & katakana only. The app works entirely in the browser, storing the word list and API key in `localStorage`.

![Bunmix Screenshot](https://github.com/bertramrayhan/bunmix/blob/main/public/homepage.png)

## Features

- **Add Japanese words** 📝 – Type a word in hiragana or katakana; the app validates input (no kanji) and stores it locally.
- **Word list management** 📋 – View, add, and avoid duplicate entries.
- **AI sentence generation** 🤖 – Send your word list to Google Gemini (via `@google/genai`) and receive contextual sentences (hiragana & katakana only).
- **Highlighted target words** 🔦 – Generated sentences highlight the supplied words with a subtle highlight effect.
- **Shuffle / Regenerate** 🔀 – Get a new random sentence from the generated list with a smooth animation.
- **Toast notifications** 🍞 – User feedback for success, error, and info messages.
- **Modals** 🪟 – Clean, glass‑morphism modals for adding words, viewing the list, and setting the API key.
- **Animated background** 🌈 – Soft, floating blobs for a lively feel.
- **Responsive design** 📱💻 – Works on desktop and mobile browsers.
- **Zero build step for styling** ⚙️ – Uses Tailwind CSS via CDN and custom CSS.

## Tech Stack

- **HTML5** – Semantic markup.
- **CSS3** – Custom glassmorphism, Tailwind utilities (via CDN), animated blobs.
- **JavaScript (ES Modules)** – Native ES modules, no build step for JS.
- **[Vite](https://vitejs.dev/)** – Development server and production build.
- **[@google/genai](https://www.npmjs.com/package/@google/genai)** – Official Google Generative AI client.
- **localStorage** – Persists word list and API key between sessions.
- **Tailwind CSS** – Utility‑first styling (loaded from CDN).
- **Material Symbols** – Icons via Google Fonts.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- A Google Gemini API key (obtainable from [Google AI Studio](https://aistudio.google.com/)).  
  The key is stored only in your browser’s `localStorage` and is never sent to any external server except the Gemini API.

### Installation

1. Clone the repository (or download the ZIP):

   ```bash
   git clone https://github.com/your-username/bunmix.git
   cd bunmix
   ```

2. Install dependencies (only Vite for dev server; the AI library is bundled):

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

The output will be in the `dist/` folder, ready to be served by any static file host.

## Usage

1. **Set your API key**  
   Click the **key** icon in the top‑right corner, paste your Gemini API key, and press **Save**.

2. **Add words**  
   Click the **+** button, type a Japanese word (e.g., `apple` → `りんご` or `リンゴ`), and hit **Save**. Repeat for as many words as you like.

3. **Generate sentences**  
   Press the **Generate** button (magic wand icon). The app will send your word list to Gemini and display a sentence with the target words highlighted.

4. **Shuffle for a new sentence**  
   Click the **Shuffle** button (refresh icon) to get a different sentence from the same generated set, with a subtle bounce animation.

5. **View your word list**  
   Click the **list** button to see all words you’ve added.

## Project Structure

```
bunmix/
├── index.html            # Main HTML page
├── package.json          # NPM scripts & dependencies
├── src/
│   ├── main.js           # Application entry point; wires up event listeners
│   ├── addWord.js        # Word validation, modal handling, storage
│   ├── showWord.js       # Word list modal rendering
│   ├── saveApiKey.js     # API key modal handling & storage
│   ├── ai.js             # Calls to Google Gemini API
│   ├── sampleSentences.js # Fallback sentences when no words are added
│   ├── toast.js          # Toast notification UI
│   ├── style.css         # Custom styling (glassmorphism, blobs, highlights)
│   └── assets/           # Static assets (if any)
└── public/               # Static files served as‑is (none currently)
```

## How It Works

1. **Word collection** – Users type Japanese words into the “Add Word” modal. Input is validated with a regex that checks for hiragana and katakana. Words are stored as an array under the key `wordsList` in `localStorage`.

2. **API key handling** – The Gemini API key is saved under `apiKey` in `localStorage`. The `saveApiKey.js` module handles the modal and persistence.

3. **Sentence generation** – When the **Generate** button is clicked, `ai.js` reads the word list and the API key, then calls `GoogleGenerativeAI` with a prompt like:  
   _"Generate natural Japanese sentences (JLPT N5 level, only hiragana/katakana, polite です/ます form) using the following words: [word1, word2, …]"_.  
   The model returns a sentence (or multiple sentences) containing only hiragana and katakana. Target words are wrapped in `<span class="sentence-highlight">` for highlighting.

4. **Shuffle** – If multiple sentences are generated (the API can return multiple), the shuffle button picks a random sentence from the cached array, applying a scale‑animation for a playful feel.

5. **UI/UX** – The interface uses Tailwind utilities for layout, custom CSS for glass‑morphism cards, animated blobs in the background, and Material Symbols for icons. Toast feedback appears at the top center.

## Customization

- **Change the prompt** – Edit the prompt string in `src/ai.js` to adjust the tone or complexity of generated sentences.
- **Styling** – Modify `src/style.css` or adjust the Tailwind configuration via the `tailwind.config` block in `index.html`.
- **Fallback sentences** – Edit `src/sampleSentences.js` to provide your own default sentences when no words have been added yet.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Enjoy learning Japanese with Bunmix! 🎌
