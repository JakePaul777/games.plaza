/* Offline stub for the Poki SDK. Same public API as window.PokiSDK,
   but no ads, no tracking, no network requests. Save as js/v2/poki-sdk.js */
(function () {
  var noop = function () {};
  var resolved = function (v) { return function () { return Promise.resolve(v); }; };
  window.PokiSDK = {
    init: resolved(), initWithVideoHB: resolved(),
    setDebug: noop, setLogging: noop, setPlayerAge: noop,
    gameLoadingStart: noop, gameLoadingProgress: noop, gameLoadingFinished: noop,
    gameplayStart: noop, gameplayStop: noop, happyTime: noop,
    customEvent: noop, captureError: noop, logError: noop, measure: noop,
    sendHighscore: noop, enableEventTracking: noop, togglePlayerAdvertisingConsent: noop,
    commercialBreak: resolved(), rewardedBreak: resolved(true),   // true = reward granted
    displayAd: noop, destroyAd: noop, muteAd: noop,
    isAdBlocked: function () { return false; },
    shareableURL: function () { return Promise.resolve(location.href); },
    getURLParam: function (k) { return new URLSearchParams(location.search).get(k) || ''; },
    getLanguage: function () { return (navigator.language || 'en').slice(0, 2); },
    generateScreenshot: noop
  };
})();
