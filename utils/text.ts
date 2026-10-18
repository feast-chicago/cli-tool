export function toProperCase(text: string) {
  const arr = text.split(" ");
  const result: string[] = [];

  for (const word of arr) {
    const firstLetter = word[0];
    const restOfWord = word.slice(1);
    const properWord = `${firstLetter.toUpperCase()}${restOfWord}`;
    result.push(properWord);
  }

  return result.join(" ");
}
