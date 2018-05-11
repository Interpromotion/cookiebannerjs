Cookiebannerjs
=========


This is a pure javascript cookie banner opt-in plugin and AMD ready.

## INSTALL

You can get Cookiebannerjs either by downloading or cloning this repository or trought Bower.

```
bower install cookiebannerjs
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
    new CookieBanner();
})();
</pre>

<b>CookieBanner object will be accessible from window.CookieBanner object</b>

#### No parameter is mandatory.

* * *

### AMD USAGE
You can also load Cookiebannerjs trought Requirejs:
<pre lang="javascript">
require(['cookiebannerjs'], function(CookieBanner){
    new CookieBanner();
});
</pre>

## OPTIONS

Available options:


| Property         | Description                                                      | Type        | DEFAULT |
| ---------------- |----------------------------------------------------------------  | ----------- | ------- |
| policyText | Text to be shown as short policy | String  |  ""  |
| policyUrl | Absolute URL to the complete policy | String | "" |    
| policyUrlText | Text of the link to the complete policy |  String  |   "" |
| allowText  | Text for the "allow cookie" button |  String  |   "Allow cookie" | 
| denyText  | Text for the "deny cookie" button |  String  |   "Deny cookie" | 
| cookieName  | Name of the cookie where Cookiebannerjs will save the user conent |  String  |   "cookie_allowed" |  
| bannerClass  | CSS class for the banner container |  String | "intP_cookie-banner" |
| bannerHiddenClass | CSS class for the banner container that is applied when user select an option  | String | "intP_cookie-banner__close"  |
| policyTextClass | CSS class for <p> tag containing short policy text | String | "intP_cookie-banner_policy-text" |
| allowButtonClass | CSS class for "allow cookie" button | String | "intP_cookie-banner_allow" |
| denyButtonClass | CSS class for "deny cookie" button | String | "intP_cookie-banner_deny" |
| closingAnimationDuration | Time in millisecond for the banner's closing animation duration. This value must be the same of transition .intP_cookie-banner__close property (or the relative custom class setted trought bannerHiddenClass option) in CSS file | Int | 500 |

## EVENTS

Available events:


| Event            | Description                                                      | Params    |
| ---------------- | ---------------------------------------------------------------  | --------- |
| onInitialized | Called after Cookiebannerjs plugin has been initialized | none
| onStatusChanged | Called when user select an option (allow or deny) | status: can be "allow" or "deny" |


## API
<pre lang="javascript">
new CookieBanner({
    //whatever options and events override
});

/**
* @return {Boolean} User consent to use cookie
*/          
window.CookieBanner.hasConsent();

/**
* Trigger user consent
* @param {Boolean} User consent to use cookie
*/          
window.CookieBanner.changeStatus(true); 
</pre>  

## BROWSER SUPPORT

Working on all modern browser.

## AUTHORS
Interpromotion <info@interpromotion.com> | [interpromotion.com](https://interpromotion.com)

## LICENSE
AGPL-3.0