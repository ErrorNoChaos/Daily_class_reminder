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
