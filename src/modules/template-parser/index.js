const {
  parseParamsFromContent,
  matchUserParams,
  replaceContent
} = require("./utils");

/**
 * String replacer
 *
 * @param {String} content Content string to be parsed.
 * @param {Object} userParams Object of user-given parameter name and its value. { name: value }
 * @param {String} open Parameter open tag.
 * @param {String} close Parameter closing tag.
 */
module.exports = function(content, userParams, open, close) {
  // Get all parameters from content
  const contentParams = parseParamsFromContent(content, open, close);

  // Filter unrelated params given by user
  const matchedParams = matchUserParams(contentParams, userParams);

  // Actually replace the content string
  return replaceContent(content, contentParams, matchedParams);
};

// ===== Example usage. =====
// const content = 'สวัสดี[[suffix]]คุณลูกค้า {{shopName}} ยินดีให้บริการ{{suffix}}'
// const openTag = '{{';
// const closingTag = '}}';
// const userParams = {
//   suffix: 'ครับ',
//   shopName: 'HomeHuk'
// }
// const newContent = parser(content, userParams, openTag, closingTag);

// console.log('newContent: ', newContent);
