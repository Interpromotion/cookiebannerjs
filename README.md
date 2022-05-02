
Cookiebannerjs
=========


This is a pure javascript cookie banner opt-in plugin.

## INSTALL

You can get Cookiebannerjs either by downloading or cloning this repository or trought NPM.

```
npm install cookiebannerjs
```

## USAGE

Include the css into your page:
<pre lang="html">
&lt;link rel="stylesheet" type="text/css" href="path/to/cookiebanner.min.css"&gt;
</pre>

Include the script into your page:
<pre lang="html">
&lt;script src="path/to/cookiebanner.min.js"&gt;&lt;/script&gt;
</pre>

Then initialize the plugin:
<pre lang="javascript">
!(function(){
    var cookieBanner = new CookieBanner();
})();
</pre>

#### No parameter is mandatory.

## OPTIONS

Available options:


| Property         | Description                                                      | Type        | DEFAULT |
| ---------------- |----------------------------------------------------------------  | ----------- | ------- |
| policyText | Text to be shown as short policy | String  |  ""  |
| policyUrl | Absolute URL to the complete policy | String | "" |    
| policyUrlText | Text of the link to the complete policy |  String  |   "" |
| popupTitle | Text to be shown as cookie’s preference popup title |  String  |   "" |
| popupDescription | Text to be shown as cookie’s preference popup description |  String  |   "" |
| allowText  | Text for the "allow all cookie" button |  String  |   "Allow cookie" |
| customizeText  | Text for the "customize settings" button |  String  |   "Customize settings" |
| denyText  | Text for the "deny cookie" button |  String  |   "Deny cookie" |
| acceptSelected  | Text for the "accept selected only cookie" button |  String  |   "Accept selected only cookie" |
| acceptAll  | Text for the "accept all cookie" button |  String  |   "Accept all cookie" |
| categories | Object containing cookie categories to be shown in cookie’s preference popup | Object | <pre>necessary: {title : 'Technical cookie', description: 'These cookies are essential for the correct functioning of the website and to provide the service offered and requested by a user. User consent is not needed to use these type of cookies.', consent: true, blocked: true}</pre> |
| cookieName  | Name of the cookie where Cookiebannerjs will save the user conent |  String  |   "cookie_allowed" |
| bannerClass  | CSS class for the banner container |  String | "intP_cookie-banner" |
| bannerHiddenClass | CSS class for the banner container that is applied when user select an option  | String | "intP_cookie-banner__close"  |
| policyTextClass | CSS class for <p> tag containing short policy text | String | "intP_cookie-banner_policy-text" |
| buttonsContainerClass | CSS class for banner buttons container | String | "intP_cookie-banner_buttons" |
| allowButtonClass | CSS class for "allow cookie" button | String | "intP_cookie-banner_allow" |
| customizeButtonClass | CSS class for "customize settings" button | String | "intP_cookie-banner_customize" |
| denyButtonClass | CSS class for "deny cookie" button | String | "intP_cookie-banner_deny" |
| closingAnimationDuration | Time in millisecond for the banner's closing animation duration. This value must be the same of transition .intP_cookie-banner__close property (or the relative custom class setted trought bannerHiddenClass option) in CSS file | Int | 500 |
| popupClass | CSS class for cookie’s preference popup | String | "intP_cookie-popup" |
| descriptionPopupClass | CSS class for cookie’s preference popup description | String | "intP_cookie-popup_description" |
| titleDescriptionPopupClass | CSS class for cookie’s preference popup title | String | "intP_cookie-popup_description_title" |
| cookieListPopupClass | CSS class for cookie’s preference popup cookie categories list container | String | "intP_cookie-popup_list" |
| cookieCatPopupClass | CSS class for cookie’s preference popup cookie category container | String | "intP_cookie-popup_list_coockie-cat" |
| cookieCatHeaderPopupClass | CSS class for cookie’s preference popup cookie category header | String | "intP_cookie-popup_list_coockie-cat_header" |
| cookieTitleCatHeaderPopupClass | CSS class for cookie’s preference popup cookie category title | String | "intP_cookie-popup_list_coockie-cat_header_title" |
| cookieDetailsCatHeaderPopupClass | CSS class for cookie’s preference popup  cookie category details button | String | "intP_cookie-popup_list_coockie-cat_header_details" |
| cookieConsentCatHeaderPopupClass | CSS class for cookie’s preference popup  cookie category consent button | String | "intP_cookie-popup_list_coockie-cat_header_consent" |
| cookieContentCatPopupClass | CSS class for cookie’s preference popup cookie category description container | String | "intP_cookie-popup_list_coockie-cat_content" |
| cookieButtonsPopupClass | CSS class for cookie’s preference popup buttons container | String | "intP_cookie-popup_buttons" |
| cookieAcceptSelectedButtonPopupClass | CSS class for cookie’s preference popup "accept selected only cookie" button | String | "intP_cookie-popup_buttons_accept-selected" |
| cookieAcceptAllButtonPopupClass | CSS class for cookie’s preference popup "accept all cookie" button | String | "intP_cookie-popup_buttons_accept-all" |

## EVENTS

Available events:


| Event            | Description                                                      | Params    |
| ---------------- | ---------------------------------------------------------------  | --------- |
| onInitialized | Called after Cookiebannerjs plugin has been initialized | none
| onStatusChanged | Called when user consent is changed | consents: user consent for each cookie category |


## API
<pre lang="javascript">
var cookieBanner = new CookieBanner({
    //whatever options and events override
});

/**
* Trigger user consent
* @param {Object} User consent for each cookie category
*/
cookieBanner.setStatus(consents);

/**
* @return {Boolean} User consent to use cookie category
*/
cookieBanner.hasConsent(category);

/**
* @retrn {Object} User consent for each cookie category
*/
cookieBanner.getConsents();

/**
*Shows cookie consent preference popup
*/
cookieBanner.showPopup();
</pre>  

## BROWSER SUPPORT

Working on all modern browser.

## AUTHORS
Interpromotion <info@interpromotion.com> | [interpromotion.com](https://interpromotion.com)

## LICENSE
AGPL-3.0