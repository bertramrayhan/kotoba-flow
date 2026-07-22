import { showToast } from "./toast";

export function handleApiKeyForm(form, modal) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const apiKey = formData.get('apiKeyInput').trim();

    if(!apiKey || apiKey === "") {
        showToast("Masukkan API key anda.", 'error');
        return;
    }

    localStorage.setItem('apiKey', apiKey);

    form.reset();
    modal.classList.add('hidden');

    showToast("API key berhasil diaplikasikan!", 'success');
  });
}

export function handleApiKeyModal(modal, apiKeyBtn, closeBtn, form) {
  apiKeyBtn.addEventListener('click', () => {
    form.reset();
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