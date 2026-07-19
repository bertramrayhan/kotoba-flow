export function handleShowWordModal(listModal, ListBtn, closeListModalBtn) {
  ListBtn.addEventListener('click', () => {
    const wordsListContainer = document.getElementById('wordsListContainer')
    const wordsList = JSON.parse(localStorage.getItem('wordsList')) || {};

    wordsListContainer.innerHTML = '';
    const words = wordsList.words;
    if(wordsList && wordsList.words) {
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            wordsListContainer.innerHTML += `
            <div class="flex items-start gap-2">
                <span class="flex-shrink-0 w-6 text-right text-primary font-medium">${i + 1}.</span>
                <span class="flex-grow">${word}</span>
            </div>
            `
        }
    }

    listModal.classList.remove('hidden');
  });

  closeListModalBtn.addEventListener('click', () => {
    listModal.classList.add('hidden');
  });

  listModal.addEventListener('click', (e) => {
    if (e.target === listModal) {
      listModal.classList.add('hidden');
    }
  });
}