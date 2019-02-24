const fs = require('fs');
const XLSX = require('xlsx');
// if (typeof require !== "undefined")

const mentorStudentsPairsFile = XLSX.readFile('./data/Mentor-students-pairs.xlsx');
const tasksFile = XLSX.readFile('./data/Tasks.xlsx');
const mentorScoreFile = XLSX.readFile('./data/Mentor-score.xlsx');

const pairsList = mentorStudentsPairsFile.Sheets.pairs;
const mentorsList = mentorStudentsPairsFile.Sheets['second_name-to_github_account'];
const tasksList = tasksFile.Sheets.Sheet1;
const scoreStudentsList = mentorScoreFile.Sheets['Form Responses 1'];

const getTask = (sheet, currentRow) => {
  const fieldMapping = {
    name: 'A',
    link: 'B',
    status: 'C',
  };

  const task = {
    name: sheet[fieldMapping.name + currentRow].v,
    link: sheet[fieldMapping.link + currentRow] ? sheet[fieldMapping.link + currentRow].v : '',
    status: sheet[fieldMapping.status + currentRow].v,
  };

  return task;
};

const getTasks = sheet => {
  let currentRow = 2;
  const tasks = [];

  while (sheet[`A${currentRow}`]) {
    tasks.push(getTask(sheet, currentRow));
    currentRow += 1;
  }

  return tasks;
};

const tasks = getTasks(tasksList);

const getPair = (sheet, currentRow) => {
  const fieldMapping = {
    mentor: 'A',
    students: 'B',
  };

  const tasksNames = [];
  tasks.forEach(task => {
    tasksNames.push({
      name: task.name,
      mark: -1,
      comment: '',
    });
  });

  const pair = {
    mentor: {
      initials: sheet[fieldMapping.mentor + currentRow].v,
    },
    students: [
      {
        github: sheet[fieldMapping.students + currentRow].v,
        tasks: tasksNames,
      },
    ],
  };

  return pair;
};

const getMentor = (sheet, currentRow) => {
  const fieldMapping = {
    name: 'A',
    surname: 'B',
    city: 'C',
    count: 'D',
    github: 'E',
  };

  const mentor = {
    name: sheet[fieldMapping.name + currentRow].v,
    surname: sheet[fieldMapping.surname + currentRow].v,
    city: sheet[fieldMapping.city + currentRow].v,
    count: sheet[fieldMapping.count + currentRow].v,
    github: sheet[fieldMapping.github + currentRow].v,
  };

  return mentor;
};

const getScore = (sheet, currentRow) => {
  const fieldMapping = {
    timestamp: 'A',
    githubMentor: 'B',
    githubStudent: 'C',
    task: 'D',
    linkPullRequest: 'E',
    mark: 'F',
    comment: 'G',
  };

  const score = {
    timestamp: sheet[fieldMapping.timestamp + currentRow].v,
    githubMentor: sheet[fieldMapping.githubMentor + currentRow].v,
    githubStudent: sheet[fieldMapping.githubStudent + currentRow].v,
    task: sheet[fieldMapping.task + currentRow].v,
    linkPullRequest: sheet[fieldMapping.linkPullRequest + currentRow].v,
    mark: sheet[fieldMapping.mark + currentRow].v,
    comment: sheet[fieldMapping.comment + currentRow]
      ? sheet[fieldMapping.comment + currentRow].v
      : '',
  };

  return score;
};

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

const getPairs = (sheetPairs, sheetMentors, sheetScores) => {
  let currentRow = 2;
  let pairs = [];

  const addPair = (pairs, pair) => {
    let newPairs = [...pairs];

    if (pairs.length === 0) {
      newPairs.push(pair);
      return newPairs;
    }

    let adding = false;

    const index = getIndexPair(pairs, pair);

    if (index !== -1) {
      newPairs[index].students.push(pair.students[0]);
      adding = true;
    }

    if (!adding) {
      newPairs.push(pair);
    }

    return newPairs;
  };

  const addMentor = (mentors, pair) => {
    let currentRow = 2;
    let newPair = {};

    while (mentors[`A${currentRow}`]) {
      const mentor = getMentor(mentors, currentRow);

      if (
        compare(pair.mentor.initials.split(' ')[0], mentor.name) &&
        compare(pair.mentor.initials.split(' ')[1], mentor.surname)
      ) {
        newPair = {
          students: pair.students,
          mentor: {
            initials: pair.mentor.initials,
            ...mentor,
          },
        };

        break;
      }
      currentRow += 1;
    }

    return newPair;
  };

  const addScore = (scores, pair) => {
    let currentRow = 2;
    let newPair = {};
    let check = false;
    while (scores[`A${currentRow}`]) {
      const score = getScore(scores, currentRow);

      if (compare(pair.students[0].github, getNicknameFromGithubLink(score.githubStudent))) {
        pair.students[0].tasks.forEach(task => {
          if (compare(task.name, score.task)) {
            task.mark = score.mark;
            task.comment = score.comment;
          }
        });

        newPair = {
          ...pair,
          students: [
            {
              github: pair.students[0].github,
              tasks: pair.students[0].tasks,
            },
          ],
        };

        check = true;
      }

      currentRow += 1;
    }

    if (!check) newPair = { ...pair };

    return newPair;
  };

  while (sheetPairs[`A${currentRow}`]) {
    let pair = getPair(sheetPairs, currentRow);

    if (getIndexPair(pairs, pair) === -1) pair = addMentor(sheetMentors, pair);
    pair = addScore(sheetScores, pair);
    pairs = addPair(pairs, pair);

    currentRow += 1;
  }

  return pairs;
};

let pairs = getPairs(pairsList, mentorsList, scoreStudentsList);

// console.log(pairs);
// tasks.forEach(task => {
//   console.log(task.name)
// })

// console.log(pairs[33].students[1]);

// pairs.forEach((pair, index) => {
//   if (index < 35)
//   console.log(index, pair.students)
// })

// pairs = JSON.stringify(pairs, 0, 2);
let json = {
  pairs: pairs,
  tasksInfo: tasks,
};
// pairs = JSON.stringify(pairs);
json = JSON.stringify(json, 0, 2);

fs.writeFile('data/data.json', json, 'utf8', () => {
  console.log('Writing is done!');
});
