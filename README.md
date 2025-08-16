# In-Browser Timer Extension

A lightweight extension that overlays a configurable countdown timer at the top of every page to help you stay on track. Choose between 1, 2, 3 or 5 minutes, start/stop/reset the countdown, and watch the timer shift from green to yellow to red as time runs out. When the timer expires it keeps counting negatively and displays the message `Time's up! Let's wrap things up.`

## Installation (Chromium browsers)

1. Clone or download this repository.
2. Open `chrome://extensions` in the browser.
3. Enable **Developer mode**. (In the top right... it is mostly hidden)
4. Click **Load unpacked** and select the folder of this project.
5. Navigate to any page and use the extension popup to show the timer.

## Usage

- Open the extension popup and click **Show Timer** to display the timer (hidden by default).
- Pick a duration from the dropdown and press **Start**.
- **Stop** pauses the timer, **Reset** returns to the chosen duration.
- The background color indicates remaining time:
  - Green: 50–100%
  - Yellow: 20–50%
  - Red: 0–20% (and when over time)
- After the countdown passes zero it goes negative and displays *Time's up! Let's wrap things up.*

The extension only requests the `activeTab` permission and injects its code on the current page after user interaction.

## Privacy Policy
This extension does not collect, store, or transmit any personal data. All settings (such as timer duration or visibility) are stored only locally in the browser and never leave the device.
