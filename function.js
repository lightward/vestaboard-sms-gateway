const fetch = require('node-fetch');
const smartwrap = require('smartwrap');
const _ = require('lodash');

const colorCharacters = [63, 64, 65, 66, 67, 68, 69];

const characterMapping = {
  '0': [...'โฌ๏ธ '],
  '1': [...'๐ฐA'],
  '2': [...'๐ฑB'],
  '3': [...'๐ฒC'],
  '4': [...'๐ณD'],
  '5': [...'๐ดE'],
  '6': [...'๐ตF'],
  '7': [...'๐ถG'],
  '8': [...'๐ทH'],
  '9': [...'๐ธI'],
  '10': [...'๐นJ'],
  '11': [...'๐บK'],
  '12': [...'๐ปL'],
  '13': [...'๐ผM'],
  '14': [...'๐ฝN'],
  '15': [...'๐พO'],
  '16': [...'๐ฟP'],
  '17': [...'๐Q'],
  '18': [...'๐R'],
  '19': [...'๐S'],
  '20': [...'๐T'],
  '21': [...'๐U'],
  '22': [...'๐V'],
  '23': [...'๐W'],
  '24': [...'๐X'],
  '25': [...'๐Y'],
  '26': [...'๐Z'],
  '27': [...'1๏ธโฃ1'],
  '28': [...'2๏ธโฃ2'],
  '29': [...'3๏ธโฃ3'],
  '30': [...'4๏ธโฃ4'],
  '31': [...'5๏ธโฃ5'],
  '32': [...'6๏ธโฃ6'],
  '33': [...'7๏ธโฃ7'],
  '34': [...'8๏ธโฃ8'],
  '35': [...'9๏ธโฃ9'],
  '36': [...'0๏ธโฃ0'],
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
  '62': [...'ยฐ'],
  '63': [...'๐ฅโค๏ธ๐โค๏ธโฅ๏ธ๐๐๐๐๐น๐ฅ๐ฎ๐ถ๐๐งจ๐งง๐๐ฅ๐๐ป๐ก๐ฉธโญ๐๐ฉธ๐ท๐น๐บ๐๐'],
  '64': [...'๐ง๐งก๐๐๐งก๐ต๐ฅ๐ ๐ฆ๐ฆ๐๐'],
  '65': [...'๐จ๐๐ป๐โ๐๐๐โจ๐๐ฅ๐๐ผ๐'],
  '66': [...'๐ฉ๐๐๐๐๐ฅ๐ฅฆ๐ฅ๐ฅฌ๐ฅ๐ฅ๐พ๐งฃ๐๐๐ต๐ธ๐๐๐ข๐ฉโโโณ๏ธโ๏ธโป๏ธ๐ฒ๐น๐ฏ๐ณ๐ซ๐ณ๐ฌ๐ต๐ฐ๐ธ๐ฆ๐๐ง๐ฑ๐ฟ๐โ๏ธ๐๐ต๐ด๐ณ๐ฒ๐๏ธ๐๐ธ๐ฒ๐ฆ๐๐ฆ๐ฆ๐ข๐๐๐๐ต๐๐๐พ๐๐๐๐ฅโณ๐'],
  '67': [...'๐ฆ๐๐ฆ๐ฐ๐๐๐ง๐ฌ๐ฅถ๐ง๐'],
  '68': [...'๐ช๐๐๐ฟ๐พ๐๐โฎ๏ธโ๏ธโช๏ธโฏ๏ธโ๏ธ๐ฆน๐ปโโ๏ธ๐ง๐งโโ๏ธ๐๐ผโโ๏ธ๐๐ผโโ๏ธ๐คท๐ผโโ๏ธ๐๐ผโโ๏ธ๐๐ฆโ๏ธโ๏ธ๐ฌ๐ช๐๐ก๐๐ท๐ฎ๐งฌ๐บ๐ฃ๐ช'],
  '69': [...'โฌ๏ธ๐ค๐๐ฆพ๐ช๐ค๐โ๐ซ๐ฆ๐ชจ๐๐ฏ๐ณ๐ฟ๐ชฆ๐โ๐'],
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

const alignLine = (arr) => {
  const length = 22;
  let headLength, tailLength;

  if (Math.random() > 0.5) {
    headLength = Math.floor((length - arr.length)/2);
    tailLength = Math.ceil((length - arr.length)/2);
  } else if(Math.random() > 0.5) {
    headLength = length - arr.length - head.length;
    tailLength = (arr.length + 1) < 0 ? 1 : 1;
  } else {
    headLength = (arr.length + 1) < 0 ? 1 : 1;
    tailLength = length - arr.length - head.length;
  }

  console.log(headLength, tailLength, arr.length);

  arr.unshift(...Array(headLength).fill(null));
  arr.push(...Array(tailLength).fill(null));
};

const makeNullLine = () => Array.from({length: 22}, () => null);

const alignAll = (characters) => {
  if (Math.random() > 0.5) {
    characters.forEach(alignLine);

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
  } else if(Math.random() > 0.5) {
    for (; characters.length < 6;) {
      characters.unshift(makeNullLine());
    }
  } else if(Math.random() > 0.5) {
    for (; characters.length < 6;) {
      characters.push(makeNullLine());
    }
  }
};

const applyCharacterCanvas = (characters, hint) => {
  alignAll(characters);

  let canvas;

  if (hint.match(/[๐๐ณ๏ธโ๐]/u)) {
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
      Array.from({length: 22}, () => characterToCode('๐ฅ')),
      Array.from({length: 22}, () => characterToCode('๐ง')),
      Array.from({length: 22}, () => characterToCode('๐จ')),
      Array.from({length: 22}, () => characterToCode('๐ฉ')),
      Array.from({length: 22}, () => characterToCode('๐ฆ')),
      Array.from({length: 22}, () => characterToCode('๐ช')),
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
