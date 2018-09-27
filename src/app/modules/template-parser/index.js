/**
 * String replacer
 *
 * @param {String} content Content string to be parsed.
 * @param {Object} userParamsObj Object of user-given parameter name and its value. { name: value }
 * @param {String} open Parameter open tag.
 * @param {String} close Parameter closing tag.
 */
const parser = (content, userParamsObj, open, close) => {
  // Get all parameters from content
  const paramsObj = parseParamsFromContent(content, open, close);

  // Filter unrelated params given by user
  const paramsAndValues = filterUserParams(paramsObj, userParamsObj);

  // Actually replace the content string
  const newContent = replaceContent(content, paramsAndValues);

  return newContent;
};

/**
 * Parse parameter from given content string
 *
 * @param {String} content Content string to be parsed.
 * @param {String} open Parameter open tag.
 * @param {String} close Parameter closing tag.
 * @returns {Object} Object of param name and its token to be used in RegExp ({ name: token })
 */
const parseParamsFromContent = (content, open, close) => {
  const openTag = open.replace(/[\[]/g, "\\[");
  const regexStr = openTag + "(.*?)" + close;
  const regex = new RegExp(regexStr, "g");
  const allMatches = {};
  let match;

  // Get all RegExp matches data
  do {
    match = regex.exec(content);
    if (match) {
      allMatches[match[1]] = match[0];
    }
  } while (match);

  return allMatches;
};

/**
 * Match parsed params from content with user-given params.
 *
 * @param {Object} paramsObj Object of parameters name and its token to be used in RegExp ({ name: token }). Parsed from user content.
 * @param {Object} userParamsObj Object of user-given parameter name and its value. { name: value }
 * @returns {Array} Array of { token, value } object
 */
const filterUserParams = (paramsObj, userParamsObj) => {
  const paramKeys = Object.keys(paramsObj);
  const userParamKeys = Object.keys(userParamsObj);
  const map = [];
  let index;

  userParamKeys.forEach(key => {
    index = paramKeys.indexOf(key);

    if (index > -1) {
      map.push({
        token: paramsObj[paramKeys[index]],
        value: userParamsObj[key]
      });
    }
  });

  return map;
};

/**
 * Replace all matches string.
 *
 * @param {String} content String content to be replaced with new value.
 * @param {Object} datum Object of token to be used in RegExp and values to be used to replace the content.
 * @returns {String} Replaced content.
 */
const replaceContent = (content, datum) => {
  let theContent = content;
  let regex;

  datum.forEach(data => {
    regex = new RegExp(data.token, "g");
    theContent = theContent.replace(regex, data.value);
  });

  return theContent;
};

exports = parser;

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
