import {COLOR} from '../const';

const DescriptionItems = [
  'Изучить теорию',
  'Сделать домашку',
  'Пройти интенсив на соточку'
];

const DefualtRepeatingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

const Tags = [
  'homework',
  'theory',
  'practice',
  'intensive',
  'keks',
  'hard',
  'easy',
  'start'
];

const generatetId = () => Date.now() + (parseInt(Math.random() * 10000, 10));

const getRandomIntegerNumber = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);
  return array[randomIndex];
};

const generateRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

const generateRepeatingDays = () => Object.assign({}, DefualtRepeatingDays, {
  mo: Math.random() > 0.5,
  tu: true
});

const generateTags = (tags) => tags.filter(() => Math.random() > 0.5).slice(0, 3);

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : generateRandomDate();

  return {
    id: generatetId(),
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefualtRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomArrayItem(COLOR),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  };
};

const generateTasks = (count) => new Array(count).fill('').map(generateTask);

export {generateTask, generateTasks};
