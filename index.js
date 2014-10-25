/**
 * zen-id for javascript (nodejs)
 * copyright 2014 Tapmodo Interactive LLC
 * Free software - MIT license
 * based on concept of gen-id npm package
 */

var crc = require('crc');

// Constructor
var ZenID = function(format){
  this.setFormat(format);
  this.init();
};

ZenID.prototype = {

  // Initialize the object
  init: function(){
    this.formats = {};

    for(key in ZenID.formats)
      if (ZenID.formats.hasOwnProperty(key))
        this.formats[key] = ZenID.shuffle(ZenID.formats[key]);
  },

  // Set the format
  setFormat: function(format){
    this.format = format;
    return this;
  },

  // Translate a format character into a random value
  getChar: function(c){
    if (c == 'c') return null;
    else if (!this.formats[c]) return c;
    return this.formats[c][Math.floor(Math.random() * this.formats[c].length)];
  },

  // Generate a value based on a format
  generate: function(format){
    format = format || this.format;
    return this.computeChecksums(format.split('').map(this.getChar.bind(this))).join('');
  },

  // Validate an input based on a format
  validate: function(input,format){
    format = format || this.format;
    var data = input.split(''), out = [];

    for(var i=0, l=data.length; i<l; i++){
      if (format[i] == 'c') out.push(null);

      else if (
        this.formats[format[i]] &&
        (this.formats[format[i]].indexOf(data[i]) != -1)
      ) out.push(data[i]);

      else if (format[i] == data[i]) out.push(data[i]);
    }

    return this.computeChecksums(out).join('') == input;
  },

  // Internally used fuction to generate checksum values
  computeChecksums: function(arr){
    return arr.reduce(function(pv,cv,idx,all){
      if (cv !== null) pv.push(cv);
        else pv.push((''+((crc.crc32(pv.join(''))) >>> 0)).substr(-1));
      return pv;
    },[]);
  }
};

// Why not shuffle the inital arrays...
// Based on lodash algo
ZenID.shuffle = function(chars) {
  var collection = chars.split('');
  var index = -1,

  length = collection.length,
  result = Array(length);

  while (++index < length) { 
    var rand = Math.floor(Math.random() * index);
    if (index != rand) {
      result[index] = result[rand];
    } 
    result[rand] = collection[index];
  }   
  return result.join('');
} 

// A nicer syntax
ZenID.create = function(format) {
  return new ZenID(format);
};

// The basic formats
ZenID.formats = {
  n: '0123456789',
  h: '0123456789abcedf',
  a: 'abcdefghijklmnopqrstuvwxyz',
  A: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  x: '0123456789abcdefghijklmnopqrstuvwxyz',
  X: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  z: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
}

module.exports = ZenID;
