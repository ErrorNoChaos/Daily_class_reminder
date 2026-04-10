function sendDailyReminder() {
  const props   = PropertiesService.getScriptProperties();
  const TOKEN   = props.getProperty("TELEGRAM_TOKEN");
  const CHAT_ID = props.getProperty("TELEGRAM_CHAT_ID");

  const today   = getTodayIST();
  const classes = getTodaysClasses(today);
  const message = formatMessage(today, classes);

  sendTelegram(TOKEN, CHAT_ID, message);
}


function getTodayIST() {
  const now       = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime   = new Date(now.getTime() + istOffset);
  const days      = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return days[istTime.getUTCDay()];
}


function getTodaysClasses(today) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                              .getSheetByName("Sheet1");
  const data  = sheet.getDataRange().getValues();
  const rows  = data.slice(1);

  return rows
    .filter(row => String(row[1]).trim() === today)
    .map(row => ({
      subject:    String(row[0]).trim(),
      start_time: Utilities.formatDate(new Date(row[2]), "Asia/Kolkata", "h:mm a"),
      end_time:   Utilities.formatDate(new Date(row[3]), "Asia/Kolkata", "h:mm a")
    }))
    .sort((a, b) => a.start_time.localeCompare(b.start_time));
}


function formatTime(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, "Asia/Kolkata", "h:mm a");
  }
  return String(value).trim();
}


function formatMessage(today, classes) {
  if (classes.length === 0) {
    return "Good morning! 🌅 No classes today — enjoy your free day! 🎉";
  }

  let msg = "Good morning! 🌅\nClasses today (" + today + "):\n\n";
  classes.forEach((c, i) => {
    msg += (i + 1) + ". " + c.subject + "\n";
    msg += "   🕐 " + c.start_time + " to " + c.end_time + "\n\n";
  });
  msg += "⚡ First class at " + classes[0].start_time + " — don't be late!";
  return msg;
}


function sendTelegram(token, chatId, message) {
  const url     = "https://api.telegram.org/bot" + token + "/sendMessage";
  const options = {
    method            : "post",
    contentType       : "application/json",
    payload           : JSON.stringify({
      chat_id : chatId,
      text    : message
    }),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const result   = JSON.parse(response.getContentText());

  if (result.ok) {
    Logger.log("✅ Message sent!");
  } else {
    Logger.log("❌ Error: " + result.description);
  }
}

// function debugTest() {
//   const today   = "Monday"; // change this to any day you want to test
//   const classes = getTodaysClasses(today);
//   const message = formatMessage(today, classes);

//   Logger.log("Today: " + today);
//   Logger.log("Classes found: " + classes.length);
//   Logger.log("Message:\n" + message);
// }
