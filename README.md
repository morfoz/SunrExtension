# H'SunR - Hubspot UX Changer
H'SunR is a Chrome extension designed to enhance the user experience on Hubspot. It provides a variety of features such as custom logos, date display toggling, power display toggling, custom menus, tag replacement, flag emoji replacement, and header toggling.
Main Files

    inject.js: This is the main script that runs when the extension is installed or updated. It listens for tab updates and injects the necessary scripts and styles into the page based on the URL.

    script.js: This script contains the main functionality of the extension. It includes functions for adding a custom logo, toggling the date and power displays, replacing tags with images, replacing flag emojis with images, and more.

    manifest.json: This is the manifest file for the extension. It declares the necessary permissions, background scripts, popup, and web accessible resources.

    popup.html: This is the HTML file for the extension's popup. It includes a checkbox to enable or disable the injection of scripts and styles, as well as contact information for support.

# Installation
Download or clone this repository to your local machine.
Open the Chrome browser and navigate to chrome://extensions.
Enable Developer Mode by clicking the toggle switch at the top right.
Click the Load unpacked button and select the directory for this extension.

# Usage
Once installed, the extension will automatically run on the specified URLs. You can enable or disable the injection of scripts and styles by clicking on the extension icon and checking or unchecking the Enable Injection checkbox. Please note that you will need to refresh the page for changes to take effect.
Support

In case of issues with the extension, please contact support@morfoz.fr.


# License
This project is licensed under the GPL-3.0 License.
