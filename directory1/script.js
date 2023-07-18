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

  var elements = document.querySelectorAll('body *');

  elements.forEach(function (element) {
    Array.from(element.childNodes).forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        for (var emoji in emojiImagePairs) {
          var index = child.nodeValue.indexOf(emoji);
          if (index !== -1) {
            var imgElement = document.createElement('img');
            imgElement.src = chrome.runtime.getURL(emojiImagePairs[emoji]);
            imgElement.style.height = '18px';
            imgElement.style.verticalAlign = 'middle';
            
            var textBefore = child.nodeValue.substring(0, index);
            var textAfter = child.nodeValue.substring(index + emoji.length);
            
            if (textBefore.length > 0) {
              element.insertBefore(document.createTextNode(textBefore), child);
            }

            element.insertBefore(imgElement, child);

            if (textAfter.length > 0) {
              child.nodeValue = textAfter;
            } else {
              element.removeChild(child);
            }
          }
        }
      }
    });
  });
}


function toggleHeader() {
  // Locate the header and filter bar
  let header = document.querySelector('header');
  let filterBar = document.querySelector('[data-onboarding="filter-bar"]');

  // If the checkbox already exists, don't add it again
  if (document.querySelector('#toggleHeader')) {
      return;
  }

  // Create the checkbox and append it to the menu
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'toggleHeader';
  checkbox.checked = false; // By default, the checkbox is not checked (header and filter bar are hidden)

  let menu = document.querySelector('.primary-links');
  menu.appendChild(checkbox);

  // Create a label for the checkbox and append it to the menu
  let label = document.createElement('label');
  label.htmlFor = 'toggleHeader';
  menu.appendChild(label);

  // Hide the header and filter bar by default
  header.style.display = 'none';
  if(filterBar) {  // Check if filterBar is not null
      filterBar.style.display = 'none';
  }

  // Toggle the display of the header and filter bar when the checkbox is checked
  checkbox.addEventListener('change', function() {
      let header = document.querySelector('header');
      let filterBar = document.querySelector('[data-onboarding="filter-bar"]');
      header.style.display = this.checked ? 'block' : 'none';
      if(filterBar) { // Check if filterBar is not null
          filterBar.style.display = this.checked ? 'block' : 'none';
      }
  });
}



// --------------- Sidebar filter function
// ---- Countries sidebard
const countries = ['Italy', 'USA', 'Israel', 'Japan', 'Germany', 'Chile', 'UK', 'Bulgaria', 'Australia', 'Bulgaria', 'Spain', 'Malta', 'Poland', 'Belgium', 'Guyana', 'Polynesia', 'French Overseas'];
countries.sort();

// Creating the sidebar
function createSidebar() {
  let sidebar = document.createElement('div');
  sidebar.id = 'mySidebar';
  sidebar.style.cssText = 'z-index:1016; position: fixed; top: 0; right: 0; width: 300px; height: 100vh; background-color: #f5f5f5; padding: 20px; overflow: auto; transition: transform 0.3s ease-out; transform: translateX(100%);';
  document.body.appendChild(sidebar);

  if(window.location.pathname.endsWith('/board')) {
      // Creating the button to open the sidebar
      let openBtn = document.createElement('button');
      openBtn.id = 'openBtn'; 
      openBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>`;
      openBtn.style.cssText = 'position: fixed; top: 50%; right: 20px; z-index: 9999; cursor: pointer; background: none; border: none;';
      openBtn.addEventListener('click', openSidebar);
      document.body.appendChild(openBtn);
  }

  // Adding a close button for the sidebar
  let closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = 'position: absolute; top: 20px; right: 10px; cursor: pointer; font-size: 30px;';
  closeBtn.addEventListener('click', closeSidebar);
  sidebar.appendChild(closeBtn);

  return sidebar;
}


// Functions to open and close the sidebar
function openSidebar() {
  document.getElementById('mySidebar').style.transform = 'translateX(0)';
  document.getElementById('openBtn').style.display = 'none'; // Hiding the open button when sidebar is open
}

function closeSidebar() {
  document.getElementById('mySidebar').style.transform = 'translateX(100%)';
  document.getElementById('openBtn').style.display = 'block'; // Displaying the open button when sidebar is closed
}


function createCountryControls(sidebar) {
  let title = document.createElement('h2');
  title.textContent = 'Filter by country';
  sidebar.appendChild(title);

  // Create a container for all the country checkboxes
  let container = document.createElement('div');
  container.id = 'country-container';

  // Create control elements for each country
  countries.forEach(country => {
      let control = document.createElement('div');
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = country;
      checkbox.checked = true;
      let label = document.createElement('label');
      label.htmlFor = country;
      label.appendChild(document.createTextNode(country));

      control.appendChild(checkbox);
      control.appendChild(label);
      container.appendChild(control);

      // Listen to changes in checkbox status
      checkbox.addEventListener('change', handleCountryCheckChange);
  });

  // Append the container to the sidebar
  sidebar.appendChild(container);

  // Add a "Uncheck All" element
  let toggleCheckAll = document.createElement('p');
  toggleCheckAll.textContent = 'Uncheck All';
  toggleCheckAll.style.fontWeight = 'bold';
  toggleCheckAll.style.cursor = 'pointer';
  sidebar.appendChild(toggleCheckAll);

  // Initialize flag to track check status
  let isAllChecked = true;

  // Handle the "Uncheck All" element click
  toggleCheckAll.addEventListener('click', function() {
      let checkboxes = document.querySelectorAll('#country-container input[type="checkbox"]');
      isAllChecked = !isAllChecked; // Toggle the flag
      checkboxes.forEach((checkbox) => {
          checkbox.checked = isAllChecked;
          handleCountryCheckChange({target: checkbox});
      });

      toggleCheckAll.textContent = isAllChecked ? 'Uncheck All' : 'Check All';
  });
}

function handleCountryCheckChange(e) {
  let country = e.target.id;
  let isChecked = e.target.checked;

  // Find all the maps in the country and change their display style
  document.querySelectorAll('.private-truncated-string__inner').forEach(elem => {
      if(elem.textContent.includes(country)){
          elem.closest('[data-test-id="cdb-column-item"]').style.display = isChecked ? 'block' : 'none';
      }
  });
}

function initializeFilters() {
  // Initialize filters
  countries.forEach(country => {
      document.querySelectorAll('.private-truncated-string__inner').forEach(elem => {
          if(elem.textContent.includes(country)){
              elem.closest('[data-test-id="cdb-column-item"]').style.display = 'block';
          }
      });
  });
}



// ---- project types sidebar

/// List of project types ⚠️ THIS DEPENDS ON PROJECT IMAGE CHANGER replaceTags
let projectTypes = ['Ground Mounted', 'Rooftop', 'Carport', 'Floating'];

function createProjectTypeControls(sidebar) {
    // Add a title to the sidebar
    let title = document.createElement('h2');
    title.textContent = 'Filter by project type';
    sidebar.appendChild(title);

    // Create a container for all the project type checkboxes
    let container = document.createElement('div');
    container.id = 'project-types-container';

    // Create control elements for each type of project
    projectTypes.forEach(type => {
        let control = document.createElement('div');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = type;
        checkbox.checked = true;
        let label = document.createElement('label');
        label.htmlFor = type;
        label.appendChild(document.createTextNode(type));

        control.appendChild(checkbox);
        control.appendChild(label);
        container.appendChild(control);

        // Listen to changes in checkbox status
        checkbox.addEventListener('change', handleProjectTypeCheckChange);
    });

    // Append the container to the sidebar
    sidebar.appendChild(container);

    // Add a "Uncheck All" element
    let toggleCheckAll = document.createElement('p');
    toggleCheckAll.textContent = 'Uncheck All';
    toggleCheckAll.style.fontWeight = 'bold';
    toggleCheckAll.style.cursor = 'pointer';
    sidebar.appendChild(toggleCheckAll);

    let isAllChecked = true;

    // Handle the "Uncheck All" element click
    toggleCheckAll.addEventListener('click', function() {
        let checkboxes = document.querySelectorAll('#project-types-container input[type="checkbox"]');
        isAllChecked = !isAllChecked; // Toggle the flag
        checkboxes.forEach((checkbox) => {
            checkbox.checked = isAllChecked;
            handleProjectTypeCheckChange({target: checkbox});
        });
        toggleCheckAll.textContent = isAllChecked ? 'Uncheck All' : 'Check All';
    });
}


function handleProjectTypeCheckChange(e) {
    let type = e.target.id;
    let isChecked = e.target.checked;

    // Find all the cards of the project type and change their display style
    document.querySelectorAll('.private-truncated-string__inner img[title]').forEach(img => {
        if(img.title.includes(type)){
            img.closest('[data-test-id="cdb-column-item"]').style.display = isChecked ? 'block' : 'none';
        }
    });
}

function initializeProjectTypeFilters() {
    // Initialise filters
    projectTypes.forEach(type => {
        document.querySelectorAll('.private-truncated-string__inner img[title]').forEach(img => {
            if(img.title.includes(type)){
                img.closest('[data-test-id="cdb-column-item"]').style.display = 'block';
            }
        });
    });
}


// ---- Wait functions //

document.addEventListener('DOMContentLoaded', toggleHeader);

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
      toggleDateDisplay();
      clearInterval(checkExist);

    }
  }, 500);
}
function waitHelpToLoad() {
  var checkExist = setInterval(function() {
      var elem = document.querySelector("#help-widget-toggle");
      if (elem) {
          togglePowerDisplay();
          replaceTags();
          toggleHeader();
          replaceFlagEmojis();
          clearInterval(checkExist);
          // Execution du code
          let sidebar = createSidebar();
          createCountryControls(sidebar);
          initializeFilters();
          createProjectTypeControls(sidebar);
initializeProjectTypeFilters();

      }
  }, 500);
}




function startAllIntervals() {
  waitMenuToLoad();
  waitCardToLoad();
  waitHelpToLoad();
}

// Fetch the 'injectionEnabled' value
chrome.storage.local.get('injectionEnabled', function(data) {
  if (data.injectionEnabled) {
      startAllIntervals();
  }
});
