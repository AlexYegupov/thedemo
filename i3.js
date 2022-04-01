// working via googleapis with table https://docs.google.com/spreadsheets/d/1-SIrWNLeDRTDHdjqcsChrkWNYKzzlar223kK83Ovmew/edit#gid=0

const { google } = require('googleapis');
const sheets = google.sheets('v4');

let privatekey = require("./privatekey.json");
const spreadsheetId = '1-SIrWNLeDRTDHdjqcsChrkWNYKzzlar223kK83Ovmew';

(async () => {
  //
  // let auth = new google.auth.JWT(
  //   privatekey.client_email,
  //   null,
  //   privatekey.private_key,
  //   ['https://www.googleapis.com/auth/spreadsheets']
  // );
  //
  // //authenticate request
  // try {
  //   const au = await auth.authorize()
  //   console.log('authorized')
  //   //console.log(au)
  // } catch(error) {
  //   throw error
  // }

  const auth = new google.auth.GoogleAuth({
    keyFile: '/path/to/your-secret-key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  // update
  try {
    const result = await sheets.spreadsheets.values.update(
      {
        auth,
        spreadsheetId,
        range: 'Sheet1!B3:C4',
        valueInputOption:'RAW',
        resource: {
          values: [
            ['B3', new Date()],
            ['C3', 'C4']
          ],
        }
      }
    )
    console.log(`Updated: ${result.data.updatedCells} cells`)
  } catch (error) {
    console.error('Update error:', error)
  }

  // get
  try {
    const getResult = await sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId,
      range: 'Sheet1!B2:C4'
    })
    console.log('Got values:', getResult.data.values)
  } catch (error) {
    console.error('Get error:', error)
  }

})()
