// function to select random elements from array
export function getRandomElements(array, numberOfElements) {
  // Make a copy of the original array to avoid modifying it
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  // Return the first 'numberOfElements' elements
  return shuffledArray.slice(0, numberOfElements);
}
