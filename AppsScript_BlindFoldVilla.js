// ─── Blindfold Villa — Season 2 Lead Sheet ───────────────────────────────────
// 1. Go to script.google.com → New Project → paste this
// 2. Deploy → New Deployment → Web App
//    Execute as: Me | Who has access: Anyone
// 3. Copy the Web App URL → paste into Season2Section.jsx SHEET_URL

function doPost(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Create header row on first run
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "Email"]);
      var hr = sheet.getRange(1, 1, 1, 4);
      hr.setBackground("#0a0005");
      hr.setFontColor("#c9a84c");
      hr.setFontWeight("bold");
      hr.setFontSize(11);
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160);
      sheet.setColumnWidth(2, 180);
      sheet.setColumnWidth(3, 150);
      sheet.setColumnWidth(4, 220);
      sheet.setName("Season 2 Leads");
    }

    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "No POST data" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data      = JSON.parse(e.postData.contents);
    var now       = new Date();
    var istDate   = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    var timestamp = Utilities.formatDate(istDate, "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");

    sheet.appendRow([
      timestamp,
      data.name  || "",
      data.phone || "",
      data.email || "",
    ]);

    var newRow   = sheet.getLastRow();
    var rowRange = sheet.getRange(newRow, 1, 1, 4);
    rowRange.setBackground(newRow % 2 === 0 ? "#1a0a0f" : "#0d0507");
    rowRange.setFontColor("#ffffff");
    rowRange.setFontSize(10);
    rowRange.setVerticalAlignment("middle");
    sheet.setRowHeight(newRow, 36);

    console.log("✅ Lead saved — row " + newRow + " — " + (data.name || "?") + " — " + (data.email || "?"));

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: newRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error("doPost error:", err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Blindfold Villa Season 2 Lead Sheet is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run this in Apps Script editor to test without deploying
function testSubmit() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name:  "Test User",
        phone: "+91 99999 00000",
        email: "test@blindfoldvilla.com",
      })
    }
  };
  Logger.log(doPost(fakeEvent).getContent());
}
