import posthog from 'posthog-js';

const POSTHOG_KEY = 'phc_bAzDr9pyF5cSS47pQbJDRKbj7EkEdWBebHRT183SyaD';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

export function initPostHog() {
  if (typeof window === 'undefined') return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'anonymous',
    capture_pageview: true,
    capture_pageleave: true,
  });
}

export { posthog };
