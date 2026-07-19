import { handleAddWordForm, handleAddWordModal } from "./addWord";
import { getGeneratedSentencesList } from "./ai";
import { handleShowWordModal } from "./showWord";

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

    card.style.transform = "scale(1) translateY(0)";
    card.style.opacity = "1";
  }, 250);

  setTimeout(() => {
    shuffleIcon.style.transform = "rotate(0deg)";
  }, 600);
});

const addBtn = document.getElementById('addBtn');
const addModal = document.getElementById('addModal');
const closeBtn = document.getElementById('closeModalBtn');
const addWordForm = document.getElementById('addWordForm');

handleAddWordModal(addModal, addBtn, closeBtn);
handleAddWordForm(addWordForm, addModal);

// Show word list modal
const listBtn = document.getElementById('listBtn');
const listModal = document.getElementById('listModal');
const closeListModalBtn = document.getElementById('closeListModalBtn');

handleShowWordModal(listModal, listBtn, closeListModalBtn);

const generateBtn = document.getElementById('generateBtn');

generateBtn.addEventListener('click', () => {
  const wordsList = JSON.parse(localStorage.getItem('wordsList')) || {};

  if(!wordsList || !wordsList.words) {
    alert('Belum ada kata yang dimasukkan.');
    return;
  }

  getGeneratedSentencesList(wordsList.words);
});