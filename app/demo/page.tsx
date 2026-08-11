'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Experiment, StatResult } from '@/types';
import { calculateChiSquare } from '@/lib/statistics';
import { SAMPLE_EXPERIMENT } from '@/lib/sampleData';

const EMPTY: Experiment = {
  name: '', hypothesis: '', metric: '',
  control: { name: 'Control', visitors: 0, conversions: 0 },
  variant: { name: 'Variant', visitors: 0, conversions: 0 },
};

function fmt(n: number, decimals = 1) { return n.toFixed(decimals); }

function ResultPanel({ result }: { result: StatResult }) {
  const sigColor = result.significant ? 'text-emerald-600' : 'text-amber-600';
  const sizeLabels = { too_small: 'Too small', adequate: 'Adequate', large: 'Large' };
  const sizeColors = { too_small: 'text-red-600', adequate: 'text-amber-600', large: 'text-emerald-600' };

  return (
    <div className="flex flex-col gap-4">
      {/* Verdict */}
      <div className={`rounded-xl border p-5 ${result.significant ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${sigColor}`}>
          {result.significant ? '✓ Statistically significant' : '○ Not significant yet'}
        </p>
        <p className="text-sm text-gray-800 leading-relaxed">{result.recommendation}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Control rate', value: `${fmt(result.controlRate * 100)}%` },
          { label: 'Variant rate', value: `${fmt(result.variantRate * 100)}%` },
          { label: 'Uplift', value: `${result.uplift >= 0 ? '+' : ''}${fmt(result.uplift)}%`, highlight: result.uplift > 0 ? 'green' : result.uplift < 0 ? 'red' : '' },
          { label: 'Confidence', value: `${fmt(result.confidence)}%`, highlight: result.significant ? 'green' : '' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{k.label}</p>
            <p className={`text-xl font-bold ${k.highlight === 'green' ? 'text-emerald-600' : k.highlight === 'red' ? 'text-red-500' : 'text-gray-900'}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Stats detail */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Statistical details</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-xs text-gray-500 mb-0.5">χ² statistic</p><p className="font-semibold">{fmt(result.chiSquare, 3)}</p></div>
          <div><p className="text-xs text-gray-500 mb-0.5">p-value</p><p className="font-semibold">{fmt(result.pValue, 4)}</p></div>
          <div><p className="text-xs text-gray-500 mb-0.5">Sample size</p><p className={`font-semibold ${sizeColors[result.sampleSize]}`}>{sizeLabels[result.sampleSize]}</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Chi-square test, 1 degree of freedom · α = 0.05</p>
      </div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={null}>
      <DemoPageInner />
    </Suspense>
  );
}

function DemoPageInner() {
  const embed = useSearchParams().get('embed') === '1';
  const [exp, setExp] = useState<Experiment>(EMPTY);
  const [result, setResult] = useState<StatResult | null>(null);

  const setField = (path: string[], value: string | number) => {
    setExp(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]] as Record<string, unknown>;
      cur[path[path.length - 1]] = value;
      return next;
    });
  };

  const calculate = () => {
    if (exp.control.visitors > 0 && exp.variant.visitors > 0) {
      setResult(calculateChiSquare(exp.control, exp.variant));
    }
  };

  const loadSample = () => { setExp(SAMPLE_EXPERIMENT); setResult(null); };

  const numInput = (path: string[], label: string) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">{label}</label>
      <input type="number" min={0}
        value={(path.reduce((o: Record<string, unknown>, k) => o[k] as Record<string, unknown>, exp as unknown as Record<string, unknown>) as unknown as number) || ''}
        onChange={e => setField(path, Number(e.target.value))}
        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!embed && <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="text-sm font-semibold text-gray-900">Hypothesis Validator</span>
            <span className="hidden sm:inline text-xs text-gray-500">by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Xavi Marín</a></span>
          </div>
          <Link href="/" className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">← Home</Link>
        </div>
      </nav>}

      <div className="bg-blue-50 border-b border-blue-100 px-4 py-2.5 text-center text-xs text-blue-700 font-medium">
        Demo mode — all calculations run in your browser · No data is sent to any server
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Hypothesis Validator</h1>
            <p className="text-sm text-gray-500">Enter your A/B test results and get statistical significance instantly.</p>
          </div>
          <button onClick={loadSample} className="text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-300 rounded-lg px-3.5 py-2 transition-colors">
            ✨ Sample data
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Experiment info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-gray-900">Experiment</h2>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Experiment name</label>
                <input type="text" value={exp.name} onChange={e => setField(['name'], e.target.value)} placeholder="e.g. NovaPay CTA test"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Hypothesis</label>
                <textarea value={exp.hypothesis} onChange={e => setField(['hypothesis'], e.target.value)} rows={3}
                  placeholder="We believe that [change] will cause [outcome] because [reason]."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Primary metric</label>
                <input type="text" value={exp.metric} onChange={e => setField(['metric'], e.target.value)} placeholder="e.g. Sign-up conversion rate"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
              </div>
            </div>

            {/* Control */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-gray-900">Control (A)</h2>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Variant name</label>
                <input type="text" value={exp.control.name} onChange={e => setField(['control', 'name'], e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
              </div>
              {numInput(['control', 'visitors'], 'Visitors')}
              {numInput(['control', 'conversions'], 'Conversions')}
              {exp.control.visitors > 0 && <p className="text-xs text-gray-400">Rate: {((exp.control.conversions / exp.control.visitors) * 100).toFixed(2)}%</p>}
            </div>

            {/* Variant */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-gray-900">Variant (B)</h2>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Variant name</label>
                <input type="text" value={exp.variant.name} onChange={e => setField(['variant', 'name'], e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all" />
              </div>
              {numInput(['variant', 'visitors'], 'Visitors')}
              {numInput(['variant', 'conversions'], 'Conversions')}
              {exp.variant.visitors > 0 && <p className="text-xs text-gray-400">Rate: {((exp.variant.conversions / exp.variant.visitors) * 100).toFixed(2)}%</p>}
            </div>

            <button onClick={calculate} disabled={exp.control.visitors === 0 || exp.variant.visitors === 0}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl py-3 px-6 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">
              ✦ Calculate significance
            </button>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {!result && (
              <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center flex flex-col items-center justify-center h-48">
                <p className="text-sm text-gray-400">Results will appear here</p>
                <p className="text-xs text-gray-300 mt-1">Enter data and click Calculate</p>
              </div>
            )}
            {result && (
              <div>
                {exp.hypothesis && (
                  <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Hypothesis</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{exp.hypothesis}</p>
                  </div>
                )}
                <ResultPanel result={result} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>Built by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Xavi Marín</a> · All calculations run locally, no data stored</span>
          <span>PO Toolkit #9 of 9</span>
        </div>
      </footer>
    </div>
  );
}
