/**
 * Parse parameter from given content string
 *
 * @param {String} content Content string to be parsed.
 * @param {String} open Parameter open tag.
 * @param {String} close Parameter closing tag.
 * @returns {Object} Object of param name and its token to be used in RegExp ({ name: token })
 */
const parseParamsFromContent = (content, open, close) => {
  // Add double backslash to open bracket. Otherwise, it won't work.
  const openTag = open.replace(/[\[]/g, "\\[").replace(/\$\{/g, "\\${");
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
 * @param {Object[]} datum Array of object of token to be used in RegExp and values to be used to replace the content.
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

module.exports = {
  parseParamsFromContent,
  filterUserParams,
  replaceContent
};
