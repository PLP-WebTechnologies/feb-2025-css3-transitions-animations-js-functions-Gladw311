// Storage key for user preference
const STORAGE_KEY = 'animationEnabled';

const animateBtn = document.getElementById('animateBtn');
const toggle = document.getElementById('animationToggle');

// Load user preference from localStorage, default true
function loadPreference() {
  let pref = localStorage.getItem(STORAGE_KEY);
  if (pref === null) {
    return true; // Default enabled
  }
  return pref === 'true';
}

// Save user preference to localStorage
function savePreference(value) {
  localStorage.setItem(STORAGE_KEY, value);
}

// Apply animation state to button and toggle
function applyAnimationState(enabled) {
  toggle.checked = enabled;
  animateBtn.setAttribute('aria-pressed', enabled.toString());
}

// Trigger pulse animation on the button
function triggerAnimation() {
  if (!loadPreference()) return; // If disabled, do nothing
  animateBtn.classList.remove('pulse-animation');
  // Trigger reflow to restart animation
  void animateBtn.offsetWidth;
  animateBtn.classList.add('pulse-animation');
}

// On button click, trigger animation and save preference = true
animateBtn.addEventListener('click', () => {
  if (!loadPreference()) return;
  triggerAnimation();
  savePreference(true);
  applyAnimationState(true);
});

// Toggle switch change: enable or disable animations
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  savePreference(enabled);
  applyAnimationState(enabled);
});

// On page load, apply saved preference
window.addEventListener('load', () => {
  const enabled = loadPreference();
  applyAnimationState(enabled);
});

