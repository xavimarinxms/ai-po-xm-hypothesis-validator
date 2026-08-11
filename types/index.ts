export interface Variant {
  name: string;
  visitors: number;
  conversions: number;
}

export interface Experiment {
  name: string;
  hypothesis: string;
  metric: string;
  control: Variant;
  variant: Variant;
}

export interface StatResult {
  controlRate: number;
  variantRate: number;
  uplift: number;
  chiSquare: number;
  pValue: number;
  significant: boolean;
  confidence: number;
  recommendation: string;
  sampleSize: 'too_small' | 'adequate' | 'large';
}
