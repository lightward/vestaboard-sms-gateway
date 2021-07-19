const fetch = require('node-fetch');
const centerAlign = require('center-align');
const smartwrap = require('smartwrap');
const _ = require('lodash');

const colorCharacters = [63, 64, 65, 66, 67, 68, 69];

const characterMapping = {
  '0': [...'⬛️ '],
  '1': [...'🅰A'],
  '2': [...'🅱B'],
  '3': [...'🅲C'],
  '4': [...'🅳D'],
  '5': [...'🅴E'],
  '6': [...'🅵F'],
  '7': [...'🅶G'],
  '8': [...'🅷H'],
  '9': [...'🅸I'],
  '10': [...'🅹J'],
  '11': [...'🅺K'],
  '12': [...'🅻L'],
  '13': [...'🅼M'],
  '14': [...'🅽N'],
  '15': [...'🅾O'],
  '16': [...'🅿P'],
  '17': [...'🆀Q'],
  '18': [...'🆁R'],
  '19': [...'🆂S'],
  '20': [...'🆃T'],
  '21': [...'🆄U'],
  '22': [...'🆅V'],
  '23': [...'🆆W'],
  '24': [...'🆇X'],
  '25': [...'🆈Y'],
  '26': [...'🆉Z'],
  '27': [...'1️⃣1'],
  '28': [...'2️⃣2'],
  '29': [...'3️⃣3'],
  '30': [...'4️⃣4'],
  '31': [...'5️⃣5'],
  '32': [...'6️⃣6'],
  '33': [...'7️⃣7'],
  '34': [...'8️⃣8'],
  '35': [...'9️⃣9'],
  '36': [...'0️⃣0'],
  '37': [...'!'],
  '38': [...'@'],
  '39': [...'#'],
  '40': [...'$'],
  '41': [...'('],
  '42': [...')'],
  '44': [...'-'],
  '46': [...'+'],
  '47': [...'&'],
  '48': [...'='],
  '49': [...';'],
  '50': [...':'],
  '52': [...'\''],
  '53': [...'"'],
  '54': [...'%'],
  '55': [...','],
  '56': [...'.'],
  '59': [...'/'],
  '60': [...'?'],
  '62': [...'°'],
  '63': [...'🟥❤️🛑❤️♥️🍒🍓🍉🍅🌹🥀🏮🌶💄🧨🧧💋🥊🐞🔻😡🩸⭕💉🩸🍷👹👺🍎🎀'],
  '64': [...'🟧🧡📙🍑🧡🏵🥐🟠🦊🦐🍁🍊'],
  '65': [...'🟨💛🌻💛☀👑🍋🌙✨🎗🐥🍌🌼🌜'],
  '66': [...'🟩💚🍈🍏🍐🥝🥦🥒🥬🥑🥗🍾🧣👕👘💵💸📗💚🟢🟩♍♎✳️❇️♻️💲💹🈯🇳🇫🇳🇬🇵🇰🇸🇦🛌🧟🌱🌿🍃☘️🍀🌵🌴🌳🌲🏞️🌄🐸🐲🦎🐉🦖🦕🐢🐊🐍🐛🍵🚚🚎🗾🎍🎋🎄🥎⛳🔋'],
  '67': [...'🟦💙💦🚰💎🌐💧🐬🥶🌧🐋'],
  '68': [...'🟪💜😈👿👾💜💟☮️✝️☪️☯️⚛️🦹🏻‍♀️🧞🧞‍♀️🙅🏼‍♀️🙆🏼‍♀️🤷🏼‍♀️🙎🏼‍♀️🌂🦄☂️☔️🍬🪁🚏🎡🎆💷🔮🧬🚺🟣🟪'],
  '69': [...'⬜️🤍🐘🦾🌪🤍📃⚓🌫🦏🪨🐀🕯🏳💿🪦🐚☁🔗'],
};

const characterToCode = character => {
  let code = Object.keys(characterMapping).find(code => (
    characterMapping[code].indexOf(character.toUpperCase()) !== -1
  ));
  
  if (code) {
    return parseInt(code, 10);
  } else {
    return 0;
  }
};

const centerArray = (arr) => {
  const len = 22;
  const head = Array(Math.floor((len - arr.length)/2)).fill(null);
  const tail = Array(Math.ceil((len - arr.length)/2)).fill(null);

  arr.unshift(...head);
  arr.push(...tail);
};

const makeNullLine = () => [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

const centerAll = (characters) => {
  characters.forEach(centerArray);

  if (characters.length === 1) {
    characters.unshift(makeNullLine(), makeNullLine());
    characters.push(makeNullLine(), makeNullLine(), makeNullLine());
  } else if(characters.length === 2) {
    characters.unshift(makeNullLine(), makeNullLine());
    characters.push(makeNullLine(), makeNullLine());
  } else if(characters.length === 3) {
    characters.unshift(makeNullLine());
    characters.push(makeNullLine(), makeNullLine());
  } else if(characters.length === 4) {
    characters.unshift(makeNullLine());
    characters.push(makeNullLine());
  } else if(characters.length === 5) {
    characters.push(makeNullLine());
  }
};

const applyCharacterCanvas = (characters, hint) => {
  centerAll(characters);

  let canvas;

  if (hint.match(/[🌈🏳️‍🌈]/u)) {
    canvas = 'pride';
  }

  const characterCanvas = generateCanvas(canvas);

  for (let i = 0; i < characterCanvas.length; i++) {
    for (let j = 0; j < characterCanvas[i].length; j++) {
      if (characters[i][j] === null || characters[i][j] === 0) {
        characters[i][j] = characterCanvas[i][j];
      }
    }
  }
};

const canvasModes = ['random', 'blank', 'color', 'pride', 'colorUnderscore'];
exports.canvasMode = null;

const canvases = {
  random: () => Array.from({length: 6}, () => Array.from({length: 22}, () => _.sample(colorCharacters))),
  blank: () => Array.from({length: 6}, () => Array.from({length: 22}, () => 0)),
  color: () => {
    const colorCode = _.sample(colorCharacters);
    return Array.from({length: 6}, () => Array.from({length: 22}, () => colorCode));
  },
  colorUnderscore: () => {
    const colorCode = _.sample(colorCharacters);
    return [
      Array.from({length: 22}, () => 0),
      Array.from({length: 22}, () => 0),
      Array.from({length: 22}, () => 0),
      Array.from({length: 22}, () => 0),
      Array.from({length: 22}, () => colorCode),
      Array.from({length: 22}, () => colorCode),
    ];
  },
  pride: () => {
    return [
      Array.from({length: 22}, () => characterToCode('🟥')),
      Array.from({length: 22}, () => characterToCode('🟧')),
      Array.from({length: 22}, () => characterToCode('🟨')),
      Array.from({length: 22}, () => characterToCode('🟩')),
      Array.from({length: 22}, () => characterToCode('🟦')),
      Array.from({length: 22}, () => characterToCode('🟪')),
    ];
  }
};

const generateCanvas = (mode) => {
  const fn = canvases[mode] || canvases[exports.canvasMode] || canvases[_.sample(Object.keys(canvases))];
  return fn();
};

const charactersToString = (characters) => (
  characters.map(line => (
    line.map(character => {
      characterKey = Object.keys(characterMapping).find(key => (character && key === character.toString())) || '0';
      return characterMapping[characterKey][0];
    }).join('')
  )).join("\n")
);

exports.generateCanvas = generateCanvas;

exports.handler = function (context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();

  const text = event.Body || '';
  console.log('Incoming message', JSON.stringify(text));

  try {
    let characters;

    if (text.toLowerCase() === 'random') {
      characters = generateCanvas('random');
    } else if (text.toLowerCase() === 'clear') {
      characters = generateCanvas('blank');
    } else {
      characters = smartwrap(text, {width: 22}).split('\n').map(line => [...line].map(characterToCode));
      applyCharacterCanvas(characters, text);
    }

    if (characters.length > 6) {
      console.log('too long');
      twiml.message('Too much text! Try something shorter!');
      return callback(null, twiml);
    } else if (characters.length === 0) {
      console.log('no content');
      twiml.message('Nothing? Really, just .. nothing?');
      return callback(null, twiml);
    }

    fetch(
      `https://platform.vestaboard.com/subscriptions/${process.env.VESTABOARD_SUBSCRIPTION_ID}/message`,
      {
        method: 'post',
        body:    JSON.stringify({ characters }),
        headers: {
          'X-Vestaboard-Api-Key': process.env.VESTABOARD_API_KEY,
          'X-Vestaboard-Api-Secret': process.env.VESTABOARD_API_SECRET,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => {
        console.log('Vestaboard response', res.status, res.statusText);
        return res.json();
      })
      .then(json => {
        console.log(json);
        twiml.message(charactersToString(characters));
        callback(null, twiml);
      })
      .catch(error => {
        console.log(error);
        callback(error);
      });
  } catch (error) {
    console.log(error);
    callback(error);
  }
};
