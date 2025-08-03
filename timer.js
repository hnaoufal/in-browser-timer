(function() {
  const existing = document.getElementById('in-browser-timer');
  if (existing) return; // avoid injecting multiple times

  const container = document.createElement('div');
  container.id = 'in-browser-timer';

  // timer display
  const display = document.createElement('div');
  display.className = 'ibt-display';
  display.textContent = '00:00';

  // controls
  const controls = document.createElement('div');
  controls.className = 'ibt-controls';

  const select = document.createElement('select');
  [1,2,3,5].forEach(min => {
    const opt = document.createElement('option');
    opt.value = min * 60; // seconds
    opt.textContent = `${min} min`;
    select.appendChild(opt);
  });

  const startBtn = document.createElement('button');
  startBtn.textContent = 'Start';

  const stopBtn = document.createElement('button');
  stopBtn.textContent = 'Stop';

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';

  controls.appendChild(select);
  controls.appendChild(startBtn);
  controls.appendChild(stopBtn);
  controls.appendChild(resetBtn);

  const message = document.createElement('div');
  message.className = 'ibt-message';

  container.appendChild(display);
  container.appendChild(controls);
  container.appendChild(message);
  document.body.insertBefore(container, document.body.firstChild);

  let duration = parseInt(select.value, 10);
  let remaining = duration;
  let interval = null;

  chrome.storage?.local.get({ timerVisible: true }, (data) => {
    if (!data.timerVisible) {
      container.style.display = 'none';
    }
  });

  chrome.runtime?.onMessage.addListener((msg) => {
    if (msg.action === 'hideTimer') {
      container.style.display = 'none';
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    } else if (msg.action === 'showTimer') {
      container.style.display = '';
    }
  });

  function format(sec) {
    const s = Math.abs(sec);
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const r = (s % 60).toString().padStart(2, '0');
    return `${sec < 0 ? '-' : ''}${m}:${r}`;
  }

  function updateColor() {
    const pct = (remaining / duration) * 100;
    if (pct > 50) {
      container.style.backgroundColor = '#2ecc71'; // green
    } else if (pct > 20) {
      container.style.backgroundColor = '#f1c40f'; // yellow
    } else {
      container.style.backgroundColor = '#e74c3c'; // red
    }
  }

  function update() {
    display.textContent = format(remaining);
    if (remaining < 0) {
      message.textContent = 'please come to an end';
    } else {
      message.textContent = '';
    }
    updateColor();
  }

  function tick() {
    remaining -= 1;
    update();
  }

  select.addEventListener('change', () => {
    duration = parseInt(select.value, 10);
    remaining = duration;
    update();
  });

  startBtn.addEventListener('click', () => {
    if (interval) return;
    interval = setInterval(tick, 1000);
  });

  stopBtn.addEventListener('click', () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    remaining = duration;
    update();
  });

  update();
})();
