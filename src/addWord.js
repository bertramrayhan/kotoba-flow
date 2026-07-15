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

    console.log(word);
    if(!word || word.trim() === "") {
        alert("Isilah kata yang ingin ditambahkan.");
        return;
    }

    if(!isJapanese(word)) {
        alert("Masukkan karakter Jepang.");
        return;
    }

    let listWords = JSON.parse(localStorage.getItem('listWords')) || {};

    if(!listWords || !listWords.words) {
        listWords = {words: [word]};
    } else {
        listWords.words.push(word);
    }

    console.log(listWords);

    localStorage.setItem('listWords', JSON.stringify(listWords));

    modal.classList.add('hidden');
    addWordForm.reset();
  });
}

export function handleAddWordModal(modal, addBtn, closeBtn) {
  addBtn.addEventListener('click', () => {
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