import posthog from 'posthog-js';

const POSTHOG_KEY = 'PLACEHOLDER_TOKEN';
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
