const allowedChars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~+/";
const keyLength = 64;

const generateApiKey = () => {
  let newApiKey = "";

  const array = new Uint8Array(keyLength);
  crypto.getRandomValues(array);

  for (let i = 0; i < keyLength; i++) {
    newApiKey += allowedChars[array[i] % allowedChars.length];
  }

  return newApiKey;
};
