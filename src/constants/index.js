const getNicknameFromGithubLink = link => {
  let shift = 0;

  if (link.indexOf('/') === -1) return link;
  if (link.lastIndexOf('/') === link.length - 1) shift = 1;
  const elements = link.split('/');

  return elements[elements.length - 1 - shift];
};

const compare = (first, second) => {
  if (typeof first === 'undefined' || typeof second === 'undefined') return false;

  first = first.toString();
  second = second.toString();
  return first.trim().toLowerCase() === second.trim().toLowerCase();
};

const GITHUB_PREFIX = 'https://github.com/'

const STATUS_COLORS = {
  checked: 'green',
  inProgress: 'yellow',
  checking: 'orange',
  notPassed: 'red',
  noStatus: 'gray',
};

export {
  getNicknameFromGithubLink,
  compare,
  GITHUB_PREFIX,
  STATUS_COLORS
};