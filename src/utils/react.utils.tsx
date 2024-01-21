export default function generateKey(value: string): string {
  // Convert the string to an array of Unicode code points
  const codePoints = Array.from(value).map((char) => char.charCodeAt(0));

  // Calculate the hash by summing up the Unicode code points
  const hash = codePoints.reduce((acc, codePoint) => acc + codePoint, 0);

  // Convert the hash to a string
  const uniqueString = hash.toString();

  return uniqueString;
}
