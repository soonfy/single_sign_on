function decryptData(hash, options) { // eslint-disable-line
  const { algo, key } = options
  return JSON.parse(CryptoJS[algo].decrypt(hash, key).toString(CryptoJS.enc.Utf8))
}
