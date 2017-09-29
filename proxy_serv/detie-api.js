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
        (typeof v) !== 'object';
    })
    .forEach(([k, v]) => hashdata[k] = v)

  const hasher = crypto.createHash('md5')
  const keys = Object.keys(hashdata)
  keys.sort();

  //keys.forEach(k => console.log(`${k}=${hashdata[k]}`))
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
      res.on('data', data => {
        receivedData.push(data);
        //resolve(data.toString('utf-8'));
      });
      res.on('end', _ => {
        const resText = Buffer.concat(receivedData).toString('utf-8');
        if (statusCode == 423) {
          rej(new ErrorAgain());
        }
        else if (statusCode != 200) {
          const e = new Error(statusCode);
          e.statusCode = statusCode;
          e.message = resText;
          rej(e);
        }
        else {
          resolve(resText);
        }
      });
    }
  );

  req.on('error', (e) => {
    console.error(e);
    rej(e);
  });
  req.end();
});

const sendPostRequest = (baseUrl, api_key, secret, params) => new Promise((resolve, rej) =>{
  const sign = signature_of(api_key, secret, params);
  sign["Content-Type"] = "application/json";
  console.log(sign);

  const receivedData = [];

  const req = https.request({
      ...urlParse(baseUrl),
      method: 'POST',
      headers: sign,
    },
    res => {
      console.log('statusCode:', res.statusCode);
      const statusCode = res.statusCode
      res.on('data', data => {
        receivedData.push(data);
        //resolve(data.toString('utf-8'));
      });
      res.on('end', _ => {
        const resText = Buffer.concat(receivedData).toString('utf-8');
        if (statusCode == 423) {
          rej(new ErrorAgain());
        }
        else if (statusCode < 200 || statusCode > 299) {
          const e = new Error(statusCode);
          e.statusCode = statusCode;
          e.message = resText;
          rej(e);
        }
        else {
          console.log(res.headers)
          resolve(resText);
        }
      });
    }
  );

  req.on('error', (e) => {
    console.error(e);
    rej(e);
  });
  req.write(JSON.stringify(params));
  req.end();
});

const api_key = "1fdeae6e7fd44c9e991d21066a828f0c"
const secret = "4dae4d6a-4874-4d60-8eac-67701520671d"

async function sendGet(params) {
  const res = await sendGetRequest("https://alpha.api.detie.cn/api/v2/online_solutions", api_key, secret, {
      "from": params.from,//"ST_E020P6M4",
      "to": params.to,//"ST_EMYR64OX",
      "date": params.date,//"2017-11-08",
      "time": params.time,//"11:00",
      "adult": params.adult,//1,
      "child": params.child//0
    });
  const token = JSON.parse(res).async;
  while (true) {
    try {
      const res = await sendGetRequest("https://alpha.api.detie.cn/api/v2/async_results/" + token, api_key, secret, {
        async_key: token
      });
      return res;
    } catch (e) {
      if (e instanceof ErrorAgain) {
        console.log('retrying...')
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      throw e;
    }
  }
}

async function sendPost(params) {
  const res = await sendPostRequest("https://alpha.api.detie.cn/api/v2/online_orders", api_key, secret, {
    "contact": {
      "name": "Liping",
      "email": "lp@163.com",
      "phone": "10086",
      "address": "beijing",
      "postcode": "100100"
    },
    "passengers": [
      {
        "last_name": "zhang",
        "first_name": "san",
        "birthdate": "1986-09-01",
        "passport": "A123456",
        "email": "x@a.cn",
        "phone": "15000367081",
        "gender": "male"
      }
    ],
    "sections": [
      "P_1LDC989",
    ],
    "seat_reserved": true
    });
  const token = JSON.parse(res).async;
  while (true) {
    try {
      const res = await sendGetRequest("https://alpha.api.detie.cn/api/v2/async_results/" + token, api_key, secret, {
        async_key: token
      });
      return res;
    } catch (e) {
      if (e instanceof ErrorAgain) {
        console.log('retrying...')
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      throw e;
    }
  }
}

module.exports = {
  sendGet,
  sendPost,
};
