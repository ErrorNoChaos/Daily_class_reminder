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
