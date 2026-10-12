/* The measurement ID identifies the public data stream, not dashboard access. */
(() => {
    'use strict';

    const location = window.location;
    const measurementId = document.currentScript?.dataset.measurementId;
    if (location.origin !== 'https://yjgooo.github.io' ||
        !/^G-[A-Z0-9]+$/.test(measurementId || '') ||
        window.navigator?.globalPrivacyControl === true ||
        window.navigator?.doNotTrack === '1' || window.doNotTrack === '1' ||
        window.__xiGongAnalyticsInitialized) {
        return;
    }
    window.__xiGongAnalyticsInitialized = true;

    // Do not send query parameters or fragments from page or referrer URLs.
    let referrer = '';
    try {
        const url = new URL(document.referrer);
        if (url.protocol === 'https:' || url.protocol === 'http:') {
            referrer = url.origin + url.pathname;
        }
    } catch (_) {
        // An absent or invalid referrer stays empty.
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
        send_page_view: true,
        page_location: location.origin + location.pathname,
        page_referrer: referrer,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
    });

    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(tag);
})();
