export default function appendToEachArrayValue(array, appendString) {
  const newArray = [];

  for (const elem of array) {
    newArray.push(appendString + elem);
  }

  return newArray;
}
