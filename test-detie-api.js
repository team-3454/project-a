
const {searchSolutions, makeBooking, makeConfirm} = require('./proxy_serv/detie-api.js');

searchSolutions({
      "from": "ST_D8NNN9ZK",
      "to": "ST_EZVVG1X5",
      "date": "2017-12-08",
      "time": "11:00",
      "adult": 1,
      "child": 0
})
.then(res => {
  //console.log(JSON.stringify(JSON.parse(res)).slice(0, 40));
  //console.log(JSON.stringify(JSON.parse(res), null, 2));

  const results = JSON.parse(res);
  console.log(results[0].solutions[0].sections[0].offers[0].services[0].booking_code);
  const booking_code = results[0].solutions[0].sections[0].offers[0].services[0].booking_code;
  // Promise.resolve('P_ZZIDGQ')

  return makeBooking({
      "contact": {
        "name": "Liping",
        "email": "lp@163.com",
        "phone": "886100100",
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
            "phone": "1500012345#6",
            "gender": "male"
          }
        ],
        "sections": [
          booking_code,// WARN: this need to be copied from recent `searchSolutions`
        ],
        "seat_reserved": true
    });
})
.then(res => {
  const bookInfo = JSON.parse(res);
  //console.log(JSON.stringify(bookInfo, null, 2));
  const confirmCode = bookInfo.id;
  console.log(`confirm ${confirmCode}`);

  return makeConfirm(confirmCode, {
        credit_card: {
              number: "37887690145",
                exp_month: 11,
                exp_year: 20,
                cvv: "123"
            }
  });
})
.then(res => {
  console.log(res);
})
.catch(e => {
  console.error(e);
  console.error(e.statusCode);
})
