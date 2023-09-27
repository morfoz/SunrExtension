// variables
const countries = ['Australia', 'Belgium', 'Bulgaria', 'Chile', 'Germany', 'Guyana', 'Israel', 'Italy', 'Japan', 'Luxembourg', 'Malta', 'Poland', 'Polynesia', 'Spain', 'UK', 'USA']
countries.sort();

var emojiImagePairs = {
  '🇦🇺': 'img/flags/australia.png',
  '🇧🇪': 'img/flags/belgium.png',
  '🇧🇬': 'img/flags/bulgaria.png',
  '🇨🇱': 'img/flags/chile.png',
  '🇩🇪': 'img/flags/germany.png',
  '🇬🇫': 'img/flags/guyana.png',
  '🇮🇱': 'img/flags/israel.png',
  '🇮🇹': 'img/flags/italy.png',
  '🇯🇵': 'img/flags/japan.png',
  '🇱🇺': 'img/flags/luxembourg.png',
  '🇲🇹': 'img/flags/malta.png',
  '🇵🇱': 'img/flags/poland.png',
  '🇵🇫': 'img/flags/polynesia.png',
  '🇪🇸': 'img/flags/spain.png',
  '🇬🇧': 'img/flags/uk.png',
  '🇺🇸': 'img/flags/usa.png',
};

// Create a mapping from country names to image paths
let countryImagePairs = {
  'Australia': 'img/flags/australia.png',
  'Belgium': 'img/flags/belgium.png',
  'Bulgaria': 'img/flags/bulgaria.png',
  'Chile': 'img/flags/chile.png',
  'Germany': 'img/flags/germany.png',
  'Guyana': 'img/flags/guyana.png',
  'Israel': 'img/flags/israel.png',
  'Italy': 'img/flags/italy.png',
  'Japan': 'img/flags/japan.png',
  'Luxembourg': 'img/flags/luxembourg.png',
  'Malta': 'img/flags/malta.png',
  'Poland': 'img/flags/poland.png',
  'Polynesia': 'img/flags/polynesia.png',
  'Spain': 'img/flags/spain.png',
  'UK': 'img/flags/uk.png',
  'USA': 'img/flags/usa.png'
};


let projectTypes = ['Carport', 'Floating', 'Ground', 'Rooftop'];

var projectImagePairs = {
  'Ground': 'img/type/ground.png',
  'Rooftop': 'img/type/rooftop.png',
  'Carport': 'img/type/carport.png',
  'Floating': 'img/type/floating.png'
};

var menuItems = [
  { name: 'Contacts', link: 'https://app-eu1.hubspot.com/contacts/26693160/contacts' },
  { name: 'Companies', link: 'https://app-eu1.hubspot.com/contacts/26693160/companies' },
  { name: 'Deals', link: 'https://app-eu1.hubspot.com/contacts/26693160/deals' },
  { name: 'Tasks', link: 'https://app-eu1.hubspot.com/tasks/26693160' },
  { name: 'Tickets', link: 'https://app-eu1.hubspot.com/contacts/26693160/tickets' },
  { name: 'Dashboard', link: 'https://app-eu1.hubspot.com/reports-dashboard/26693160' },
];

// functions

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
      
      var dateParts = dateSpan.textContent.split('/');
      var date = new Date(dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2]);
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

function handleLabelActions() {
  // Select all label elements
  var labels = document.querySelectorAll('span[data-test-id="cdbc-property-label"]');
  
  // Define a function to get next element of a certain tag
  function getNextElement(element, tagName) {
    while (element = element.nextSibling) {
      if (element.tagName.toLowerCase() === tagName) {
        return element;
      }
    }
    return null;
  }
  
  labels.forEach(function(label) {
    // Common actions (ulAncestor and divElement) needed for both 'Project type:' and 'Country'
    var ulAncestor = label.closest('ul');
    var divElement = ulAncestor ? getNextElement(ulAncestor, 'span') : null;
    
    if (label.textContent.trim() === 'Project type:') {
      label.parentElement.style.display = 'none';
      var valueSpan = label.parentElement.querySelector('span[data-test-id="cdbc-property-value"]');
      var text = valueSpan ? valueSpan.textContent.trim() : '';
      if (text in projectImagePairs) {
        var imgElement = document.createElement('img');
        imgElement.src = chrome.runtime.getURL(projectImagePairs[text]);
        imgElement.style.height = '20px';
        imgElement.style.verticalAlign = 'text-bottom';
        imgElement.title = text;
        var newSpan = document.createElement('span');
        newSpan.className = "fStvms tag";
        newSpan.appendChild(imgElement);
        if (divElement) {
          divElement.appendChild(newSpan);
        }
      }
      
    } else if (label.textContent.includes('Country')) {
      label.parentElement.style.display = 'none';
      var valueSpan = label.parentElement.querySelector('span[data-test-id="cdbc-property-value"]');
      var newSpan = document.createElement('span');
      newSpan.className = "fStvms tag";
      newSpan.innerText = valueSpan ? valueSpan.textContent : '';
      if (divElement) {
        divElement.appendChild(newSpan);
      }
    }
  });
}



function replaceFlagEmojis() {
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

// Function to hide labels with 'Country'


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
// Function to calculate and update total power for each column
function calculateAndUpdateTotalPower() {
  // Get all columns
  let columns = document.querySelectorAll('div[data-test-id="cdb-column"]');
  
  // Iterate over each column
  columns.forEach((column) => {
    let totalPower = 0;
    
    // Get all cards in the column that are not hidden
    let cards = column.querySelectorAll('div[data-test-id="cdb-column-item"]:not([style="display: none;"])');
    
    // Iterate over each card
    cards.forEach((card) => {
      // Find the power element in the card
      let powerElement = card.querySelector('div[data-selenium-test="card-property"] span[data-test-id="cdbc-property-value"] span');
      
      // If power element found, parse its value and add to totalPower
      if (powerElement) {
        let powerValue = parseFloat(powerElement.innerText);
        if (!isNaN(powerValue)) {
          totalPower += powerValue;
        }
      }
    });
    
    // Find the footer element and update the total power value
    let footerElement = column.querySelector('div[data-test-id="cdb-column-footer"] span[data-test-id="summary-line-1"] span:nth-child(2)');
    if (footerElement) {
      footerElement.innerText = `${totalPower} MWp`;
    } else {
      console.log('Footer element not found in column');
    }
  });
}




// Creating the filter menu
function createFiltersSidebar() {
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


function createFilterControls(sidebar, titleText, items, countFunction, imagePairs) {
  let title = document.createElement('h2');
  title.textContent = titleText;
  sidebar.appendChild(title);

  let container = document.createElement('div');
  container.id = titleText.replace(/\s+/g, '-').toLowerCase() + '-container';

  items.forEach(item => {
      let control = document.createElement('div');
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = item;
      checkbox.checked = true;

      let label = document.createElement('label');
      label.htmlFor = item;
      label.style.marginLeft = "5px";

      let img = document.createElement('img');
      if (imagePairs[item]) {
          img.src = chrome.runtime.getURL(imagePairs[item]);
          img.style.height = '15px';
          img.style.width = '15px';
          img.style.marginRight = '5px';
      } else {
          console.error('No image found for item: ', item);
      }

      label.appendChild(img);
      label.appendChild(document.createTextNode(item + ' (' + countFunction(item) + ')'));

      control.appendChild(checkbox);
      control.appendChild(label);
      container.appendChild(control);

      checkbox.addEventListener('change', filterCards);  // Lier directement la fonction filterCards à l'événement change
  });

  sidebar.appendChild(container);

  let toggleCheckAll = document.createElement('p');
  toggleCheckAll.textContent = 'Uncheck All';
  toggleCheckAll.style.fontWeight = 'bold';
  toggleCheckAll.style.cursor = 'pointer';
  sidebar.appendChild(toggleCheckAll);

  let isAllChecked = true;

  toggleCheckAll.addEventListener('click', function() {
      let checkboxes = document.querySelectorAll(`#${container.id} input[type="checkbox"]`);
      isAllChecked = !isAllChecked;
      checkboxes.forEach((checkbox) => {
          checkbox.checked = isAllChecked;
          filterCards();  // Appeler filterCards après avoir changé l'état de la case à cocher
      });

      toggleCheckAll.textContent = isAllChecked ? 'Uncheck All' : 'Check All';
  });
}



function countLabelInCards(countryName) {
  var elements = document.querySelectorAll('[data-test-id="cdbc-property-value"] span span');
  var count = 0;
  
  elements.forEach(function(element) {
    if (element.textContent.includes(countryName)) {
      count++;
    }
  });
  
  return count;
}


function getCardCountry(card) {
  let countryElement = card.querySelector('[data-test-id="cdbc-property-1"] [data-test-id="cdbc-property-value"] span');
  return countryElement ? countryElement.textContent.trim() : null;
}

function getCardProjectType(card) {
  let projectTypeElement = card.querySelector('[data-test-id="cdbc-property-2"] [data-test-id="cdbc-property-value"] span');
  return projectTypeElement ? projectTypeElement.textContent.trim() : null;
}


function filterCards() {
  let checkedCountries = [...document.querySelectorAll('#filter-by-country-container input[type="checkbox"]:checked')].map(checkbox => checkbox.id);
  let checkedProjectTypes = [...document.querySelectorAll('#filter-by-project-type-container input[type="checkbox"]:checked')].map(checkbox => checkbox.id);

  document.querySelectorAll('[data-test-id="cdb-column-item"]').forEach(card => {
      let cardCountry = getCardCountry(card);
      let cardProjectType = getCardProjectType(card);

      let countryMatch = checkedCountries.includes(cardCountry);
      let projectTypeMatch = checkedProjectTypes.includes(cardProjectType);

      card.style.display = (countryMatch && projectTypeMatch) ? 'block' : 'none';
  });
  calculateAndUpdateTotalPower();
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
      handleLabelActions();
      toggleHeader();
      replaceFlagEmojis();
      clearInterval(checkExist);
      let sidebar = createFiltersSidebar();
      createFilterControls(sidebar, 'Filter by country', countries, countLabelInCards, countryImagePairs, filterCards);
      createFilterControls(sidebar, 'Filter by project type', projectTypes, countLabelInCards, projectImagePairs, filterCards);

      initializeFilters();
      
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
