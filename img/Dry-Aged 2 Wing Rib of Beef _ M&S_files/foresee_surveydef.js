var $$FSR = {
  'enabled': true,
  'frames': false,
  'sessionreplay': true,
  'auto': true,
  'encode': true,
  'version': '18.2.5',
  'files': '/foresee/',
  // The 'swf_files' attribute needs to be set when foresee_transport.swf is not located at 'files'
  //'swf_files': '/some/other/location/'
  'id': '4X49xd9BIXf6lIv4TNpFOA==',
  'definition': 'foresee_surveydef.js',
  'swf': {
    'fileName': 'foresee_transport.swf',
    'scriptAccess': 'always'
  },
  'worker': 'foresee_worker.js',
  'embedded': false,
  'replay_id': 'marksandspencer.com',
  'site_id': 'marksandspencer.com',
  'attach': false,
  'renderer': 'W3C',
  // or "ASRECORDED"
  'layout': 'CENTERFIXED',
  // or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
  'triggerDelay': 0,
  'heartbeat': true,
  'enableAMD': false,
  'pools': [{
    'path': '.',
    'sp': 100 // CHANGE ONLY WHEN INCLUDING SESSION REPLAY
  }],
  'sites': [{
    'path': /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
  },
  {
    'path': '.',
    'domain': 'default'
  }],
  'storageOption': 'cookie',
  'nameBackup': window.name,
  'iframeHrefs': ["frameWorker.html"],
  'acceptableorigins': []
};

$$FSR.FSRCONFIG = {};

(function (config) {

  var FSR, supports_amd = !! config.enableAMD && typeof(_4c.global["define"]) === 'function' && !! _4c.global["define"]["amd"];

  if (!supports_amd) FSR = window.FSR;
  else FSR = {};
/*
 * ForeSee Survey Def(s)
 */
  FSR.surveydefs = [{
    name: 'tablet',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          titleText: "Thank you for visiting our website",
          headline: "WE'D WELCOME YOUR FEEDBACK.",
          blurb: "Can we email you later a brief customer satisfaction survey to let us know how we can improve your experience?",
          attribution: "Conducted by ForeSee.",
          declineButton: "No thanks",
          acceptButton: "Yes, I'll help"
        }],
        [{
          reverseButtons: false,
          headline: "THANK YOU FOR HELPING.",
          titleText: "Thank you for visiting our website",
          blurb: "Please provide your e-mail address. After your visit we'll send you a link to the survey.",
          attribution: "ForeSee's <a class='fsrPrivacy' href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a>",
          declineButton: "No thanks",
          acceptButton: "Email me",
          mobileExitDialog: {
            support: "b",
            //e for email only, s for sms only, b for both
            inputMessage: "email address",
            emailMeButtonText: "Email me",
            textMeButtonText: "text me",
            fieldRequiredErrorText: "Enter an email address",
            invalidFormatErrorText: "Format should be: name@domain.com"
          }
        }]
      ]
    },
    pop: {
      when: 'later'
    },
    criteria: {
      sp: 10,
      lf: 4
    },
    platform: 'tablet',
    include: {
      urls: ['.']
    }
  },
  {
    name: 'phone',
    invite: {
      when: 'onentry',
      dialogs: [
        [{
          reverseButtons: false,
          titleText: "Thank you for visiting our website",
          headline: "WE'D WELCOME YOUR FEEDBACK.",
          blurb: "Can we email you later a brief customer satisfaction survey to let us know how we can improve your experience?",
          attribution: "Conducted by ForeSee.",
          declineButton: "No thanks",
          acceptButton: "Yes, I'll help"
        }],
        [{
          reverseButtons: false,
          headline: "THANK YOU FOR HELPING.",
          titleText: "Thank you for visiting our website",
          blurb: "Please provide your e-mail address. After your visit we'll send you a link to the survey.",
          attribution: "ForeSee's <a class='fsrPrivacy' href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a>",
          declineButton: "No thanks",
          acceptButton: "Email me",
          mobileExitDialog: {
            support: "b",
            //e for email only, s for sms only, b for both
            inputMessage: "email address",
            emailMeButtonText: "Email me",
            textMeButtonText: "text me",
            fieldRequiredErrorText: "Enter an email address",
            invalidFormatErrorText: "Format should be: name@domain.com"
          }
        }]
      ]
    },
    pop: {
      when: 'later'
    },
    criteria: {
      sp: 10,
      lf: 4
    },
    platform: 'phone',
    include: {
      urls: ['.']
    }
  },
  {
    name: 'browse',
    invite: {
      when: 'onentry'
    },
    pop: {
      when: 'later'
    },
    criteria: {
      sp: 10,
      lf: 4
    },
    include: {
      urls: ['.']
    }
  }];

/*
 * ForeSee Properties
 */
  FSR.properties = {
    repeatdays: 60,

    repeatoverride: false,

    altcookie: {},

    language: {
      locale: 'en'
    },

    exclude: {},

    zIndexPopup: 10000,

    ignoreWindowTopCheck: false,

    ipexclude: 'fsr$ip',

    mobileHeartbeat: {
      delay: 60,
      /*mobile on exit heartbeat delay seconds*/
      max: 3600 /*mobile on exit heartbeat max run time seconds*/
    },

    invite: {

      // For no site logo, comment this line:
      siteLogo: "sitelogo.gif",

      //alt text fore site logo img
      siteLogoAlt: "",

      /* Desktop */
      dialogs: [
        [{
          reverseButtons: false,
          titleText: "Thank you for visiting our website",
          headline: "WE'D WELCOME YOUR FEEDBACK",
          blurb: "You have been selected to participate in a brief customer satisfaction <br /> survey to let us know how we can improve your experience.",
          noticeAboutSurvey: "The survey is designed to measure your entire experience, <br /> please look for it at the <u>conclusion</u> of your visit.",
          attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
          closeInviteButtonText: "Click to close.",
          declineButton: "No, thanks",
          acceptButton: "Yes, I'll give feedback",
          error: "Error",
          warnLaunch: "this will launch a new window"

        }]
      ],

      exclude: {
        urls: ['/LogonForm', 'reqact=login', '/MSRegisterModalView', '/MSCheckoutLoginFormCmd', '/MSCheckoutRegistrationForm', '/OrderShippingBillingConfirmationView', '/MSOrderListDisplayCmd', '/MSSinglePageCheckoutCmd', '/MSAccountProfileDisplayView', '/WineSubscriptionListView', '/MSOrderHistoryListDisplayCmd', '/AjaxOrderItemDisplayView', '/MSSecureBasketDisplay', '/MSDeliveryMethodsCmd', '/MSDeliveryServicesCmd', '/MSPaymentDisplayCmd', '/OrderCalculate', '/MSCheckoutLoginFormCmd', '/MSContactAddressDisplayCmd', '/MSOrderReviewDisplayCmd', '/OrderShippingBillingConfirmationView', 'reqact=register', 'registerView=modal&errorPage=true', 'MSStoreFinderGlobalBaseView', 'MSMarketingPreferenceView', 'OrderProcess', 'ChangePassword', 'MSChangeLogonIdView', 'MSChangeLogonIdCmd', 'MSStoreDetailsView', '/LogonErrorView', '/MSPasswordProcess', '/MSAgeCaptureCmd', '/MSMyAccountView', '/MSUserProfilePaymentMethodDisplayView', '/MSStoreAddressAddCmd', 'marksandspencer.com$', 'marksandspencer.com/$'],
        referrers: [],
        userAgents: [],
        browsers: [],
        cookies: [],
        variables: []
        // [name (content), http-equiv (content), itemprop (content),  charset] possible attributes for meta tag element http://devdocs.io/html/meta
        // metas:[{"name":{"key":"value", "content":"value"}}, {"http-equiv":{"key":"value", "content":"value"}}, {"itemprop":{"key":"value", "content":"value"}}, {"charset":{"key":"value"}}]

      },
      include: {
        local: ['.']
      },

      delay: 0,
      timeout: 0,

      hideOnClick: false,

      hideCloseButton: false,

      css: 'foresee_dhtml.css',

      hide: [],

      hideFlash: false,

      type: 'dhtml',
      /* desktop */
      // url: 'invite.html'
      /* mobile */
      url: 'invite-mobile.html',
      back: 'url'

      //SurveyMutex: 'SurveyMutex'
    },

    tracker: {
      width: '690',
      height: '415',

      // Timeout is the normal between-page timeout
      timeout: 10,

      // Fast timeout is when we think there's a good chance we've closed the browser
      fasttimeout: 4,

      adjust: true,
      alert: {
        enabled: true,
        message: 'The survey is now available.'
      },
      url: 'tracker.html'
    },

    survey: {
      width: 690,
      height: 600
    },

    qualifier: {
      footer: '<div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
      width: '690',
      height: '500',
      bgcolor: '#333',
      opacity: 0.7,
      x: 'center',
      y: 'center',
      delay: 0,
      buttons: {
        accept: 'Continue'
      },
      hideOnClick: false,
      css: 'foresee_dhtml.css',
      url: 'qualifying.html'
    },

    cancel: {
      url: 'cancel.html',
      width: '690',
      height: '400'
    },

    pop: {
      what: 'survey',
      after: 'leaving-site',
      pu: false,
      tracker: true
    },

    meta: {
      referrer: true,
      terms: true,
      ref_url: true,
      url: true,
      url_params: false,
      user_agent: false,
      entry: false,
      entry_params: false,
      viewport_size: false,
      document_size: false,
      scroll_from_top: false,
      invite_URL: false
    },

    events: {
      enabled: true,
      id: true,
      codes: {
        purchase: 800,
        items: 801,
        dollars: 802,
        followup: 803,
        information: 804,
        content: 805
      },
      pd: 7,
      custom: {
        information: {
          enabled: true,
          repeat: false,
          source: 'url',
          patterns: ['/OrderShippingBillingConfirmationView']
        }
      }
    },

    previous: false,

    analytics: {
      google_local: false,
      google_remote: false
    },

    cpps: {
      JSessionID: {
        source: 'cookie',
        name: 'JSESSIONID'
      },
      s_vi: {
        source: 'cookie',
        name: 's_vi'
      },
      OMTR_BEACON: {
        source: 'function',
        value: function getAABeacon() {
          function getQueryValue(args, str) {
            var res = "",
                strb = str.split('&');
            for (var p = 0; p < strb.length; p++) {
              var bts = strb[p].split('=');
              for (var h = 0; h < args.length; h++) {
                if (args[h] == bts[0]) {
                  res += bts[0] + '=' + bts[1] + '&';
                  break;
                }
              }
            }
            if (res.substr(res.length - 1) == '&') {
              res = res.substr(0, res.length - 1);
            }
            return res;
          }

          var whitelist = ['AQB', 'mid', 'aid', 'vid', 'fid', 'AQE'],
              foundSrc = '';
          for (var p in window) {
            if ((p.substring(0, 4) == 's_i_') && (window[p].src)) {
              var src = window[p].src;
              if (src.indexOf('/b/ss/') >= 0) {
                foundSrc = src;
                break;
              }
            }
          }
          //TODO: also loop through document.images just in case
          if (!foundSrc && window.document.images) {
            for (var image_num = 0; image_num < window.document.images.length; image_num++) {
              var src = window.document.images[image_num].src;
              if (src.indexOf('/b/ss/') >= 0) {
                foundSrc = src;
                break;
              }
            }
          }

          if (!foundSrc) {
            return (localStorage.getItem("fsr_om") || "");
          }

          var mainURL = mainURL = "https://" + s.trackingServerSecure + foundSrc.substring(foundSrc.indexOf('/b/ss/'), foundSrc.indexOf('?')),
              query = foundSrc.substring(foundSrc.indexOf('?') + 1),
              filteredQuery = '';
          filteredQuery = getQueryValue(whitelist, query);
          var finalval = mainURL + '?' + filteredQuery;
          if (finalval && finalval.length > 0) {
            localStorage.setItem("fsr_om", finalval);
          } else {
            finalval = localStorage.getItem("fsr_om") || "";
          }
          return finalval;
        }
      }
    },

    mode: 'first-party'
  };
  FSR.CPPS.set('cxreplayaws', 'true');

  if (supports_amd) {
    define(function () {
      return FSR
    });
  }

})($$FSR);