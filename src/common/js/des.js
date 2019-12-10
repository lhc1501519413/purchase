import cryptoJS from 'crypto-js'

// ECB模式
// DES加密
export const ECBencryptDes = (message, key) => {
  var keyHex = cryptoJS.enc.Utf8.parse(key)
  var option = { mode: cryptoJS.mode.ECB, padding: cryptoJS.pad.Pkcs7 }
  var encrypted = cryptoJS.DES.encrypt(message, keyHex, option)
  return encrypted.ciphertext.toString()
}

// DES解密
export const ECBdecryptDes = (message, key) => {
  var keyHex = cryptoJS.enc.Utf8.parse(key)
  var decrypted = cryptoJS.DES.decrypt(
    {
      ciphertext: cryptoJS.enc.Hex.parse(message)
    },
    keyHex,
    {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7
    }
  )
  return decrypted.toString(cryptoJS.enc.Utf8)
}
// CBC模式
// AES加密
export const CBCencryptAes = (message, key, iv) => {
  var keyHex = cryptoJS.enc.Utf8.parse(key)
  var ivHex = cryptoJS.enc.Utf8.parse(iv)
  var option = { iv: ivHex, mode: cryptoJS.mode.CBC, padding: cryptoJS.pad.Pkcs7 }
  var encrypted = cryptoJS.AES.encrypt(message, keyHex, option)
  return encrypted.ciphertext.toString()
}

// AES解密
export const CBCdecryptAes = (message, key, iv) => {
  var keyHex = cryptoJS.enc.Utf8.parse(key)
  var ivHex = cryptoJS.enc.Utf8.parse(iv)
  var decrypted = cryptoJS.AES.decrypt(
    {
      ciphertext: cryptoJS.enc.Hex.parse(message)
    },
    keyHex,
    {
      iv: ivHex,
      mode: cryptoJS.mode.CBC,
      padding: cryptoJS.pad.Pkcs7
    }
  )
  return decrypted.toString(cryptoJS.enc.Utf8)
}

/**加密
 *
 * @param data
 * @returns {string}
 */
export const encryptAes = (data,secretkey)=>{
  let text = cryptoJS.enc.Base64.stringify(cryptoJS.enc.Utf8.parse(data)).toString();
  let key = cryptoJS.enc.Utf8.parse(secretkey); //为了避免补位，直接用16位的秘钥
  let iv = cryptoJS.enc.Utf8.parse(secretkey); //16位初始向量
  let encrypted = cryptoJS.AES.encrypt(text, key, {
      iv:iv,
      mode: cryptoJS.mode.CBC,
      padding: cryptoJS.pad.ZeroPadding
  }).toString();
  return cryptoJS.enc.Base64.stringify(cryptoJS.enc.Utf8.parse(encrypted)).toString();
}

/**解密
 *
 * @param data
 * @returns {string}
 */
export const decryptAes = (data,secretkey)=>{
  let encrypted = cryptoJS.enc.Utf8.stringify(cryptoJS.enc.Base64.parse(data)).toString();
  let key = cryptoJS.enc.Utf8.parse(secretkey); //为了避免补位，直接用16位的秘钥
  let iv = cryptoJS.enc.Utf8.parse(secretkey); //16位初始向量
  let decrypted = cryptoJS.AES.decrypt(encrypted, key, {
    iv:iv,
    mode: cryptoJS.mode.CBC,
    padding: cryptoJS.pad.ZeroPadding
  }).toString(cryptoJS.enc.Utf8);

  return cryptoJS.enc.Utf8.stringify(cryptoJS.enc.Base64.parse(decrypted)).toString();
}