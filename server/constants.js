const compare = (first, second) => {
  if (typeof first === 'undefined' || typeof second === 'undefined') return false;

  first = first.toString();
  second = second.toString();
  return first.trim().toLowerCase() === second.trim().toLowerCase();
};

const getNicknameFromGithubLink = link => {
  let shift = 0;

  if (link.indexOf('/') === -1) return link;
  if (link.lastIndexOf('/') === link.length - 1) shift = 1;
  const elements = link.split('/');

  return elements[elements.length - 1 - shift];
};

const getIndexPair = (pairs, pair) => {
  for (let i = pairs.length - 1; i >= 0; i--) {
    if (compare(pairs[i].mentor.initials, pair.mentor.initials)) {
      return i;
    }
  }

  return -1;
};

module.exports = {
  compare,
  getNicknameFromGithubLink,
  getIndexPair,
};
