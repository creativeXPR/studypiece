// SPO 101 · Ade's kiosk data, shared by lessons and their code cells. The first notebook is 12 days
// (temperature → bottles); the month notebook adds rain and market days (30 days), and is what the
// data, testing and many-features lessons use.

export const NOTEBOOK_PY = 'temps = [26, 27, 28, 29, 30, 30, 31, 32, 33, 34, 35, 36]\nbottles = [14, 18, 31, 38, 47, 53, 58, 71, 77, 92, 96, 108]';

export const MONTH = {
  temp: [29, 37, 29, 25, 25, 33, 27, 33, 27, 26, 33, 33, 27, 24, 31, 33, 29, 27, 28, 28, 25, 26, 30, 33, 37, 33, 25, 34, 35, 37],
  rain: [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  market: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
  bottles: [54, 115, 42, 15, 0, 53, 35, 75, 1, 23, 78, 72, 35, 0, 52, 97, 19, 0, 55, 21, 0, 33, 20, 66, 129, 67, 7, 79, 82, 96],
};

const list = (k) => `[${MONTH[k].join(', ')}]`;
export const MONTH_PY = `temp = ${list('temp')}\nrain = ${list('rain')}\nmarket = ${list('market')}\nbottles = ${list('bottles')}`;

// The month as a pandas table called `df` (code cells using it need packages: ['pandas']).
export const MONTH_DF_PY = `import pandas as pd\n${MONTH_PY}\ndf = pd.DataFrame({"temp": temp, "rain": rain, "market": market, "bottles": bottles})`;
