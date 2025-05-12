// cryptography/cryptoService.js
const fs = require('fs').promises;

// Helper utilities similar to Java classes
class KeyGenerator {
  constructor(phrase) {
    this.phrase = phrase;
  }

  getNumericKey() {
    // Convert phrase to numeric key (similar to Java implementation)
    let key = '';
    for (let i = 0; i < this.phrase.length; i++) {
      const charCode = this.phrase.charCodeAt(i);
      key += charCode.toString().padStart(2, '0');
    }

    // Ensure we have at least 13 digits (needed for ColorManager)
    while (key.length < 13) {
      key += '0';
    }

    return key.substring(0, 13);
  }
}

class ByteManager {
  static byteToNibble(byte) {
    return [(byte & 0xFF) >> 4, byte & 0x0F];
  }

  static nibblesToByte(nibbles) {
    return ((nibbles[0] & 0x0F) << 4) | (nibbles[1] & 0x0F);
  }
}

class ArmstrongManager {
  constructor(key) {
    this.key = key;
    this.index = -1;

    // Convert the key to a numeric array
    this.keyDigits = [];
    for (let i = 0; i < key.length; i++) {
      this.keyDigits.push(parseInt(key.charAt(i)));
    }
  }

  encrypt(byte) {
    this.index = (this.index + 1) % this.keyDigits.length;
    return (byte + this.keyDigits[this.index]) % 256;
  }

  decrypt(byte) {
    this.index = (this.index + 1) % this.keyDigits.length;
    return (byte - this.keyDigits[this.index] + 256) % 256;
  }
}

class ColorManager {
  constructor(key) {
    this.rgb = new Array(3);
    this.enc_index = -1;
    this.dec_index = -1;

    // Parse key similar to Java version
    const suffix = parseInt(key.substring(12));
    this.rgb[0] = (parseInt(key.substring(0, 4)) + suffix) % 256;
    this.rgb[1] = (parseInt(key.substring(4, 8)) + suffix) % 256;
    this.rgb[2] = (parseInt(key.substring(8, 12)) + suffix) % 256;
  }

  encrypt(byte) {
    const nibbles = ByteManager.byteToNibble(byte);
    this.enc_index = (this.enc_index + 1) % this.rgb.length;
    return (this.rgb[this.enc_index] + nibbles[0] * 16 + nibbles[1]) % 256;
  }

  decrypt(byte) {
    const nibbles = new Array(2);
    this.dec_index = (this.dec_index + 1) % this.rgb.length;
    const val = (byte - this.rgb[this.dec_index] + 256) % 256;
    nibbles[0] = Math.floor(val / 16);
    nibbles[1] = val % 16;
    return ByteManager.nibblesToByte(nibbles);
  }
}


async function encrypt(inputPath, outputPath, keyPhrase) {
  try {
    const keyGen = new KeyGenerator(keyPhrase);
    const numericKey = keyGen.getNumericKey();
    const armstrongManager = new ArmstrongManager(numericKey);
    const colorManager = new ColorManager(numericKey);

    const inputData = await fs.readFile(inputPath);
    const outputData = Buffer.alloc(inputData.length);

    for (let i = 0; i < inputData.length; i++) {
      let byte = inputData[i] & 0xff;
      byte = armstrongManager.encrypt(byte);
      byte = colorManager.encrypt(byte);
      outputData[i] = byte;
    }

    await fs.writeFile(outputPath, outputData);

    // ✅ ADD THIS TO GENERATE THE PREVIEW
    const previewHex = outputData.toString('hex').substring(0, 1000);  // 100 bytes in hex
    console.log('✅ previewHex inside cryptoService:', previewHex);

    // ✅ RETURN AS OBJECT
    return {
      path: outputPath,
      preview: previewHex
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
}


async function decrypt(inputPath, outputPath, keyPhrase) {
  try {
    const keyGen = new KeyGenerator(keyPhrase);
    const numericKey = keyGen.getNumericKey();
    const armstrongManager = new ArmstrongManager(numericKey);
    const colorManager = new ColorManager(numericKey);

    const inputData = await fs.readFile(inputPath);
    const outputData = Buffer.alloc(inputData.length);

    for (let i = 0; i < inputData.length; i++) {
      let byte = inputData[i] & 0xFF;
      byte = colorManager.decrypt(byte);
      byte = armstrongManager.decrypt(byte);
      outputData[i] = byte;
    }

    await fs.writeFile(outputPath, outputData);
    return outputPath;
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
}

module.exports = {
  encrypt,
  decrypt
};