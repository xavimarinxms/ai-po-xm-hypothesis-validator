import { Experiment } from '@/types';

export const SAMPLE_EXPERIMENT: Experiment = {
  name: 'NovaPay — Onboarding CTA test',
  hypothesis: 'Changing the primary CTA from "Create account" to "Start free trial" will increase sign-up conversion rate because it reduces perceived commitment.',
  metric: 'Sign-up completion rate',
  control: { name: 'Control — "Create account"', visitors: 4823, conversions: 289 },
  variant: { name: 'Variant — "Start free trial"', visitors: 4791, conversions: 367 },
};
