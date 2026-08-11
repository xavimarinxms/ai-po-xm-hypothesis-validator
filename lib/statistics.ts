import { Variant, StatResult } from '@/types';

// Chi-square distribution p-value approximation (1 degree of freedom)
function chiSquarePValue(chi2: number): number {
  if (chi2 <= 0) return 1;
  // Approximation for 1 df using error function complement
  const x = Math.sqrt(chi2 / 2);
  const t = 1 / (1 + 0.3275911 * x);
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  return poly * Math.exp(-x * x);
}

export function calculateChiSquare(control: Variant, variant: Variant): StatResult {
  const totalControl = control.visitors;
  const totalVariant = variant.visitors;
  const totalConv = control.conversions + variant.conversions;
  const totalNonConv = (totalControl - control.conversions) + (totalVariant - variant.conversions);
  const total = totalControl + totalVariant;

  const controlRate = control.conversions / control.visitors;
  const variantRate = variant.conversions / variant.visitors;
  const uplift = ((variantRate - controlRate) / controlRate) * 100;

  // Expected values
  const eCC = (totalConv * totalControl) / total;   // control conversions expected
  const eNC = (totalNonConv * totalControl) / total; // control non-conv expected
  const eCV = (totalConv * totalVariant) / total;    // variant conversions expected
  const eNV = (totalNonConv * totalVariant) / total; // variant non-conv expected

  const chiSquare = eCC > 0 && eNC > 0 && eCV > 0 && eNV > 0
    ? Math.pow(control.conversions - eCC, 2) / eCC
      + Math.pow((totalControl - control.conversions) - eNC, 2) / eNC
      + Math.pow(variant.conversions - eCV, 2) / eCV
      + Math.pow((totalVariant - variant.conversions) - eNV, 2) / eNV
    : 0;

  const pValue = chiSquarePValue(chiSquare);
  const confidence = (1 - pValue) * 100;
  const significant = pValue < 0.05;

  const minSamplePerVariant = 1000;
  const sampleSize: StatResult['sampleSize'] =
    totalControl < minSamplePerVariant || totalVariant < minSamplePerVariant
      ? 'too_small'
      : totalControl > 5000 && totalVariant > 5000 ? 'large' : 'adequate';

  let recommendation = '';
  if (sampleSize === 'too_small') {
    recommendation = 'Sample size is too small to draw conclusions. Keep running the test.';
  } else if (!significant) {
    recommendation = `No significant difference detected (p = ${pValue.toFixed(3)}). Continue the test or accept the null hypothesis.`;
  } else if (uplift > 0) {
    recommendation = `Variant wins with ${uplift.toFixed(1)}% uplift at ${confidence.toFixed(1)}% confidence. Consider shipping the variant.`;
  } else {
    recommendation = `Control wins — variant performs ${Math.abs(uplift).toFixed(1)}% worse at ${confidence.toFixed(1)}% confidence. Discard the variant.`;
  }

  return { controlRate, variantRate, uplift, chiSquare, pValue, significant, confidence, recommendation, sampleSize };
}
