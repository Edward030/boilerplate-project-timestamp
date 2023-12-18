// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req, res) {
  let userDate = req.params.date;
  /*
  date1 = new Date(1451001600000);
  date2 = new Date("1451001600000");
  console.log("date1: ",date1,"date2: ", date2);
  */
  let date = parseInt(userDate, 10);
  console.log(userDate, typeof(userDate), date);

  // 如果日期參數是空的，使用當前時間
  if (!userDate) {
    userDate = new Date();
  } 
  else if (/^\d+$/.test(userDate)) {
    userDate = new Date(parseInt(userDate, 10));
  }
  else {
    userDate = new Date(userDate);
  }
  
  console.log(userDate, userDate.getTime(), !isNaN(userDate.getTime()));
  
  if (!isNaN(userDate.getTime())) {
    // 如果日期有效，返回對應的 JSON 對象
    res.json({
      unix: userDate.getTime(),
      utc: userDate.toUTCString()
    });
  } else {
    // 如果日期無效，返回包含錯誤消息的 JSON 對象
    res.json({ error: "Invalid Date" });
  }
});

/*
// /api/date
const someDay = new Date(1451001600000); 
const formattedDate = someDay.toISOString().substr(0, 10);
const someDayFormat = someDay.getTime();
console.log(someDay.getTime(), someDay, );

app.get(`/api/${formattedDate}`, (req, res) => {
  res.json({
    unix: someDayFormat,
    utc: someDay.toUTCString()
  });
} );
// /api/unix
app.get(`/api/${someDayFormat}`, (req, res) => {
  res.json({
    unix: someDayFormat,
    utc: someDay.toUTCString()
  });
});
*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
