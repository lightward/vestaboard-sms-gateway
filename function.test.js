global.Twilio = require('twilio');

require('jest-fetch-mock').enableMocks()

const fn = require('./function');

test('generates a blank line', () => {
  characters = fn.generateCanvas('blank');
  expect(characters.length).toBe(6);
  expect(characters[0].length).toBe(22);
  expect(characters[1].length).toBe(22);
  expect(characters[2].length).toBe(22);
  expect(characters[3].length).toBe(22);
  expect(characters[4].length).toBe(22);
  expect(characters[5].length).toBe(22);
});

test('generates a random line', () => {
  characters = fn.generateCanvas('random');
  expect(characters.length).toBe(6);
  expect(characters[0].length).toBe(22);
  expect(characters[1].length).toBe(22);
  expect(characters[2].length).toBe(22);
  expect(characters[3].length).toBe(22);
  expect(characters[4].length).toBe(22);
  expect(characters[5].length).toBe(22);
});

beforeEach(() => {
  fn.canvasMode = null;

  process.env.VESTABOARD_SUBSCRIPTION_ID = 'some-subscription-id';
  process.env.VESTABOARD_API_KEY = 'some-api-key';
  process.env.VESTABOARD_API_SECRET = 'some-api-secret';

  fetchMock.mockResponse(req => {
    expect(req.url).toBe('https://platform.vestaboard.com/subscriptions/some-subscription-id/message');
    expect(req.headers.get('X-Vestaboard-Api-Key')).toBe('some-api-key');
    expect(req.headers.get('X-Vestaboard-Api-Secret')).toBe('some-api-secret');

    const data = JSON.parse(req.body.toString());

    expect(data.characters.length).toBe(6);
    
    for (let i = 0; i < 6; i++) {
      expect(data.characters[i].length).toBe(22);
    }

    return Promise.resolve({
      body: JSON.stringify({message: 'hello!'}),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  });
});

test('works with a blank canvas', (done) => {
  fn.canvasMode = 'blank';

  fn.handler(null, {Body: '!!!'}, (error, twiml) => {
    expect(twiml.toString()).toMatch(/⬛{22}/);
    expect(twiml.toString()).toMatch(/⬛!!!⬛/);
    done();
  });
});

test('works with a colorful canvas', (done) => {
  fn.canvasMode = 'random';

  fn.handler(null, {Body: '! ! !'}, (error, twiml) => {
    expect(twiml.toString()).toMatch('🟨');
    expect(twiml.toString()).toMatch(/!\p{Emoji_Presentation}!\p{Emoji_Presentation}!/u);
    done();
  });
});

test('works with a color canvas', (done) => {
  fn.canvasMode = 'color';

  fn.handler(null, {Body: '! ! !'}, (error, twiml) => {
    expect(twiml.toString()).toMatch(/(\p{Emoji_Presentation})\1{10}/u);
    expect(twiml.toString()).toMatch(/!\p{Emoji_Presentation}!\p{Emoji_Presentation}!/u);
    done();
  });
});

test('works with a pride canvas', (done) => {
  fn.canvasMode = 'pride';

  fn.handler(null, {Body: '! ! !'}, (error, twiml) => {
    expect(twiml.toString()).toMatch(/🟥{22}/u);
    expect(twiml.toString()).toMatch(/🟪{22}/u);
    expect(twiml.toString()).toMatch(/!\p{Emoji_Presentation}!\p{Emoji_Presentation}!/u);
    done();
  });
});

test('can take a pride hint', (done) => {
  fn.handler(null, {Body: '! ! !🌈'}, (error, twiml) => {
    expect(twiml.toString()).toMatch(/🟥{22}/u);
    expect(twiml.toString()).toMatch(/🟪{22}/u);
    expect(twiml.toString()).toMatch(/!\p{Emoji_Presentation}!\p{Emoji_Presentation}!/u);
    done();
  });
});
