/* The measurement ID identifies the public data stream, not dashboard access. */
(() => {
    'use strict';

    const location = window.location;
    const measurementId = document.currentScript?.dataset.measurementId;
    if (location.origin !== 'https://yjgooo.github.io') return;

    // This preference stays in this browser and is never sent to Google.
    const preferenceKey = 'xi-gong-analytics-disabled';
    const preference = new URL(location.href).searchParams.get('analytics');
    let excluded = preference === 'off';
    let saved = true;
    try {
        if (preference === 'off') window.localStorage.setItem(preferenceKey, '1');
        if (preference === 'on') window.localStorage.removeItem(preferenceKey);
        excluded = excluded || window.localStorage.getItem(preferenceKey) === '1';
    } catch (_) {
        saved = false;
    }
    if (preference === 'off' || preference === 'on') {
        const status = document.createElement('p');
        status.setAttribute('role', 'status');
        status.style.cssText = 'max-width:720px;margin:24px auto;padding:12px 16px;border:1px solid #ddd;font:16px/1.5 sans-serif;';
        status.textContent = preference === 'off'
            ? (saved ? 'Your visits from this browser are now excluded from analytics.'
                : 'This visit is excluded, but your browser could not save the preference. Future visits may still be counted.')
            : (saved ? 'The analytics opt-out for this browser has been removed. Browser privacy settings still apply.'
                : 'Your browser could not update the analytics preference.');
        document.body.prepend(status);
    }
    if (excluded || !/^G-[A-Z0-9]+$/.test(measurementId || '') ||
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
