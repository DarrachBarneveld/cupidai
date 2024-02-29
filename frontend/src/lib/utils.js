export function getRandomElements(array, numberOfElements) {
  if (numberOfElements <= 0 || numberOfElements > array.length) {
    throw new Error("Invalid number of elements");
  }
  const shuffledArray = shuffleArray(array);
  return shuffledArray.slice(0, numberOfElements);
}

export function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}
