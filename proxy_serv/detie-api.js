'use strict';

const crypto = require('crypto')
const https = require('https')
const urlParse = require('url').parse

const signature_of = (api_key, secret, params) => {
  const time = Date.now()
  const hashdata = {
    api_key,
    t: Math.floor(time/1000)
  };

  Object.entries(params)
    .filter(([k, v]) => {
      return v != null &&
        !Array.isArray(v) &&
        (typeof v) !== 'Object';
    })
    .forEach(([k, v]) => hashdata[k] = v)

  const hasher = crypto.createHash('md5')
  const keys = Object.keys(hashdata)
  keys.sort();

  keys.forEach(k => console.log(`${k}=${hashdata[k]}`))
  keys.forEach(k => hasher.update(`${k}=${hashdata[k]}`))
  hasher.update(secret)

  return {
    Authorization: hasher.digest('hex'),
    From: api_key,
    Date: new Date(time).toString(),
  };
};

class ErrorAgain extends Error {
}

const sendGetRequest = (baseUrl, api_key, secret, params) => new Promise((resolve, rej) =>{
  const sign = signature_of(api_key, secret, params);
  //console.log(sign);

  const queryString = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  const url = `${baseUrl}?${queryString}`;

  //console.log(url);
  const receivedData = [];

  const req = https.request({
      ...urlParse(url),
      headers: sign,
    },
    res => {
      //console.log('statusCode:', res.statusCode);
      const statusCode = res.statusCode
      if (statusCode == 423) {
        rej(new ErrorAgain());
      }
      else if (statusCode != 200) {
        rej(new Error(statusCode));
      }
      res.on('data', data => {
        receivedData.push(data);
        //resolve(data.toString('utf-8'));
      });
      res.on('end', _ => {
        resolve(Buffer.concat(receivedData).toString('utf-8'));
      });
    }
  );

  req.on('error', (e) => {
    console.error(e);
    rej(e);
  });
  req.end();
});

const api_key = "1fdeae6e7fd44c9e991d21066a828f0c"
const secret = "4dae4d6a-4874-4d60-8eac-67701520671d"

module.exports = function (params) {
  return new Promise((resolve, rej) => {
    sendGetRequest("https://alpha.api.detie.cn/api/v2/online_solutions", api_key, secret, {
      "from": params.from,//"ST_E020P6M4",
      "to": params.to,//"ST_EMYR64OX",
      "date": params.date,//"2017-11-08",
      "time": params.time,//"11:00",
      "adult": params.adult,//1,
      "child": params.child//0
    })
      .then(res => JSON.parse(res).async)
      .then(async (token) => {
        while (true) {
          try {
            const res = await sendGetRequest("https://alpha.api.detie.cn/api/v2/async_results/" + token, api_key, secret, {
              async_key: token
            });
            return res;
          } catch (e) {
            if (e instanceof ErrorAgain) {
              await new Promise(r => setTimeout(r, 1000));
              continue;
            }
            throw e;
          }
        }
      })
      .then(res => resolve(res))
      .catch(err => rej(err));
  });
}
