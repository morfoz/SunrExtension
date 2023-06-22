function displayLoadingScreen() {
  var existingOverlay = document.getElementById('loadingOverlay');

  if (!existingOverlay) {
      // Create overlay div
      var overlay = document.createElement('div');
      overlay.id = 'loadingOverlay'; // Add id to the overlay
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = '#fff';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = '9999'; // To make sure the overlay is above everything else

      // Create loading spinner
      var spinner = document.createElement('div');
      spinner.style.border = '16px solid #f3f3f3'; 
      spinner.style.borderTop = '16px solid #884A39'; 
      spinner.style.borderRadius = '50%'; 
      spinner.style.width = '120px'; 
      spinner.style.height = '120px'; 
      spinner.style.animation = 'spin 2s linear infinite'; 

      // Add spinner animation
      var style = document.createElement('style');
      style.innerHTML = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);

      // Append spinner to overlay and overlay to body
      overlay.appendChild(spinner);
      document.body.appendChild(overlay);
  }
}


function removeLoadingScreen() {
  var overlay = document.getElementById('loadingOverlay');
  if (overlay) {
      overlay.remove();
  }
}


function addCustomLogo() {
  var logos = Array.from(document.getElementsByClassName('nav-logo'));
  logos.forEach(function (logo) {
    // Skip logos that have already been updated
    if (logo.dataset.updated) {
      return;
    }

    var newLogo = document.createElement('img');
    newLogo.src = chrome.runtime.getURL('img/logo-sunr.png');
    newLogo.className = 'nav-logo';
    newLogo.style.maxHeight = '30px';
    newLogo.style.verticalAlign = 'middle';
    logo.parentNode.insertBefore(newLogo, logo);
    logo.style.display = 'none';

    // Mark the logo as updated
    logo.dataset.updated = 'true';
  });
}



function toggleDateDisplay() {
  var spans = document.querySelectorAll('[data-test-id="cdbc-property-label"]');
  spans.forEach(function (span) {
    if (span.textContent === 'Expected RTB:') {
      var dateSpan = span.nextElementSibling.querySelector('[data-test-id="cdbc-property-value"] span');

      // Skip spans that have already been updated
      if (dateSpan.dataset.updated) {
        return;
      }

      var date = new Date(dateSpan.textContent);
      var quarter = Math.ceil((date.getMonth() + 1) / 3);

      var quarterSpan = document.createElement('span');
      quarterSpan.textContent = 'Q' + quarter + ' ' + date.getFullYear();
      quarterSpan.style.display = 'inline';
      dateSpan.parentNode.appendChild(quarterSpan);
      dateSpan.style.display = 'none';

      // Mark this dateSpan as updated
      dateSpan.dataset.updated = 'true';
    }
  });
}



function togglePowerDisplay() {
  var spans = document.querySelectorAll('[data-test-id="cdbc-property-label"]');
  spans.forEach(function (span) {
    var valueSpan = span.nextElementSibling.querySelector('[data-test-id="cdbc-property-value"] span[data-selenium-test="currency-component-loaded"] span');
    if (span.textContent === 'Amount:') {
      span.textContent = 'Power:';
      var amount = valueSpan.textContent.substring(1); // remove the leading 'M'
      if (!amount.endsWith('MWp')) {
        valueSpan.textContent = amount + ' MWp';
      }
    }
  });

  // Code for totals
  var totalElements = document.querySelectorAll('span[data-key="indexPage.board.deals.total"]');
  totalElements.forEach(function (totalElement) {
    totalElement.firstElementChild.textContent = 'Total Power: ';
    var totalAmount = totalElement.lastElementChild.textContent.substring(1); // remove the leading 'M'
    if (!totalAmount.endsWith('MWp')) {
      totalElement.lastElementChild.textContent = totalAmount + ' MWp';
    }
  });

  // Code for 'Weighted:'
  var weightedElements = document.querySelectorAll('span[data-key="indexPage.board.deals.weightedTotal.default"]');
  weightedElements.forEach(function (weightedElement) {
    weightedElement.firstElementChild.textContent = 'Weighted Power: ';
    var weightedAmount = weightedElement.childNodes[1].textContent.substring(1); // remove the leading 'M'
    if (!weightedAmount.endsWith('MWp')) {
      weightedElement.childNodes[1].textContent = weightedAmount + ' MWp';
    }
  });
}

function toggleCustomMenu() {
  var ul = document.querySelector('ul.primary-links');
  while (ul.children.length > 1) {
    ul.removeChild(ul.lastChild);
  }

  var menuItems = [
    { name: 'Contacts', link: 'https://app-eu1.hubspot.com/contacts/26693160/contacts' },
    { name: 'Companies', link: 'https://app-eu1.hubspot.com/contacts/26693160/companies' },
    { name: 'Deals', link: 'https://app-eu1.hubspot.com/contacts/26693160/deals' },
    { name: 'Tasks', link: 'https://app-eu1.hubspot.com/tasks/26693160' },
    { name: 'Tickets', link: 'https://app-eu1.hubspot.com/contacts/26693160/tickets' },
    { name: 'Dashboard', link: 'https://app-eu1.hubspot.com/reports-dashboard/26693160' },
  ];

  menuItems.forEach(function (menuItem) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.textContent = menuItem.name;
    a.href = menuItem.link;
    a.classList.add("primary-link");  // Add class to each element
    li.appendChild(a);
    ul.appendChild(li);
  });
}



function replaceTags() {
  // Define the lookup table for text and image pairs
  var textImagePairs = {
    'Ground Mounted': 'img/type/ground.png',
    'Rooftop': 'img/type/rooftop.png',
    'Carport': 'img/type/carport.png',
    'Floating': 'img/type/floating.png'
  };

  // Select all span elements that are tags
  var spans = document.querySelectorAll('span.private-truncated-string__inner span');

  // Check if any spans were found
  if (spans.length > 0) {
    spans.forEach(function (span) {
      // Get the trimmed text content of the span
      var text = span.textContent.trim();
      // Check if the text is in the lookup table
      if (text in textImagePairs) {
        // Create a new img element
        var imgElement = document.createElement('img');

        // Set the img src to the image in your extension's files
        imgElement.src = chrome.runtime.getURL(textImagePairs[text]);

        // Set the style properties of the image
        imgElement.style.height = '20px';
        imgElement.style.verticalAlign = 'middle';
        imgElement.title = text;
        span.parentNode.replaceChild(imgElement, span);
      }
    });
  } else {
    console.log('No spans with the specified text found.');
  }
}

function replaceFlagEmojis() {
  // Define the lookup table for emoji and image pairs
  var emojiImagePairs = {
    '🇧🇬': 'img/flags/bulgaria.png',
    '🇪🇸': 'img/flags/spain.png',
    '🇵🇱': 'img/flags/poland.png',
    '🇩🇪': 'img/flags/germany.png',
    '🇱🇺': 'img/flags/luxembourg.png',
    '🇮🇹': 'img/flags/italy.png',
    '🇮🇱': 'img/flags/israel.png',
    '🇺🇸': 'img/flags/usa.png'
  };

  // Select all elements
  var elements = document.querySelectorAll('body *');
  elements.forEach(function (element) {
    var html = element.innerHTML;

    // Replace the emoji with an img element
    for (var emoji in emojiImagePairs) {
      var imgElement = '<img src="' + chrome.runtime.getURL(emojiImagePairs[emoji]) + '"style="height: 18px;vertical-align: middle;">';
      html = html.replace(new RegExp(emoji, 'g'), imgElement);
    }

    // Update the innerHTML of the element
    element.innerHTML = html;
  });
}

function waitMenuToLoad() {
  var checkExist = setInterval(function () {
    var elem = document.querySelector("#nav-primary-home");
    if (elem) {
      toggleCustomMenu();
      addCustomLogo();
      clearInterval(checkExist);
    }
  }, 500);
}
function waitCardToLoad() {
  var checkExist = setInterval(function () {
    var elem = document.querySelector('[data-test-id="cdb-column-item"]');
    if (elem) {
      clearInterval(checkExist);
      toggleDateDisplay();
      replaceTags();
      
    }
  }, 500);
}
function waitHelpToLoad() {
  var checkExist = setInterval(function() {
      var elem = document.querySelector("#help-widget-toggle");
      if (elem) {
          replaceTags();
          togglePowerDisplay();
          replaceFlagEmojis();
          removeLoadingScreen()
          removeLoadingScreen()
          clearInterval(checkExist);
      }
  }, 500); // check every 500ms
}
displayLoadingScreen();
waitMenuToLoad();
waitCardToLoad();
waitHelpToLoad();

//removeLoadingScreen();