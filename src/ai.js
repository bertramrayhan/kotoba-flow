import { GoogleGenAI } from "@google/genai";
import { showToast } from "./toast";

const BATCH_SIZE = 20;

export async function getGeneratedSentencesList(wordsList, generateBtn) {
const prompt = `
You are a Japanese sentence generator for a language learning app. You will be given a list of Japanese vocabulary words (in dictionary form, written only in hiragana/katakana) that the user is currently learning.

Your task: generate ${BATCH_SIZE} example sentences. For each sentence, pick 2 words from the list to use together as the "target words" of that sentence.

RULES:
1. Generate sentences at JLPT N5 level only. Use です/ます polite form. Keep grammar simple — no advanced conditionals, causative, passive, or keigo.
2. Write the entire sentence using ONLY hiragana and katakana — never use any kanji, under any circumstance.
3. Pick natural, sensible pairs of words from the list — don't force nonsensical combinations. Try to vary which words get paired together across the batch, so most/all words in the list get used at least once if the batch size allows.
4. Conjugate the chosen words as needed to fit the sentence naturally (e.g. dictionary form verbs should become ます-form, adjectives may inflect, etc).
5. CRITICAL SPELLING RULE: You must copy each input word's spelling EXACTLY, character by character, before applying any needed conjugation. Never add, remove, or change any character in a word beyond what standard conjugation requires. Nouns and other words that do not need conjugation must appear in the sentence with the IDENTICAL spelling as given in the input list — do not alter them in any way.
6. If a word has no natural pairing with any other word in the list, you may add ONE additional simple, common N5-level word (not from the list) to complete a natural sentence. Prioritize using 2 list-words whenever a sensible pairing exists.
7. Do not include any translation.
8. Vary sentence structures/topics across the batch — don't repeat the same sentence pattern every time.
9. For each sentence, report the exact substring (as it literally appears in the sentence, after conjugation) corresponding to each of the 2 target words used, so the app can highlight them correctly.
10. Return ONLY valid JSON, no markdown formatting, no code fences, no explanation text before or after.

INPUT WORD LIST (dictionary form, hiragana/katakana only):
${wordsList}

OUTPUT FORMAT (strict JSON, no other text):
{
  "sentences": [
    {
      "japanese": "あさごはんにみずをのみます。",
      "targetWords": ["みず", "のみます"]
    }
  ]
}

Generate exactly ${BATCH_SIZE} sentences.`;

  const apiKey = localStorage.getItem('apiKey') || '';

  if(!apiKey || apiKey === '') {
    showToast('Silakan masukkan API key terlebih dahulu.', 'error');
    return;
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  generateBtn.disabled = true;
  const generateBtnIcon = document.getElementById('generateBtnIcon');
  const generateBtnText = document.getElementById('generateBtnText');

  try {
    generateBtnIcon.textContent = 'hourglass_empty';
    generateBtnIcon.classList.add('animate-spin');
    generateBtnText.textContent = 'Generating..';

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: prompt,
    });

    if (interaction && interaction.output_text) {
      console.log(interaction.output_text);

      const data = JSON.parse(interaction.output_text);

      localStorage.setItem('sentences', JSON.stringify(data.sentences));
      showToast('Kalimat-kalimat berhasil digenerate!', 'success');
    } else {
      throw new Error('Respon AI kosong atau tidak valid.');
    }
  } catch (error) {
    console.error("Gagal mendapatkan respon AI:", error.message);
    
    showToast("Maaf, sepertinya AI sedang tidak bisa dihubungi saat ini. Coba lagi nanti", 'error');
  } finally {
    generateBtn.disabled = false;
    generateBtnIcon.textContent = 'auto_awesome';
    generateBtnIcon.classList.remove('animate-spin');
    generateBtnText.textContent = 'Generate';
  }
}