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

const sendRequest = options => new Promise((resolve, reject) => {
  const receivedData = [];
  const data = options.data;
  options.data = undefined;

  const req = https.request(options, res => {
      //console.log('statusCode:', res.statusCode);
      const statusCode = res.statusCode
      res.on('data', data => {
        receivedData.push(data);
      });
      res.on('end', _ => {
        const resText = Buffer.concat(receivedData).toString('utf-8');
        if (statusCode == 423) {
          reject(new ErrorAgain());
        }
        else if (statusCode < 200 || statusCode > 299) {
          const e = new Error(statusCode);
          e.statusCode = statusCode;
          e.message = resText.slice(0, 40);
          e.fullMessage = resText;
          reject(e);
        }
        else {
          resolve(resText);
        }
      });
    }
  );

  req.on('error', (e) => {
    console.error(e);
    reject(e);
  });
  if (data) {
    req.write(data);
  }
  req.end();
});

const sendGetRequest = (url, api_key, secret, params) => {
  const sign = signature_of(api_key, secret, params);
  //console.log(sign);

  return sendRequest({
    ...urlParse(url),
    headers: sign,
  });
};

const sendPostRequest = (baseUrl, api_key, secret, params) => {
  const sign = signature_of(api_key, secret, params);
  sign["Content-Type"] = "application/json";
  //console.log(sign);

  const receivedData = [];

  return sendRequest({
    ...urlParse(baseUrl),
    method: 'POST',
    headers: sign,
    data: JSON.stringify(params)
  })
};

const api_key = "be9ef6f506d84d80bc8cd555e4555e3d"
const secret = "01bd37a7-fcf7-40cf-8a34-1b3c353ab375"

async function pollingResults (token) {
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

async function searchSolutions(params) {
  /* params:{
      "from": params.from,//"ST_E020P6M4",
      "to": params.to,//"ST_EMYR64OX",
      "date": params.date,//"2017-11-08",
      "time": params.time,//"11:00",
      "adult": params.adult,//1,
      "child": params.child//0
    }*/
  const baseUrl = "https://alpha.api.detie.cn/api/v2/online_solutions";
  const queryString = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  const url = `${baseUrl}?${queryString}`;

  const res = await sendGetRequest(url, api_key, secret, params);

  return await pollingResults(JSON.parse(res).async);
}

async function makeBooking(params) {
  /* params:
  {
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
        booking_code,// WARN: this need to be copied from recent `searchSolutions`
      ],
      "seat_reserved": true
  }*/
  const res = await sendPostRequest("https://alpha.api.detie.cn/api/v2/online_orders", api_key, secret, params);
  return await pollingResults(JSON.parse(res).async);
}

async function makeConfirm(confirmID, params) {
  /* params:
    {
      online_order_id: confirmID
      credit_card: {
              number: "37887690145",
                exp_month: 11,
                exp_year: 20,
                cvv: "123"
            }
    }
  */
  params.online_order_id = confirmID;

  const url = `https://alpha.api.detie.cn/api/v2/online_orders/${confirmID}/online_confirmations`;
  console.log(url);
  const res = await sendPostRequest(url, api_key, secret, params);
  const async_token = JSON.parse(res).async;
  console.log(`confirm async token: ${async_token}`);
  return await pollingResults(async_token);
}

module.exports = {
  searchSolutions,
  makeBooking,
  makeConfirm,
};
