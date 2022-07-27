import CharacterRange from "./lib/CharacterRange";
import prompt from "prompt-sync";
import logo from "./lib/art";

const input = prompt({ sigint: true });

console.log(logo);
console.log("Welcome to the Caeser Cipher!");

const caesarCipher = (text: string, shift: number, direction: string) => {
  const alphabet = [...new CharacterRange("A", "Z")];
  const twentySix = alphabet.length;

  if (shift > twentySix) shift = shift % twentySix;
  if (direction === "decode") shift *= -1;

  let cipherText = "";
  for (const char of text.toUpperCase()) {
    if (!alphabet.includes(char)) {
      cipherText += char;
      continue;
    }
    const alphabetIndex = alphabet.indexOf(char);
    const newPosition = (alphabetIndex + shift + twentySix) % twentySix;
    cipherText += alphabet[newPosition];
  }

  return cipherText;
};

const direction = input("Type 'encode' to encrypt, type 'decode' to decrypt ");
const text = input("Type your message ");
const shift = Number(input("Type the shift number "));
const cipherText = caesarCipher(text, shift, direction);
console.log(`The ${direction}d text is ${cipherText}`);
