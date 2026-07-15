import { GoogleGenAI } from "@google/genai";
import { handleAddWordForm, handleAddWordModal } from "./addWord";

const sentences = [
  {
    html: '昨日は図書館で<span class="sentence-highlight text-primary">新しい本</span>を読みました。',
  },
  {
    html: '朝ごはんに<span class="sentence-highlight text-primary">水</span>を飲みます。',
  },
  {
    html: '友達と<span class="sentence-highlight text-primary">映画</span>を見ました。',
  },
  {
    html: '毎日<span class="sentence-highlight text-primary">日本語</span>を勉強します。',
  }
];

const card = document.getElementById("card");
const sentenceText = document.getElementById("sentenceText");
const shuffleBtn = document.getElementById("shuffleBtn");
const shuffleIcon = document.getElementById("shuffleIcon");

function getRandomSentence(exclude) {
  let pick;
  do {
    pick = sentences[Math.floor(Math.random() * sentences.length)];
  } while (sentences.length > 1 && pick === exclude);
  return pick;
}

let current = sentences[0];

shuffleBtn.addEventListener("click", () => {
  card.style.transform = "scale(0.95) translateY(10px)";
  card.style.opacity = "0.5";
  shuffleIcon.style.transform = "rotate(180deg)";

  setTimeout(() => {
    current = getRandomSentence(current);
    sentenceText.innerHTML = current.html;

    main();

    card.style.transform = "scale(1) translateY(0)";
    card.style.opacity = "1";
  }, 250);

  setTimeout(() => {
    shuffleIcon.style.transform = "rotate(0deg)";
  }, 600);
});

const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('addModal');
const closeBtn = document.getElementById('closeModalBtn');
const addWordForm = document.getElementById('addWordForm');

handleAddWordModal(modal, addBtn, closeBtn);
handleAddWordForm(addWordForm, modal);

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: "Berikan beberapa kata bahasa jepang. hasilkan dalam bentuk JSON, tanpa kata lain hanya JSON saja",
  });
  console.log(interaction.output_text);
}
