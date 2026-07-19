export function isJapanese(text) {
  // Regex ini mencakup Hiragana, Katakana, dan Kanji
  const japaneseRegex = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/;
  return japaneseRegex.test(text);
}

export function handleAddWordForm(addWordForm, modal) {
  addWordForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(addWordForm);
    const word = formData.get('wordInput');

    if(!word || word.trim() === "") {
        alert("Isilah kata yang ingin ditambahkan.");
        return;
    }
    
    if(!isJapanese(word)) {
        alert("Masukkan karakter Jepang.");
        return;
    }

    let wordsList = JSON.parse(localStorage.getItem('wordsList')) || {words: []};

    if(wordsList.words.includes(word)) {
      alert("Kata sudah ada di dalam list.");
      return;
    }

    wordsList.words.push(word);

    console.log(JSON.stringify(wordsList.words));

    localStorage.setItem('wordsList', JSON.stringify(wordsList));

    addWordForm.reset();
  });
}

export function handleAddWordModal(modal, addBtn, closeBtn, addWordForm) {
  addBtn.addEventListener('click', () => {
    addWordForm.reset();
    modal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}