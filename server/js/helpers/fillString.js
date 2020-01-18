/**
 * Finds and replaces $[0-9]+ matches with given replacement values
 */
export default (text, replace) => {
  const match = /\$[0-9]+/g;
  const textMatches = text.match(match);
  for (let i = 0; i < textMatches.length; i++) {
    text = text.replace(textMatches[i], replace[i]);
  }
  return text;
};
