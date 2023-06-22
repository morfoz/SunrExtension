document.addEventListener('DOMContentLoaded', () => {
    const injectionCheckbox = document.getElementById('injection-checkbox');
  
    // Get the current state from storage and set the checkbox
    chrome.storage.local.get('injectionEnabled', (data) => {
      injectionCheckbox.checked = data.injectionEnabled;
    });
  
    // Set the new state in storage when the checkbox state changes
    injectionCheckbox.addEventListener('change', () => {
      chrome.storage.local.set({ injectionEnabled: injectionCheckbox.checked });
    });
  });
  