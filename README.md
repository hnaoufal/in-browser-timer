# In-Browser Timer Extension

A simple browser extension that injects a configurable timer at the top of every page. You can pick between 1, 2, 3 or 5 minutes, start/stop/reset the countdown and the timer changes color from green to yellow to red as time runs out. When the timer expires it keeps counting negatively and displays the message `please come to an end`.

## Installation (Chromium browsers)

1. Clone or download this repository.
2. Open `chrome://extensions` in the browser.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the folder of this project.
5. Navigate to any page to see the timer.

## Usage

- Pick a duration from the dropdown and press **Start**.
- **Stop** pauses the timer, **Reset** returns to the chosen duration.
- The background color indicates remaining time:
  - Green: 50–100%
  - Yellow: 20–50%
  - Red: 0–20% (and when over time)
- After the countdown passes zero it goes negative and displays *please come to an end*.

The extension does not require any special permissions and runs as a content script on all pages.
