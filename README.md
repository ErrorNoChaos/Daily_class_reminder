# 📅 Timetable Reminder Bot

A Google Apps Script that reads your weekly class schedule from
Google Sheets and automatically sends a Telegram message every
morning at 7 AM with your classes for the day.

## How it works

1. Your class schedule lives in a Google Sheet
2. A time-based trigger fires every morning at 7 AM IST
3. The script reads today's classes from the sheet
4. A formatted message is sent to your Telegram via Bot API

## Sample message
Good morning! 🌅
Classes today (Monday):

A2 Software Eng.
🕐 2:00 PM to 3:00 PM
B2 AI
🕐 3:00 PM to 4:00 PM
G Business Model
🕐 5:00 PM to 6:00 PM

⚡ First class at 2:00 PM — don't be late!
## Tech stack

- Google Apps Script (JavaScript)
- Google Sheets (database)
- Telegram Bot API (notifications)
- Google Apps Script Triggers (scheduler)

## Google Sheet format

Your sheet must have these exact column headers in row 1:

| subject | day | start_time | end_time |
|---|---|---|---|
| Data Structures | Monday | 09:00 | 10:00 |
| Mathematics | Tuesday | 11:00 | 12:00 |

- **subject** — class name
- **day** — full day name (Monday, Tuesday... Saturday, Sunday)
- **start_time** — time in HH:MM format
- **end_time** — time in HH:MM format

## Setup instructions

### Step 1 — Create your Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the prompts
3. Copy the bot token you receive
4. Start a chat with your bot (press Start)
5. Visit this URL to get your chat ID:
Find the `"id"` value inside `"chat"`

### Step 2 — Set up Google Sheet

1. Create a new Google Sheet
2. Add headers in row 1: `subject`, `day`, `start_time`, `end_time`
3. Fill in your weekly schedule

### Step 3 — Add the script

1. In your Google Sheet go to **Extensions → Apps Script**
2. Delete the default code
3. Paste the contents of `Code.gs`
4. Click Save

### Step 4 — Add credentials

1. In Apps Script click the **gear icon → Script Properties**
2. Add these two properties:

| Property | Value |
|---|---|
| `TELEGRAM_TOKEN` | your bot token from BotFather |
| `TELEGRAM_CHAT_ID` | your numeric chat ID |

### Step 5 — Test it

1. Select `debugTest` from the function dropdown
2. Click **Run**
3. Check the Execution log — you should see your classes listed

### Step 6 — Set the daily trigger

1. Click the **clock icon** in the left sidebar
2. Click **+ Add Trigger**
3. Fill in:
   - Function: `sendDailyReminder`
   - Event source: `Time-driven`
   - Type: `Day timer`
   - Time: `6am to 7am`
4. Click **Save**

Done! Every morning at 7 AM you will receive a Telegram message
with your classes for the day.

## Testing other days

To preview what the message looks like for a specific day,
change the day string in `debugTest()` and run it:

```javascript
function debugTest() {
  const today = "Wednesday"; // change this
  ...
}
```

## Notes

- The script uses IST (Asia/Kolkata) timezone automatically
- If you have no classes on a day, it sends a free day message
- Credentials are stored in Script Properties, not in the code
- Google provides free hosting — no server needed

## Project structure
