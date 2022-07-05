import prompt from "prompt-sync";
const input = prompt();

import { getCloseMatches } from "difflib-ts";
import data from "./data/english_english.json";

function translate(word: string, data: { [key: string]: string | string[] }) {
  if (word.toLowerCase() in data) return data[word];

  const correctWord = getCloseMatches(word, Object.keys(data))[0];

  if (typeof correctWord === "string") {
    const response = input(`Did you mean ${correctWord} instead? 'Y' or 'N': `);
    if (response.toLowerCase().startsWith("y")) return data[correctWord];
    else if (response.toLowerCase().startsWith("n"))
      return "The word doesn't exist.";
    else return "We didn't understand your entry.";
  }

  return "The word doesn't exist.";
}

// Enter a word
const word = input("Enter a word: ");
const output = translate(word, data as any);
if (Array.isArray(output)) {
  for (const defn of output) {
    console.log(defn);
  }
} else {
  console.log(output);
}
