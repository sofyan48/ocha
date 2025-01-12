// Set untuk menyimpan nilai yang sudah dihasilkan
const generatedValues = new Set<string>();

const generateUniqueValue = (): string => {
  let uniqueValue: string;

  do {
    uniqueValue = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  } while (generatedValues.has(uniqueValue));

  generatedValues.add(uniqueValue);

  return uniqueValue;
};

export default {
    generateUniqueValue
}

