// Require google from googleapis package.
const { google } = require('googleapis')

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

const addCalender = async (eventTitle: string, description: string, eventVenue: string, eventCity: string, eventCountry: string, eventDate: Date, eventTime: Date) => {
    // Create a new instance of oAuth and set our Client ID & Client Secret.
  const oAuth2Client = new OAuth2(
    process.env.GOOGLE_CALENDER_CLIENT_ID,
    process.env.GOOGLE_CALENDER_CLIENT_SECRET
  )

  // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_CALENDER_REFRESH_TOKEN,
  })

  // Create a new calender instance.
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  // Create a new event start date instance for temp uses in our calendar.
  const eventStartTime = new Date()
  eventStartTime.setDate(eventStartTime.getDay() + 2)

  // Create a new event end date instance for temp uses in our calendar.
  const eventEndTime = new Date()
  eventEndTime.setDate(eventEndTime.getDay() + 4)
  eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

  // Create a dummy event for temp uses in our calendar
  const event1 = {
    summary: eventTitle,
    location: eventVenue + ', ' + eventCity + ', ' + eventCountry,
    description,
    colorId: 1,
    start: {
      dateTime: eventDate + 'T' + eventTime,
      timeZone: 'Nigeria/Lagos',
    },
    end: {
      dateTime: eventEndTime,
      timeZone: 'Nigeria/Lagos',
    },
  }

  // Check if we a busy and have an event on our calendar for the same time.
  calendar.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'Nigeria/Lagos',
        items: [{ id: 'primary' }],
      },
    },
    (err: Error, res: any) => {
      // Check for errors in our query and log them if they exist.
      if (err) return console.error('Free Busy Query Error: ', err)

      // Create an array of all events on our calendar during that time.
      const eventArr = res.data.calendars.primary.busy

      // Check if event array is empty which means we are not busy
      if (eventArr.length === 0)
        // If we are not busy create a new calendar event.
        return calendar.events.insert(
          { calendarId: 'primary', resource: event1 },
          (err: Error) => {
            // Check for errors and log them if they exist.
            if (err) return console.error('Error Creating Calender Event:', err)
            // Else log that the event was created.
            return console.log('Calendar event successfully created.')
          }
        )

      // If event array is not empty log that we are busy.
      return console.log(`Sorry I'm busy...`)
    }
  )
}

export default addCalender;
