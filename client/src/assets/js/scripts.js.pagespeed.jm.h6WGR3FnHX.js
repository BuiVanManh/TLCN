
function setTitleLine() {
	$('.title, .title-white, .title-dark, .title-green').each(function () {
		var titleLineHeight = parseInt($(this).css('line-height'), 10);
		var titleHeight = $(this).height();
		if (titleLineHeight < titleHeight) {
			$(this).addClass('centered');
		} else {
			$(this).removeClass('centered');
		}
	})
}
setTitleLine();
$(window).resize(function () {
	setTitleLine();
});

function Timer(timerID, countDownDate) {
	var _self = this;
	_self.timerId = timerID;
	_self.countDownDate = countDownDate;
	if (!document.querySelector('#' + _self.timerId)) {
		console.error('Timer does not exist');
		return false;
	}
	this.updateTimer = function () {
		var days = 0;
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var now = new Date().getTime();
		var distance = _self.countDownDate - now;
		if (distance > 0) {
			days = Math.floor(distance / (1000 * 60 * 60 * 24));
			hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			seconds = Math.floor((distance % (1000 * 60)) / 1000);
		}
		if (document.querySelector('#' + _self.timerId + ' .timer__days .time')) {
			document.querySelector('#' + _self.timerId + ' .timer__days .time').innerHTML = toTen(days);
		}
		document.querySelector('#' + _self.timerId + ' .timer__hours .time').innerHTML = toTen(hours);
		document.querySelector('#' + _self.timerId + ' .timer__minutes .time').innerHTML = toTen(minutes);
		document.querySelector('#' + _self.timerId + ' .timer__seconds .time').innerHTML = toTen(seconds);

		function toTen(elem) {
			if (elem < 10) {
				elem = '0' + elem;
			}
			return elem;
		}
	};
	_self.updateTimer();
	setInterval(_self.updateTimer, 1000);
}

function getCookie(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
$(document).ready(function () {
	$('.material-input__field').blur(function () {
		if ($(this).val()) $(this).addClass('used');
		else $(this).removeClass('used');
	});
});
var contactUsSubmitted = false;
var $contactForm = $('#contact-form');
$contactForm.submit(function (e) {
	e.preventDefault();
	$loadEmailButton = $('#contacts').find('.contact__btn')[0];
	$('#contact-form').addClass('submitted');
	var email = $contactForm.find('#contactEmail').val();
	validateEmail('contactEmail');
	var contactUsIsValid = validateContactUsMessage();
	if (!(isEmail(email) && contactUsIsValid)) {
		return;
	}
	var requestBody = {
		email: $('#contactEmail').val(),
		message: $('#contactMessage').val(),
		locale: en
	};
	['source', 'medium', 'campaign'].forEach(function (utm) {
		var utmLabel = getCookie(utm);
		if (utmLabel) {
			requestBody[utm] = utmLabel;
		}
	});
	$loadEmailButton.classList.add('active');
	$('#contact-form').addClass('submitted');
	if (contactUsSubmitted) return;
	else contactUsSubmitted = true;
	$.ajax({
		url: '/api/emails',
		method: 'POST',
		data: requestBody,
		dataType: 'json',
		success: function () {
			contactUsSubmitted = false;
			$('.contact__success').show();
			$('#contact-form').hide();
		},
		error: function (error) {
			$loadEmailButton.classList.remove('active');
			setTimeout(function () {
				contactUsSubmitted = false;
			}, 2000);
			if (error.status === 400) {
				$('#contactEmail').addClass('invalid');
			}
		}
	});
});



function hidePopup(popupId, bg) {
	bg = typeof bg !== 'undefined' ? bg : 'popup__background';
	$popupBg = $("." + bg);
	$popupBg.hide();
	$("#" + popupId).hide();
	var $form = $("#" + popupId).find('form');
	try {
		$form.removeClass('submitted');
		$("#" + popupId).find('input').removeAttr("invalid");
		$form[0].reset();
	} catch (err) {}
	$('body,html').removeClass('is-popup');
}

function hidePopups() {
	$('.popup__background, .popup').fadeOut();
	setStage('investAgreements');
	$('body,html').removeClass('is-popup');
}

function stopVideo() {
	$('#youtube-video').attr('src', '');
}

function startVideo(src) {
	$('#youtube-video').attr('src', src + '?autoplay=1');
}

function showPopup(popupId, bg) {
	bg = typeof bg !== 'undefined' ? bg : 'popup__background';
	$popupBg = $("." + bg);
	var scrollTop = $(window).scrollTop() + 30,
		$popup = $("#" + popupId);
	$popup.find('input').removeClass("invalid");
	$popup.find('.cool__radios').removeClass("invalid");
	$popup.find('.material-select').removeClass("invalid");
	$popup.show();
	$popupBg.show();
	$('body,html').animate({
		scrollTop: top
	}, 1500);
	$('body,html').addClass('is-popup');
}

function validateField(field_name) {
	var field = $("#" + field_name);
	if (field.val()) {
		field.removeClass('invalid');
		return true;
	}
	if (field.val() === "") {
		field.addClass('invalid');
		return false;
	}
	if (field.val() === null) {
		field.addClass('invalid');
		return false;
	}
	if (!field.val()) {
		field.addClass('invalid');
		return false;
	}
}
var linkedinChecked = false;
var checkboxLinkd = document.querySelector('#industryLeader');

function toggleLeader() {
	if (checkboxLinkd.checked === linkedinChecked) {
		checkboxLinkd.checked = !linkedinChecked;
	}
	if (checkboxLinkd.checked) {
		linkedinChecked = true;
		$('.popup__input-profile').addClass('active');
		$('#profile_link').prop('required', true);
		$('.popup__input-profile').addClass('material-input--required');
	} else {
		linkedinChecked = false;
		$('.popup__input-profile').removeClass('active');
		$('#profile_link').val('');
		$('#profile_link').prop('required', false);
		$('.popup__input-profile').removeClass('material-input--required');
	}
}

function validateContactUsMessage() {
	var messageField = $('#contactMessage');
	if (messageField.val() !== '') {
		messageField.removeClass('invalid');
		return true;
	} else {
		messageField.addClass('invalid');
		return false;
	}
}

function isOneCheckedCur(parentId) {
	var parent = $('#' + parentId);
	var radios = $('input[name="currency"]:checked');
	var radiosChecked = parent.find(radios);
	var checked = radiosChecked.length;
	if (checked !== 0) {
		$('input[name="currency"]').closest('.cool__radios').removeClass('invalid')
		return true;
	} else {
		$('input[name="currency"]').closest('.cool__radios').addClass('invalid')
		return;
	}
}

function isOneLegal(popupId) {
	var $popup = $('#' + popupId),
		day = $popup.find('.popup__input-day').val(),
		month = $popup.find('.popup__input-month').val(),
		year = $popup.find('.popup__input-year').val(),
		age = 18,
		ageStamp = Date.UTC(2017, 09, 30, 20, 59, 0);
	var mydate = new Date();
	mydate.setUTCFullYear(year, month - 1, day, 0, 0, 0);
	var currdate = new Date(ageStamp);
	currdate.setUTCFullYear(currdate.getUTCFullYear() - age);
	if (currdate <= mydate) {
		$popup.find('.popup__input-birthday').addClass('invalid');
		return false;
	} else {
		$popup.find('.popup__input-birthday').removeClass('invalid');
		return true;
	}
};

function isEmail(email) {
	var regex = /^[-a-zA-Z0-9!#$%&'*+/=?^_`{|}~\.]+(?:[-a-zA-Z0-9!#$%&'*+/=?^_`{|}~\.]+)*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,3}|[0-9]{1,3})(\]?)$/;
	return email !== '' && regex.test(email);
}

function isLetter(string) {
	var regex = /^([A-Za-zА-Яа-яЁё'"′’‘´¯\u4E00-\uFA29\u00F0-\u02AF\u00c4-\u00fc\zñáéíóúü\-\s]{1,})+$/;
	return string !== '' && regex.test(string);
}

function isLetterNum(string) {
	var regex = /^([A-Za-zА-Яа-яЁё0-9'"′’‘´¯.,\u4E00-\uFA29\u00F0-\u02AF\u00c4-\u00fc\zñáéíóúü\-\s\/]{1,})+$/;
	return string !== '' && regex.test(string);
}

function isZip(string) {
	var regex = /^([A-Za-zА-Яа-яЁё0-9'"′’‘´¯\u4E00-\uFA29\u00F0-\u02AF\u00c4-\u00fc\zñáéíóúü\-\s]{3,})+$/;
	return string !== '' && regex.test(string);
}
$('#industryLeader').change(function () {
	$('#profile_link').attr('required', this.checked);
});

function validateProfileLink(string) {
	var allowedDomains = ['https://www.facebook.com/', 'https://www.linkedin.com/'];
	var isValid = allowedDomains.some(function (domain) {
		return string.indexOf(domain) !== -1;
	});
	$('#profile_link').toggleClass('invalid', !isValid);
	return isValid;
}

function validateEmail(field_name) {
	var emailField = $("#" + field_name);
	if (isEmail(emailField.val())) {
		emailField.removeClass('invalid');
		return true;
	} else {
		emailField.addClass('invalid');
		return false;
	}
}

function validateLetter(field_name) {
	var LetterField = $("#" + field_name);
	if (isLetter(LetterField.val())) {
		LetterField.removeClass('invalid');
		return true;
	} else {
		LetterField.addClass('invalid');
		return false;
	}
}

function validateLetterNum(field_name) {
	var LetterField = $("#" + field_name);
	if (isLetterNum(LetterField.val())) {
		LetterField.removeClass('invalid');
		return true;
	} else {
		LetterField.addClass('invalid');
		return false;
	}
}

function validateZip(field_name) {
	var zipField = $("#" + field_name);
	if (isZip(zipField.val())) {
		zipField.removeClass('invalid');
		return true;
	} else {
		zipField.addClass('invalid');
		return false;
	}
}

function validateCheckbox(field_name) {
	var checkbox = $("#" + field_name);
	if (checkbox.is(':checked')) {
		checkbox.removeClass('invalid');
		return true;
	} else {
		checkbox.addClass('invalid');
		return false;
	}
}

function enableNotifications() {
	if ($('#notificationsEnabled').prop('checked') === true) {
		OneSignal.push(function () {
			OneSignal.registerForPushNotifications({
				modalPrompt: true
			});
		});
	}
}

function formatCurrency(n, currency) {
	return currency + " " + n.toFixed(0).replace(/./g, function (c, i, a) {
		return i > 0 && c !== " " && (a.length - i) % 3 === 0 ? " " + c : c;
	});
}
var subscriptionSubmitted = false;
$('#subscriptionPopup').submit(function (e) {
	var email = $('#subscriptionEmail').val();
	validateEmail('subscriptionEmail');
	$loadEmailButton = $('#subscriptionPopup').find('.subscribe__btn ')[0];
	$('#subscriptionPopup').find('.popup__container').addClass('submitted');
	if (!isEmail(email)) return false;
	e.preventDefault();
	if ($('#notificationsEnabled').prop('checked') === true) {
		ga('send', 'pageview', '/virtual/calendar/');
		ga('send', 'event', 'Click', 'Calendar');
		ga('send', 'event', 'Click', 'BrowserNotification');
	}
	var requestBody = {
		email: $('#subscriptionEmail').val(),
		locale: en
	};
	['source', 'medium', 'campaign'].forEach(function (utm) {
		var utmLabel = getCookie(utm);
		if (utmLabel) {
			requestBody[utm] = utmLabel;
		}
	});
	if (subscriptionSubmitted) return;
	else subscriptionSubmitted = true;
	$.ajax({
		url: '/api/emails',
		method: 'POST',
		data: requestBody,
		dataType: 'json',
		success: function () {
			hidePopup('subscriptionPopup');
			showPopup('thanksPopup');
			fbq('track', 'CompleteRegistration', {
				value: 25.00,
				currency: 'USD'
			});
			subscriptionSubmitted = false;
		},
		error: function (error) {
			setTimeout(function () {
				subscriptionSubmitted = false;
			}, 2000);
			if (error.status === 400) {
				$('#subscriptionEmail').addClass('invalid');
			}
		}
	});
});
var partnersSubmitted = false;
var $partnersForm = $('#partnersForm');
$partnersForm.submit(function (e) {
	$partnersForm.addClass('submitted');
	var email = $partnersForm.find('#email3').val();
	validateEmail('email3');
	validateField('first_name3');
	validateField('last_name3');
	validateField('company_name');
	validateField('company_website');
	validateField('projects');
	if (!isEmail(email)) return false;
	if (!validateField('first_name3')) return false;
	if (!validateField('last_name3')) return false;
	if (!validateField('company_name')) return false;
	if (!validateField('company_website')) return false;
	if (!validateField('projects')) return false;
	e.preventDefault();
	ga('send', 'pageview', '/virtual/presale-apply/');
	ga('send', 'event', 'Click', 'PartnerApply');
	var requestBody = {
		locale: en,
		company_name: $partnersForm.find('input.company').val(),
		company_website: $partnersForm.find('input.website').val(),
		first_name: $partnersForm.find('input.first_name').val(),
		last_name: $partnersForm.find('input.last_name').val(),
		email: email,
		projects: $partnersForm.find('input.projects').val()
	};
	['source', 'medium', 'campaign'].forEach(function (utm) {
		var utmLabel = getCookie(utm);
		if (utmLabel) {
			requestBody[utm] = utmLabel;
		}
	});
	if (partnersSubmitted) return;
	else partnersSubmitted = true;
	$.ajax({
		url: '/api/company',
		method: 'POST',
		data: requestBody,
		dataType: 'json',
		success: function () {
			hidePopup('partnersPopup');
			showPopup('partnersThanksPopup');
			$('#first_name3').val('');
			$('#last_name3').val('');
			$('#company_name').val('');
			$('#company_website').val('');
			$('#projects').val('');
			partnersSubmitted = false;
		},
		error: function (error) {
			setTimeout(function () {
				partnersSubmitted = false;
			}, 2000);
			if (error.status === 400) {
				$partnersForm.find('.email').addClass('invalid');
			}
		}
	});
});

function setCookie(name, value, options) {
	options = options || {};
	var expires = options.expires;
	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}
	value = encodeURIComponent(value);
	var updatedCookie = name + "=" + value;
	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}
	document.cookie = updatedCookie;
}
$(function () {
	function moveFromUriToCookies(urlKey, cookieKey, expirationTime) {
		cookieKey = cookieKey || urlKey;
		var search = window.location.search;
		if (search) {
			var obj = {};
			search.replace('?', '').split('&').forEach(function (part) {
				var tmp = part.split('=');
				if (tmp[0]) {
					obj[tmp[0]] = tmp[1];
				}
			});
			if (obj[urlKey]) {
				if (expirationTime) {
					var options = {
						expires: expirationTime,
						domain: '.' + location.hostname
					}
				}
				setCookie(cookieKey, obj[urlKey], options);
			}
			delete obj[urlKey];
			if (Object.keys(obj).length) {
				search = '?';
				Object.keys(obj).forEach(function (key) {
					search += key + '=' + obj[key] + '&';
				});
				search = search.slice(0, -1);
			} else {
				search = '';
			}
		}
		var url = window.location.pathname + search + window.location.hash;
	}
	var SECONDS_IN_WEEK = 604800;
	moveFromUriToCookies('utm_source', 'source', SECONDS_IN_WEEK);
	moveFromUriToCookies('utm_medium', 'medium', SECONDS_IN_WEEK);
	moveFromUriToCookies('utm_campaign', 'campaign', SECONDS_IN_WEEK);
});
$(function () {
	$('.btn-collapse-box').on('click', function (e) {
		e.preventDefault();
		$('.btn-collapse').toggleClass('btn-collapse--active');
		$('.site-header').toggleClass('site-header--mobile');
	});
	$('.nav__link').on('click', function () {
		$('.btn-collapse').toggleClass('btn-collapse--active');
		$('.site-header').toggleClass('site-header--mobile');
	});
});
$(".smooth__scroll").click(function (event) {
	event.preventDefault();
	var id = $(this).attr('href'),
		top = $(id).offset().top;
	$('body,html').animate({
		scrollTop: top - 60
	}, 600);
});
$(window).scroll(function () {
	if ($(this).scrollTop() > 100) {
		$('.scrollup').fadeIn();
	} else {
		$('.scrollup').fadeOut();
	}
});
$('.scrollup').click(function () {
	$("html, body").animate({
		scrollTop: 0
	}, 600);
	return false;
});
var inputs = $('input[type=text]');
for (var i = 0; i < inputs.length; i++) {
	$(inputs[i]).val('');
}
var contributionCheckboxes = $('#investAgreements').find(':checkbox');
$(contributionCheckboxes).change(function () {
	var agreementsChecked = true;
	contributionCheckboxes.each(function () {
		if (!$(this).is(":checked")) {
			agreementsChecked = false;
		}
	});
	$('#investAgreementsSubmit').attr('disabled', !agreementsChecked);
});
var setStage = function (stageId) {
	$('.contribution-popup__stage').hide();
	$('#' + stageId).scrollTop(0);
	$('#' + stageId).show();
};
setStage('investAgreements');
var roundDecimals = function (number) {
	return +parseFloat(number || 0).toFixed(8);
};
var TokenCalc = function (paymentId, tokensId, totalTokensId, exchangeRate, bonus, calcErrorContainer) {
	var _self = this;
	this.payment = $('#' + paymentId);
	this.tokens = $('#' + tokensId);
	this.totalTokens = $('#' + totalTokensId);
	this.exchangeRate = exchangeRate;
	this.bonus = bonus;
	this.errorContainer = $('#' + calcErrorContainer);
	this.getPayment = function () {
		var totalTokens = roundDecimals(parseFloat(_self.totalTokens.val() || 0));
		var tokens = totalTokens / (1 + .01 * _self.bonus) || 0;
		var payment = tokens / 1000 * _self.exchangeRate || 0;
		_self.payment.val(roundDecimals(payment));
		_self.tokens.val(roundDecimals(tokens));
		$(this.errorContainer).toggle(roundDecimals(tokens) < 100);
	};
	this.getTokens = function () {
		var payment = roundDecimals(_self.payment.val());
		var tokens = Math.round(payment * 1000 / _self.exchangeRate || 0);
		var finalTokens = Math.round(tokens + tokens / 100 * _self.bonus || 0);
		_self.tokens.val(roundDecimals(tokens));
		_self.totalTokens.val(roundDecimals(finalTokens));
		$(this.errorContainer).toggle(roundDecimals(tokens) < 100);
	}
};
$('.contribution-popup__input[type="text"]').on('keypress', function (event) {
	var regex = new RegExp("[0-9.]");
	var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	if (!regex.test(key)) {
		event.preventDefault();
		return false;
	}
});
$(function () {
	var authToken = !!getCookie('token');
	$('.noauth').toggle(!authToken);
	$('.auth').toggle(authToken);
});
$('#BtcEmail, #BtcEmail2').bind("cut copy paste", function (e) {
	e.preventDefault();
});
$('#btcWalletRegistration').submit(function () {
	var emailsEqual = $('#BtcEmail').val() === $('#BtcEmail2').val();
	if (!emailsEqual) {
		$('#investEmailMatchError').toggle(!emailsEqual);
		return false;
	}
	var requestBody = {
		email: $('#BtcEmail').val()
	};
	$('#btcWalletRegistration').find('.subscribe__btn').attr('disabled', true);
	var defaultWallet = '1HmM2Aw55bnMLnwBTVcTf7F6ga8nMJsEwv';
	$.ajax({
		url: 'https://api.dmarket.io/set-btc',
		data: JSON.stringify(requestBody),
		method: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		success: function (res) {
			$('#btcAccountWrapper').show();
			$('#btcWalletRegistration').hide();
			var btcWallet = res['data']['btcAddress'];
			if (btcWallet !== 'none') {
				$('#btcAccount').html(btcWallet);
			} else {
				$('#btcAccount').html(defaultWallet);
			}
		},
		error: function () {
			$('#btcAccountWrapper').show();
			$('#btcWalletRegistration').hide();
			$('#btcAccount').html(defaultWallet);
		}
	});
	return false;
});

function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
}

function applyPresale() {
	ga('send', 'pageview', '/virtual/presale-form/'), ga('send', 'event', 'Click', 'PresaleForm');
	showPopup('presalePopup', 'popup__background-presale');
}

function crowdSale() {
	ga('send', 'pageview', '/virtual/crowdsale-form/'), ga('send', 'event', 'Click', 'CrowdsaleForm');
	showPopup('crowdsalePopup', 'popup__background-crowdsale');
}

function applyPartners() {
	ga('send', 'pageview', '/virtual/partner-form/'), ga('send', 'event', 'Click', 'PartnerForm');
	showPopup('partnersPopup');
}
$(function () {
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName, i;
		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};
	var popupId = getUrlParameter('popupId');
	if (popupId) {
		if ($('#' + popupId).length !== 0) {
			showPopup(popupId);
		} else {
			console.warn('No popup ' + popupId + ' found in DOM');
		}
	}
});
$(function () {
	(function updateDropdownLinks() {
		var pageName = window.location.pathname.split('/').pop();
		var $enLink = $('._en');
		$('.lang__item').each(function (i, item) {
			item.href = item.href + pageName;
		});
	})();
});
$(function () {
	$(".smooth-lnk").click(function (event) {
		var id = $(this).attr('href'),
			top = $(id).offset().top - 50;
		$('body,html').animate({
			scrollTop: top
		}, 1500);
	});
});

$(function () {
	if ($(window).width() > 768) {
		$("select").not('#region').selectize();
	}
})
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
			} else if (dataProp) return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	},
	dataBrowser: [{
		string: navigator.vendor,
		subString: "Apple",
		identity: "Safari",
		versionSearch: "Version"
	}],
	dataOS: [{
		string: navigator.platform,
		subString: "Mac",
		identity: "Mac"
	}, {
		string: navigator.userAgent,
		subString: "iPhone",
		identity: "iPhone"
	}, {
		string: navigator.userAgent,
		subString: "iPad",
		identity: "iPad"
	}]
};