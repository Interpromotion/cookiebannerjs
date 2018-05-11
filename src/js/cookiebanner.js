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


(function(cookiebanner, window, document) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(cookiebanner);
	} else {
		window.CookieBanner = cookiebanner();
	}
})(function() {
	'use strict';

	//Helpers
	var CookieHelper = {
		getCookie: function(cookie) {
			var value = '; ' + document.cookie;
			var parts = value.split('; ' + cookie + '=');

			return parts.length != 2 ? undefined : parts.pop().split(';').shift();
		},
		setCookie: function(name, value, expiryDays, domain, path) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + (expiryDays || 365));

			var cookie = [
				name + '=' + value,
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
		self = this;
		this.banner = null;
		this.allowButton = null;
		this.disallowButton = null;
		this.allowCookieValue = "allow";
		this.denyCookieValue = "deny";

		var defaults = {
			policyText: "",
			policyUrl: "",
			policyUrlText: "",
			allowText: "Allow cookie",
			denyText: "Deny cookie",
			cookieName: "cookie_allowed",
			bannerClass: "intP_cookie-banner",
			bannerHiddenClass: "intP_cookie-banner__close",
			policyTextClass: "intP_cookie-banner_policy-text",
			allowButtonClass: "intP_cookie-banner_allow",
			denyButtonClass: "intP_cookie-banner_deny",
			closingAnimationDuration: 500,
			onInitialized: function() {},
			onStatusChanged: function(status) {}
		};
		
		this.options = extend(defaults, options);

		if(!CookieHelper.isCookieSet(this.options.cookieName)) {
			this._draw();
		}

		this.options.onInitialized();
	}


	//Prototype methods
	CookieBanner.prototype._draw = function() {
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
		buttonsContainer.classList.add("intP_cookie-banner_buttons");
		this.banner.appendChild(buttonsContainer);

		//Allow button
		this.allowButton = document.createElement("button");
		this.allowButton.classList.add(this.options.allowButtonClass);
		this.allowButton.setAttribute("type", "button");
		this.allowButton.innerHTML = this.options.allowText;
		this.allowButton.addEventListener("click", this.allow);
		buttonsContainer.appendChild(this.allowButton);

		//Deny button
		this.denyButton = document.createElement("button");
		this.denyButton.classList.add(this.options.denyButtonClass);
		this.denyButton.setAttribute("type", "button");
		this.denyButton.innerHTML = this.options.denyText;
		this.denyButton.addEventListener("click", this.deny);
		buttonsContainer.appendChild(this.denyButton);

		//Append banner to <body>
		document.body.appendChild(this.banner);
	};

	CookieBanner.prototype.allow = function() {
		self.setStatus(self.allowCookieValue);
	};

	CookieBanner.prototype.deny = function() {
		self.setStatus(self.denyCookieValue);
	};

	CookieBanner.prototype.setStatus = function(status) {
		if (status == self.allowCookieValue || status == self.denyCookieValue) {
			CookieHelper.setCookie(self.options.cookieName, status, 365, "", "/");

			self.options.onStatusChanged(status);

			if(self.banner) {
				self.banner.classList.add(self.options.bannerHiddenClass);

				setTimeout(function() {
					self.banner.remove();
				}, self.options.closingAnimationDuration);
			}
		}
	};

	//Public methods
	CookieBanner.hasConsent = function() {
		return CookieHelper.getCookie(self.options.cookieName) === self.allowCookieValue;
	};

	CookieBanner.changeStatus = function(status) {
		if(status === true) {
			this.prototype.setStatus(self.allowCookieValue);
		}
		else {
			this.prototype.setStatus(self.denyCookieValue);
		}
	};

	window.CookieBanner = CookieBanner;

	return window.CookieBanner;

}, window, document);