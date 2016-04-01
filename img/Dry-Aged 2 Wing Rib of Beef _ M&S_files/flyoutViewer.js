 /*!************************************************************************
  *
  * ADOBE CONFIDENTIAL
  * ___________________
  *
  *  Copyright 2013 Adobe Systems Incorporated
  *  All Rights Reserved.
  *
  * NOTICE:  All information contained herein is, and remains
  * the property of Adobe Systems Incorporated and its suppliers,
  * if any.  The intellectual and technical concepts contained
  * herein are proprietary to Adobe Systems Incorporated and its
  * suppliers and are protected by trade secret or copyright law.
  * Dissemination of this information or reproduction of this material
  * is strictly forbidden unless prior written permission is obtained
  * from Adobe Systems Incorporated.
  **************************************************************************/
 if ("undefined" == typeof s7viewers)
  s7viewers = {};
 else if ("object" != typeof s7viewers)
  throw Error("Cannot initialize a root 's7viewers' package. s7viewers is not an object");
 s7viewers.FlyoutViewer || (s7viewers.FlyoutViewer = function (b) {
  this.sdkBasePath = "s7sdk/2.9/";
  this.containerId = null;
  this.params = {};
  this.handlers = [];
  this.onInitFail = this.onInitComplete = null;
  this.legacyFixedSizing = this.initCalled = this.initializationComplete = !1;
  if ("object" == typeof b) {
  b.containerId && this.setContainerId(b.containerId);
  if (b.params)
  for (var c in b.params)
  b.params.hasOwnProperty(c) && b.params.propertyIsEnumerable(c) && this.setParam(c, b.params[c]);
  b.handlers && this.setHandlers(b.handlers);
  b.localizedTexts &&
  this.setLocalizedTexts(b.localizedTexts)
  }
  }, s7viewers.FlyoutViewer.cssClassName = "s7flyoutviewer", s7viewers.FlyoutViewer.prototype.setContainerId = function (b) {
  this.containerId = b || null
  }, s7viewers.FlyoutViewer.getCodeBase = function () {
  for (var b = "", c = "", d = null, d = document.scripts ? document.scripts : document.getElementsByTagName("script"), a = 0; a < d.length; a++) {
  var g = d[a].src,
  l = /^\s*(http[s]?:\/\/[^\/]*)?(.*)(\/flyoutViewer\.js)/.exec(g);
  if (l && 4 == l.length) {
  "undefined" !== typeof l[1] && (b = l[1]);
  b += l[2];
  c = g;
  break
  }
  }
  "" !=
  b && b.lastIndexOf("/") != b.length - 1 && (b += "/");
  s7viewers.FlyoutViewer.codebase = {
  contentUrl: b,
  isDAM: /\/etc\/dam\/viewers\//.test(c)
  }
  }, s7viewers.FlyoutViewer.getCodeBase(), s7viewers.FlyoutViewer.prototype.getContentUrl = function () {
  return s7viewers.FlyoutViewer.codebase.contentUrl
  }, s7viewers.FlyoutViewer.prototype.includeViewer = function () {
  function b() {
  function b(a, c) {
  var d = document.getElementById(a).className.split(" "); - 1 == d.indexOf(c) && (d[d.length] = c, document.getElementById(a).className = d.join(" "))
  }

  function c(b,
  d) {
  var h, e = b * d;
  h = 31E4 >= e ? 1 : 31E4 < e && 92E4 >= e ? 2 : 0;
  var e = a.containerId,
  f = 0 == h ? "s7size_large" : 1 == h ? "s7size_small" : "s7size_medium";
  h = document.getElementById(e).className;
  var g = /^(.*)(s7size_small|s7size_medium|s7size_large)(.*)$/gi,
  f = h.match(g) ? h.replace(g, "$1" + f + "$3") : h + " " + f;
  h != f && (document.getElementById(e).className = f)
  }

  function d(b, c, e) {
  a.legacyFixedSizing || (null == a.s7swatches || a.singleImage || a.s7swatches.resize(b, a.swatchesHeight), a.s7flyout.resize(b, e))
  }
  a.s7params.push("aemmode", s7viewers.FlyoutViewer.codebase.isDAM ?
  "1" : "0");
  a.s7params.push("tmblayout", "0,1");
  a.s7params.push("resizable", "0");
  a.s7params.push("orientation", "0");
  a.s7params.push("textpos", "none");
  "desktop" != s7sdk.browser.device.name && a.s7params.push("enablescrollbuttons", "0");
  "ontouchstart" in window ? b(a.containerId, "s7touchinput") : b(a.containerId, "s7mouseinput");
  var e = document.getElementById(a.containerId),
  f = e.style.minHeight;
  e.style.minHeight = "1px";
  var k = document.createElement("div");
  k.style.position = "relative";
  k.style.width = "100%";
  k.style.height =
  "100%";
  e.appendChild(k);
  var m = k.offsetHeight;
  1 >= k.offsetHeight && (e.style.height = "100%", m = k.offsetHeight);
  e.removeChild(k);
  e.style.minHeight = f;
  a.container = new s7sdk.common.Container(a.containerId, a.s7params, a.containerId + "_container");
  a.container.addEventListener(s7sdk.event.ResizeEvent.COMPONENT_RESIZE, function (b) {
  if ("undefined" == typeof b.target || b.target == document.getElementById(a.containerId + "_container")) {
  var e = b.s7event.h,
  e = a.singleImage ? b.s7event.h : b.s7event.h - a.swatchesHeight;
  d(b.s7event.w,
  b.s7event.h, e);
  c(b.s7event.w, b.s7event.h)
  }
  }, !1);
  a.container.addEventListener(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE, function (a) {}, !1);
  f = !1;
  switch (a.s7params.get("responsive", "auto")) {
  case "fit":
  f = !1;
  break;
  case "constrain":
  f = !0;
  break;
  default:
  f = 0 == m
  }
  c(a.container.getWidth(), a.container.getHeight());
  a.container.isFixedSize() ? a.viewerMode = "fixed" : a.viewerMode = f ? "ratio" : "free";
  0 < a.getMainViewSize().height && (a.legacyFixedSizing = !0);
  a.legacyFixedSizing && (m = e.clientWidth, f = e.clientHeight, console.log("wh:::" +
  m + ":" + f), isNaN(m) || isNaN(f) || a.container.resize(m, f));
  a.containerHeight = a.container.getHeight();
  document.getElementById(a.containerId + "_container").style.overflow = "visible";
  a.s7flyout = new s7sdk.FlyoutZoomView(a.container, a.s7params, a.containerId + "_flyout");
  a.s7flyout.setCSS(".s7flyoutzoomview", "visibility", "hidden");
  a.s7swatches = new s7sdk.Swatches(a.container, a.s7params, a.containerId + "_swatches");
  a.swatchesHeight = a.s7swatches.getHeight();
  a.trackingManager.attach(a.s7swatches);
  a.s7swatches.addEventListener(s7sdk.AssetEvent.SWATCH_SELECTED_EVENT,
  function (b) {
  b = b.s7event.asset;
  a.s7flyout && a.s7flyout.setItem(b)
  }, !1);
  a.trackingManager.attach(a.s7flyout);
  a.s7mediaset = new s7sdk.MediaSet(null, a.s7params, a.containerId + "_mediaset");
  a.trackingManager.attach(a.s7mediaset);
  a.s7mediaset.addEventListener(s7sdk.AssetEvent.NOTF_SET_PARSED, function (b) {
  a.s7mediasetDesc = b.s7event.asset;
  a.initialFrame = Math.max(0, parseInt("undefined" != typeof a.s7params.get("initialframe") ? a.s7params.get("initialframe") : 0));
  a.initialFrame < a.s7mediasetDesc.items.length || (a.initialFrame =
  0);
  var c;
  "ratio" == a.viewerMode && (c = a.s7mediasetDesc.items[0], c = c.width / c.height);
  1 < a.s7mediasetDesc.items.length ? (a.singleImage = !1, null != a.s7swatches && a.s7swatches.setCSS(".s7swatches", "visibility", "inherit"), "fixed" == a.viewerMode ? (a.container.resize(a.container.getWidth(), a.containerHeight), d(a.container.getWidth(), a.containerHeight, a.containerHeight - a.swatchesHeight)) : "ratio" == a.viewerMode ? (b = a.container.getWidth(), a.container.setModifier({
  aspect: b / (b / c + a.swatchesHeight)
  })) : d(a.container.getWidth(),
  a.containerHeight, a.container.getHeight() - a.swatchesHeight), a.s7swatches.setMediaSet(a.s7mediasetDesc), a.s7swatches.selectSwatch(a.initialFrame, !0)) : 1 == a.s7mediasetDesc.items.length && (a.singleImage = !0, null != a.s7swatches && a.s7swatches.setCSS(".s7swatches", "visibility", "hidden"), "fixed" == a.viewerMode ? a.container.resize(a.container.getWidth(), a.containerHeight - a.swatchesHeight) : "ratio" == a.viewerMode ? a.container.setModifier({
  aspect: c
  }) : d(a.container.getWidth(), a.container.getHeight(), a.container.getHeight()),
  a.s7flyout.setItem(a.s7mediasetDesc.items[a.initialFrame]));
  null != a.handlers.initComplete && "function" == typeof a.handlers.initComplete && a.handlers.initComplete();
  a.s7flyout.setCSS(".s7flyoutzoomview", "visibility", "inherit")
  }, !1);
  a.trackingManager.setCallback(function (b, c, d, e, f) {
  a.appMeasurementBridge && a.appMeasurementBridge.track(b, c, d, e, f);
  a.handlers.trackEvent && a.handlers.trackEvent(b, c, d, e, f);
  "s7ComponentEvent" in window && s7ComponentEvent(b, c, d, e, f)
  });
  "function" == typeof AppMeasurementBridge && (a.appMeasurementBridge =
  new AppMeasurementBridge(a.trackingParams));
  "ratio" == a.viewerMode && (e.style.height = "auto")
  }
  s7sdk.Util.lib.include("s7sdk.set.MediaSet");
  s7sdk.Util.lib.include("s7sdk.image.FlyoutZoomView");
  s7sdk.Util.lib.include("s7sdk.set.Swatches");
  s7sdk.Util.lib.include("s7sdk.common.Container");
  this.trackingManager = new s7sdk.TrackingManager;
  // because FlyoutViewer.css is not used and causes an 404, we set last parameter to null
  this.s7params = new s7sdk.ParameterManager(null, null, {
    asset: "MediaSet.asset"
  }, null);
  var c = "";
  this.s7params.params.config && "string" == typeof this.s7params.params.config &&
  (c = ",", c = -1 < this.s7params.params.config.indexOf("/") ? c + this.s7params.params.config.split("/")[1] : c + this.s7params.params.config);
  this.s7params.setViewer("504,5.2.3" + c);
  this.s7params.setLocalizedTexts({
  en: {
  "FlyoutZoomView.TIP_BUBBLE_OVER": "Mouse over image for a closer look.",
  "FlyoutZoomView.TIP_BUBBLE_TAP": "Drag image to explore."
  },
  defaultLocale: "en"
  });
  for (var d in this.params)
  "localizedtexts" != d ? this.s7params.push(d, this.params[d]) : this.s7params.setLocalizedTexts(this.params[d]);
  this.container = this.s7swatches =
  this.s7visibility = this.s7mediasetDesc = this.s7mediaset = this.s7flyout = null;
  this.initialFrame = 0;
  this.visibilityManager = null;
  this.containerHeight = this.swatchesHeight = 0;
  this.singleImage = !1;
  null != this.containerId && (this.container = document.getElementById(this.containerId)) && ("" != this.container.className ? -1 == this.container.className.indexOf(s7viewers.FlyoutViewer.cssClassName) && (this.container.className += " " + s7viewers.FlyoutViewer.cssClassName) : this.container.className = s7viewers.FlyoutViewer.cssClassName);
  var a = this;
  this.s7params.addEventListener(s7sdk.Event.SDK_READY, function () {
  a.initSiteCatalyst(a.s7params, b)
  }, !1);
  this.s7params.init()
  }, s7viewers.FlyoutViewer.prototype.setParam = function (b, c) {
  this.params[b] = c
  }, s7viewers.FlyoutViewer.prototype.getParam = function (b) {
  return this.params[b]
  }, s7viewers.FlyoutViewer.prototype.setParams = function (b) {
  b = b.split("&");
  for (var c = 0; c < b.length; c++) {
  var d = b[c].split("=");
  1 < d.length && this.setParam(d[0], decodeURIComponent(b[c].split("=")[1]))
  }
  }, s7viewers.FlyoutViewer.prototype.s7sdkUtilsAvailable =
  function () {
  return "undefined" != typeof s7sdk
  }, s7viewers.FlyoutViewer.prototype.init = function () {
  this.initCalled = !0;
  if (this.initializationComplete)
  return this;
  for (var b = !1, c = this.getContentUrl() + this.sdkBasePath + "js/s7sdk/utils/Utils.js", d = null, d = document.scripts ? document.scripts : document.getElementsByTagName("script"), a = 0; a < d.length; a++)
  if (d[a] && null != d[a].getAttribute("src") && -1 != d[a].getAttribute("src").indexOf(c)) {
  b = !0;
  break
  }
  if (this.s7sdkUtilsAvailable())
  s7sdk.Util.init(), this.includeViewer(), this.initializationComplete = !0;
  else if (!this.s7sdkUtilsAvailable() && b)
  var g = this,
  l = setInterval(function () {
  g.s7sdkUtilsAvailable() && (clearInterval(l), s7sdk.Util.init(), g.includeViewer(), g.initializationComplete = !0)
  }, 100);
  else {
  b = document.createElement("script");
  b.setAttribute("language", "javascript");
  b.setAttribute("type", "text/javascript");
  b.setAttribute("src", c);
  var c = document.getElementsByTagName("head"),
  n = this;
  b.onload = b.onerror = function () {
  this.executed || (this.executed = !0, n.s7sdkUtilsAvailable() && s7sdk.Util && (s7sdk.Util.init(),
  n.includeViewer(), n.initializationComplete = !0))
  };
  b.onreadystatechange = function () {
  var a = this;
  "complete" != this.readyState && "loaded" != this.readyState || setTimeout(function () {
  a.onload();
  a.onreadystatechange = null
  }, 0)
  };
  c[0].appendChild(b)
  }
  return this
  }, s7viewers.FlyoutViewer.prototype.getDomain = function (b) {
  b = /(^http[s]?:\/\/[^\/]+)/i.exec(b);
  return null == b ? "" : b[1]
  }, s7viewers.FlyoutViewer.prototype.setAsset = function (b) {
  this.s7mediaset ? this.s7mediaset.setAsset(b) : this.setParam("asset", b)
  }, s7viewers.FlyoutViewer.prototype.setLocalizedTexts =
  function (b) {
  this.s7params ? this.s7params.setLocalizedTexts(b) : this.setParam("localizedtexts", b)
  }, s7viewers.FlyoutViewer.prototype.initSiteCatalyst = function (b, c) {
  var d = b.get("asset", null, "MediaSet").split(",")[0].split(":")[0];
  if (-1 != d.indexOf("/")) {
  var d = s7sdk.MediaSetParser.findCompanyNameInAsset(d),
  a = b.get("config2");
  "" != a && "undefined" != typeof a ? (this.trackingParams = {
  siteCatalystCompany: d,
  config2: a,
  isRoot: b.get("serverurl")
  }, a = this.getContentUrl() + "../AppMeasurementBridge.jsp?company=" + d, b.get("serverurl",
  null) && (a += "&isRoot=" + b.get("serverurl")), d = document.createElement("script"), d.setAttribute("language", "javascript"), d.setAttribute("type", "text/javascript"), d.setAttribute("src", a), a = document.getElementsByTagName("head"), d.onload = d.onerror = function () {
  this.executed || (this.executed = !0, "function" == typeof c && c())
  }, d.onreadystatechange = function () {
  var a = this;
  "complete" != this.readyState && "loaded" != this.readyState || setTimeout(function () {
  a.onload();
  a.onreadystatechange = null
  }, 0)
  }, a[0].appendChild(d)) : "function" ==
  typeof c && c()
  }
  }, s7viewers.FlyoutViewer.prototype.getComponent = function (b) {
  switch (b) {
  case "container":
  return this.container || null;
  case "swatches":
  return this.s7swatches || null;
  case "flyout":
  return this.s7flyout || null;
  case "mediaSet":
  return this.s7mediaset || null;
  case "parameterManager":
  return this.s7params || null;
  default:
  return null
  }
  }, s7viewers.FlyoutViewer.prototype.setHandlers = function (b) {
  if (!this.initCalled) {
  this.handlers = [];
  for (var c in b)
  b.hasOwnProperty(c) && "function" == typeof b[c] && (this.handlers[c] =
  b[c])
  }
  }, s7viewers.FlyoutViewer.prototype.getMainViewSize = function () {
  var b = document.getElementById(this.containerId + "_container"),
  c = document.createElement("div");
  c.style.position = "absolute";
  c.className = "s7flyoutzoomview";
  c.style.borderStyle = "none";
  c.style.margin = "0px";
  c.style.padding = "0px";
  b.appendChild(c);
  var d = {
  width: 0,
  height: 0
  };
  0 < c.offsetHeight && (d.width = c.offsetWidth, d.height = c.offsetHeight);
  b.removeChild(c);
  return d
  });
