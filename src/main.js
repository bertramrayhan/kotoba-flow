import { handleAddWordForm, handleAddWordModal } from "./addWord";
import { getGeneratedSentencesList } from "./ai";
import { handleShowWordModal } from "./showWord";
import { sampleSentences } from "./sampleSentences";

const card = document.getElementById("card");
const sentenceText = document.getElementById("sentenceText");
const shuffleBtn = document.getElementById("shuffleBtn");
const shuffleIcon = document.getElementById("shuffleIcon");

function setCardSentence() {
  let sentence = current.japanese;
  const targetWords = current.targetWords;

  targetWords.forEach(word => {
    const regex = new RegExp(word, 'g');
    sentence = sentence.replace(regex, `<span class="sentence-highlight text-primary">${word}</span>`);
  });

  sentenceText.innerHTML = sentence;
}

function getRandomSentence(exclude) {
  const chosenSentencesList = JSON.parse(localStorage.getItem('sentences')) || sampleSentences;

  let pick;
  do {
    pick = chosenSentencesList[Math.floor(Math.random() * chosenSentencesList.length)];
  } while (chosenSentencesList.length > 1 && pick.japanese === (exclude ? exclude.japanese : null));
  console.log(pick);
  return pick;
}

let current = getRandomSentence('ありがとう');
setCardSentence();

shuffleBtn.addEventListener("click", () => {
  card.style.transform = "scale(0.95) translateY(10px)";
  card.style.opacity = "0.5";
  shuffleIcon.classList.add('animate-spin');

  setTimeout(() => {
    current = getRandomSentence(current);
    setCardSentence();

    card.style.transform = "scale(1) translateY(0)";
    card.style.opacity = "1";
  }, 250);

  setTimeout(() => {
    shuffleIcon.classList.remove('animate-spin');
  }, 600);
});

const addBtn = document.getElementById('addBtn');
const addModal = document.getElementById('addModal');
const closeBtn = document.getElementById('closeModalBtn');
const addWordForm = document.getElementById('addWordForm');

handleAddWordModal(addModal, addBtn, closeBtn, addWordForm);
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

  getGeneratedSentencesList(wordsList.words, generateBtn);
});