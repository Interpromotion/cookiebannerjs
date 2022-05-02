/*
 *  Copyright (C) 2018  Interpromotion <info@interpromotion.com>
 *
 *  This file is part of Cookiebannerjs.
 *
 *  Cookiebannerjs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  Cookiebannerjs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>
 */


//Helpers
var CookieHelper = {
	getCookie: function(cookie) {
		var value = '; ' + document.cookie;
		var parts = value.split('; ' + cookie + '=');

		return parts.length != 2 ? undefined : JSON.parse(parts.pop().split(';').shift());
	},
	setCookie: function(name, value, expiryDays, domain, path) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + (expiryDays || 365));

		var cookie = [
			name + '=' + JSON.stringify(value),
			'expires=' + exdate.toUTCString(),
			'path=' + (path || '/')
		];

		if (domain) {
			cookie.push('domain=' + domain);
		}

		document.cookie = cookie.join(';');
	},
	isCookieSet: function(cookie) {
		return typeof this.getCookie(cookie) == "undefined" ? false : true;
	}
};

function extend(a, b) {
	for(var i in b) {
		if(b.hasOwnProperty(i)) {
			a[i] = b[i];
		}
	}

	return a;
}

//CookieBanner constructor
function CookieBanner(options){
	this.banner = null;
	this.popup = null;

	var defaults = {
		policyText: "",
		policyUrl: "",
		policyUrlText: "",
		popupTitle: "",
		popupDescription: "",
		allowText: "Allow cookie",
		customizeText: "Customize settings",
		denyText: "Deny cookie",
		acceptSelected: "Accept selected only cookie",
		acceptAll: "Accept all cookie",
		cookieCatDetailsText: "Details",
		categories: {
			necessary: {
				title : 'Technical cookie',
				description: 'These cookies are essential for the correct functioning of the website and to provide the service offered and requested by a user. User consent is not needed to use these type of cookies.',
				consent: true,
				blocked: true
			}
		},
		cookieName: "cookie_allowed",

		//Cookie banner customization
		bannerClass: "intP_cookie-banner",
		bannerHiddenClass: "intP_cookie-banner__close",
		policyTextClass: "intP_cookie-banner_policy-text",
		buttonsContainerClass: "intP_cookie-banner_buttons",
		allowButtonClass: "intP_cookie-banner_allow",
		customizeButtonClass: "intP_cookie-banner_customize",
		denyButtonClass: "intP_cookie-banner_deny",
		closingAnimationDuration: 500,

		//Cookie popup customization
		popupClass: "intP_cookie-popup",
		descriptionPopupClass: "intP_cookie-popup_description",
		titleDescriptionPopupClass: "intP_cookie-popup_description_title",
		cookieListPopupClass: "intP_cookie-popup_list",
		cookieCatPopupClass: "intP_cookie-popup_list_coockie-cat",
		cookieCatHeaderPopupClass: "intP_cookie-popup_list_coockie-cat_header",
		cookieTitleCatHeaderPopupClass: "intP_cookie-popup_list_coockie-cat_header_title",
		cookieDetailsCatHeaderPopupClass: "intP_cookie-popup_list_coockie-cat_header_details",
		cookieConsentCatHeaderPopupClass: "intP_cookie-popup_list_coockie-cat_header_consent",
		cookieContentCatPopupClass: "intP_cookie-popup_list_coockie-cat_content",
		cookieButtonsPopupClass: "intP_cookie-popup_buttons",
		cookieAcceptSelectedButtonPopupClass: "intP_cookie-popup_buttons_accept-selected",
		cookieAcceptAllButtonPopupClass: "intP_cookie-popup_buttons_accept-all",
		closeButtonPopupClass: "intP_cookie-popup_close-btn",

		//Events
		onInitialized: function() {},
		onStatusChanged: function(consents) {}
	};

	this.options = extend(defaults, options);
	this.options.consents = {};

	//Add consents object to this.options
	for(var i in this.options.categories) {
		this.options.consents[i] = this.options.categories[i].consent;
	}

	if(!CookieHelper.isCookieSet(this.options.cookieName)) {
		this._draw();
	}

	this.options.onInitialized();
}


//Prototype methods
CookieBanner.prototype._draw = function() {
	//Cookie banner
	this.banner = document.createElement("div");
	this.banner.classList.add(this.options.bannerClass);

	//Policy text
	var shortPolicy = document.createElement("p");
	shortPolicy.classList.add(this.options.policyTextClass);

	var policyText = "";

	if(this.options.policyText.indexOf("{{policy_url}}") >= 0) {
		policyText = this.options.policyText.replace("{{policy_url}}", "<a href=\"" + this.options.policyUrl + "\">" + this.options.policyUrlText + "</a>");
	}
	else {
		policyText = this.options.policyText + (this.options.policyText.charAt(this.options.policyText.length - 1) == "." ? " " : ". ") + "<a href=\"" + this.options.policyUrl + "\">" + this.options.policyUrlText + "</a>";
	}

	shortPolicy.innerHTML = policyText;
	this.banner.appendChild(shortPolicy);

	//Buttons container
	var buttonsContainer = document.createElement("div");
	buttonsContainer.classList.add(this.options.buttonsContainerClass);
	this.banner.appendChild(buttonsContainer);

	//Allow button
	this.allowButton = document.createElement("button");
	this.allowButton.classList.add(this.options.allowButtonClass);
	this.allowButton.setAttribute("type", "button");
	this.allowButton.innerHTML = this.options.allowText;
	this.allowButton.addEventListener("click", this.allow.bind(this));
	buttonsContainer.appendChild(this.allowButton);

	//Customize button
	this.customizeButton = document.createElement("button");
	this.customizeButton.classList.add(this.options.customizeButtonClass);
	this.customizeButton.setAttribute("type", "button");
	this.customizeButton.innerHTML = this.options.customizeText;
	this.customizeButton.addEventListener("click", this.customize.bind(this));
	buttonsContainer.appendChild(this.customizeButton);

	//Deny button
	this.denyButton = document.createElement("button");
	this.denyButton.classList.add(this.options.denyButtonClass);
	this.denyButton.setAttribute("type", "button");
	this.denyButton.innerHTML = this.options.denyText;
	this.denyButton.addEventListener("click", this.deny.bind(this));
	buttonsContainer.appendChild(this.denyButton);

	//Append banner to <body>
	document.body.appendChild(this.banner);
};

//Create and show details popup
CookieBanner.prototype._draw_popup = function() {
	if(document.querySelector('.' + this.options.bannerClass) !== null) {
		this.banner.remove();
	}

	if(document.querySelector('.' + this.options.popupClass) !== null) {
		document.querySelector('.' + this.options.popupClass).remove();
	}

	//Cookie popup
	this.popup = document.createElement('div');
	this.popup.classList.add(this.options.popupClass);

	//Popup description
	if(this.options.popupTitle !== "" || this.options.popupDescription !== "") {
		var description = document.createElement('div');
		description.classList.add(this.options.descriptionPopupClass);

		if(this.options.popupTitle !== "") {
			var description_title = document.createElement('h3');
			description_title.classList.add(this.options.titleDescriptionPopupClass);
			description_title.innerText = this.options.popupTitle;

			description.appendChild(description_title);
		}

		if(this.options.popupDescription !== "") {
			var description_content = document.createElement("p");

			var policyText = "";

			if(this.options.popupDescription.indexOf("{{policy_url}}") >= 0) {
				policyText = this.options.popupDescription.replace("{{policy_url}}", "<a href=\"" + this.options.policyUrl + "\">" + this.options.policyUrlText + "</a>");
			}
			else {
				policyText = this.options.popupDescription + (this.options.popupDescription.charAt(this.options.popupDescription.length - 1) == "." ? " " : ". ") + "<a href=\"" + this.options.policyUrl + "\">" + this.options.policyUrlText + "</a>";
			}

			description_content.innerHTML = policyText;

			description.appendChild(description_content);
		}

		this.popup.appendChild(description);
	}

	//Cookie category list
	var cookie_container = document.createElement('div');
	cookie_container.classList.add(this.options.cookieListPopupClass);

	/* jshint loopfunc: true */
	for(var i in this.options.categories) {
		//Cookie category
		var cookie = document.createElement('div');
		cookie.classList.add(this.options.cookieCatPopupClass);

		//Cookie header
		var cookie_header = document.createElement('div');
		cookie_header.classList.add(this.options.cookieCatHeaderPopupClass);
		cookie_header.innerHTML = "<h3 class=\"" + this.options.cookieTitleCatHeaderPopupClass + "\">" + this.options.categories[i].title + "</h3>";

		//Cookie cat details btn
		var cookie_details_btn = document.createElement('button');
		cookie_details_btn.setAttribute('type', 'button');
		cookie_details_btn.classList.add(this.options.cookieDetailsCatHeaderPopupClass);
		cookie_details_btn.innerText = this.options.cookieCatDetailsText;
		cookie_details_btn.addEventListener('click', (e) => {
			e.target.parentNode.parentNode.classList.toggle('open');
		});

		cookie_header.appendChild(cookie_details_btn);

		//Cookie cat consent btn
		var cookie_consent_btn = document.createElement('button');
		cookie_consent_btn.setAttribute('type', 'button');
		cookie_consent_btn.setAttribute('category', i);

		if(CookieHelper.isCookieSet(this.options.cookieName)) {
			if(this.hasConsent(i)) {
				cookie_consent_btn.classList.add('active');
				this.options.consents[i] = true;
			}
		}
		else if(this.options.categories[i].consent === true) {
			cookie_consent_btn.classList.add('active');
		}

		if(this.options.categories[i].blocked === true) {
			cookie_consent_btn.setAttribute('disabled', 'disabled');
		}

		cookie_consent_btn.classList.add(this.options.cookieConsentCatHeaderPopupClass);
		cookie_consent_btn.addEventListener('click', (e) => {
			e.target.classList.toggle('active');
			this.options.consents[e.target.getAttribute('category')] = e.target.classList.contains('active');
		});

		cookie_header.appendChild(cookie_consent_btn);

		cookie.appendChild(cookie_header);

		var cookie_content = document.createElement('div');
		cookie_content.classList.add(this.options.cookieContentCatPopupClass);
		cookie_content.innerHTML = '<p>' + this.options.categories[i].description + '</p>';

		cookie.appendChild(cookie_content);

		cookie_container.append(cookie);

		this.popup.appendChild(cookie_container);
	}

	//Accept buttons
	var popup_buttons = document.createElement('div');
	popup_buttons.classList.add(this.options.cookieButtonsPopupClass);

	//Accept selected button
	var accept_selected_btn = document.createElement('button');
	accept_selected_btn.setAttribute('type', 'button');
	accept_selected_btn.classList.add(this.options.cookieAcceptSelectedButtonPopupClass);
	accept_selected_btn.innerText = this.options.acceptSelected;
	accept_selected_btn.addEventListener('click', () => {
		this.setStatus(this.options.consents);

		this.popup.remove();
	});

	popup_buttons.appendChild(accept_selected_btn);

	//Accept all button
	var accept_all_btn = document.createElement('button');
	accept_all_btn.setAttribute('type', 'button');
	accept_all_btn.classList.add(this.options.cookieAcceptAllButtonPopupClass);
	accept_all_btn.innerText = this.options.acceptAll;
	accept_all_btn.addEventListener('click', () => {
		for(var i in this.options.consents) {
			this.options.consents[i] = true;
		}

		this.setStatus(this.options.consents);

		this.popup.remove();
	});

	popup_buttons.appendChild(accept_all_btn);

	this.popup.appendChild(popup_buttons);

	//Close popup button
	var close_btn = document.createElement('button');
	close_btn.setAttribute('type', 'button');
	close_btn.classList.add(this.options.closeButtonPopupClass);
	close_btn.innerHTML = this.options.denyText;
	close_btn.addEventListener("click", () => {
		this.deny();

		this.popup.remove();
	});

	this.popup.appendChild(close_btn);

	//Append popup to <body>
	document.body.appendChild(this.popup);
};

CookieBanner.prototype.allow = function() {
	for(var i in this.options.consents) {
		this.options.consents[i] = true;
	}

	this.setStatus(this.options.consents);
};

CookieBanner.prototype.deny = function() {
	for(var i in this.options.categories) {
		if(this.options.categories[i].blocked === true) {
			this.options.consents[i] = true;
		}
		else {
			this.options.consents[i] = false;
		}
	}

	this.setStatus(this.options.consents);
};

CookieBanner.prototype.customize = function() {
	this.banner.classList.add(this.options.bannerHiddenClass);

	setTimeout(() => this._draw_popup(), this.options.closingAnimationDuration);
};

CookieBanner.prototype.setStatus = function(consents) {
	CookieHelper.setCookie(this.options.cookieName, consents, 365, "", "/");

	this.options.onStatusChanged(consents);

	if(document.querySelector('.' + this.options.bannerClass) !== null) {
		this.banner.classList.add(this.options.bannerHiddenClass);

		setTimeout(() => this.banner.remove(), this.options.closingAnimationDuration);
	}
};

CookieBanner.prototype.hasConsent = function(category) {
	var cookie = CookieHelper.getCookie(this.options.cookieName);

	if(this.options.categories[category] !== undefined) {
		return (this.options.categories[category].consent === true && this.options.categories[category].blocked === true) || (cookie !== undefined && cookie[category] === true);
	}

	return false;
};

CookieBanner.prototype.getConsents = function() {
	return CookieHelper.getCookie(this.options.cookieName);
};

CookieBanner.prototype.showPopup = function() {
	this._draw_popup();
};
