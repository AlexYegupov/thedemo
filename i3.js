// working via googleapis with table https://docs.google.com/spreadsheets/d/1-SIrWNLeDRTDHdjqcsChrkWNYKzzlar223kK83Ovmew/edit#gid=0

const { google } = require('googleapis');

// global auth https://github.com/googleapis/google-api-nodejs-client#service-account-credentials
google.options({
  auth: new google.auth.GoogleAuth({
    keyFile: './privatekey.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
});

//console.log(`Supported google apis:`, google.getSupportedAPIs())

const formatDateTimeToCell = (d) => d.toISOString().replace('Z', '');

const sheets = google.sheets('v4');
const spreadsheetId = '1-SIrWNLeDRTDHdjqcsChrkWNYKzzlar223kK83Ovmew';

(async () => {
  // update
  try {
    const d = new Date();

    const result = await sheets.spreadsheets.values.update(
      {
        spreadsheetId,
        range: 'Sheet1!B3:C4',
        valueInputOption:'USER_ENTERED',
        resource: {
          values: [
            ['B3', formatDateTimeToCell(d)],
            ['C3', 'C4']
          ],
        },
      }
    )
    console.log(`Updated: ${result.data.updatedCells} cells`)
  } catch (error) {
    console.error('Update error:', error)
  }

  // get
  try {
    const getResult = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!B2:C4'
    })
    console.log('Got values:', getResult.data.values)
  } catch (error) {
    console.error('Get error:', error)
  }


})()
