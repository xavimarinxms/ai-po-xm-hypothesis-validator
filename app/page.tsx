import Link from 'next/link';

const HOW_IT_WORKS = [
  { step: '01', title: 'Define your hypothesis', desc: 'Write your hypothesis using the "We believe that X will cause Y because Z" format. Add the primary metric you\'re measuring.' },
  { step: '02', title: 'Enter your results', desc: 'Input visitors and conversions for both control and variant. Results can come from any A/B testing tool.' },
  { step: '03', title: 'Get your verdict', desc: 'See statistical significance, uplift, confidence, and a plain-language recommendation — calculated instantly in the browser.' },
];

const ROADMAP: { category: string; items: { label: string; desc: string; status: 'planned' | 'considering' }[] }[] = [
  {
    category: 'Experiment management',
    items: [
      { label: 'Save experiments', desc: 'Save multiple experiments locally and track them over time without a backend.', status: 'planned' },
      { label: 'Experiment log', desc: 'Keep a log of all past experiments with their results, decisions, and learnings.', status: 'planned' },
      { label: 'Export to PDF', desc: 'Generate a formatted experiment report PDF to share with stakeholders.', status: 'considering' },
    ],
  },
  {
    category: 'Statistics',
    items: [
      { label: 'Sample size calculator', desc: 'Calculate the minimum sample size needed to detect a given uplift at 95% confidence before starting.', status: 'planned' },
      { label: 'Sequential testing', desc: 'Add support for sequential testing (SPRT) to allow early stopping without inflating type I error.', status: 'considering' },
      { label: 'Multi-variant support', desc: 'Run tests with more than 2 variants using chi-square with multiple degrees of freedom.', status: 'planned' },
    ],
  },
  {
    category: 'Integrations',
    items: [
      { label: 'PostHog import', desc: 'Import experiment results directly from PostHog feature flags and experiments.', status: 'considering' },
      { label: 'Optimizely import', desc: 'Pull results from Optimizely experiments via their API.', status: 'considering' },
    ],
  },
];

const STATUS_BADGE: Record<string, string> = {
  planned: 'bg-blue-50 text-blue-700 border-blue-200',
  considering: 'bg-gray-100 text-gray-600 border-gray-200',
};
const STATUS_LABEL: Record<string, string> = { planned: 'Planned', considering: 'Considering' };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900">Hypothesis Validator</span>
              <span className="hidden sm:inline text-xs text-gray-500 ml-2">by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Xavi Marín</a></span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#roadmap" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">Roadmap</a>
            <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">xavimarin.net</a>
            <a href="https://ai-po-xavi-marin-suite.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">← AI PO Suite</a>
            <Link href="/demo" className="text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg px-3.5 py-1.5 transition-colors">Try Demo</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 pt-24 pb-24 text-center">
          <p className="text-xs font-semibold text-brand-600 mb-5 tracking-widest uppercase">PO Toolkit · Tool #9 of 13</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
            Know if your test<br />actually worked
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            You ran a checkout flow test. Variant got +8.3% conversion on 2,400 users. Was it real? Enter your results and get a statistically rigorous ship / wait / discard verdict — in seconds.
          </p>
          {/* Technical badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              χ² chi-square test
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              95% confidence threshold
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              All calculations in your browser
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors shadow-sm">
              ✨ Try with sample data
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M1 8a.75.75 0 01.75-.75h10.69L8.22 3.03a.75.75 0 111.06-1.06l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l4.22-4.22H1.75A.75.75 0 011 8z"/></svg>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors">Enter your results</Link>
          </div>
          <p className="text-xs text-gray-400 mt-6">No login · All calculations in your browser · Free forever</p>
        </section>

        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12"><h2 className="text-2xl font-bold text-gray-900 mb-2">How it works</h2><p className="text-sm text-gray-500">Statistical significance without the stats degree</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HOW_IT_WORKS.map(item => (
                <div key={item.step} className="bg-white rounded-xl border border-gray-200 p-6">
                  <span className="text-xs font-bold text-brand-500 font-mono">{item.step}</span>
                  <h3 className="text-sm font-semibold text-gray-900 mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Roadmap</h2>
              <p className="text-sm text-gray-500">What's coming next to this tool</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_BADGE.planned}`}><span className="w-1.5 h-1.5 rounded-full bg-blue-500"/>Planned</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_BADGE.considering}`}><span className="w-1.5 h-1.5 rounded-full bg-gray-400"/>Considering</span>
              </div>
            </div>
            <div className="space-y-10">
              {ROADMAP.map(group => (
                <div key={group.category}>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{group.category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.items.map(item => (
                      <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_BADGE[item.status]}`}>{STATUS_LABEL[item.status]}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Under the hood — statistics explained */}
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Under the hood</h2>
              <p className="text-sm text-gray-500">No black box — here's exactly what's being calculated</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: 'χ²',
                  title: 'Chi-square test',
                  desc: 'Compares observed vs expected conversion counts between control and variant. If the difference is too large to be explained by chance, it\'s significant.',
                },
                {
                  icon: 'p',
                  title: 'p-value < 0.05',
                  desc: 'The probability that the observed difference happened by random chance. Below 5% = the result is real with 95% confidence. Above 5% = keep collecting data.',
                },
                {
                  icon: '↑%',
                  title: 'Relative uplift',
                  desc: 'How much better (or worse) the variant performed vs control. A 3% absolute improvement on a 15% baseline = +20% relative uplift — much more informative than raw numbers.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 font-bold text-sm mb-4">{item.icon}</div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-white">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">Why I built this</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Problem', text: 'Most POs don\'t validate A/B tests statistically. They call winners based on conversion rate alone, ignoring sample size and significance.' },
                { label: 'Solution', text: 'A chi-square calculator with plain-language verdicts — ship / wait / discard — that any PO can use without a stats background.' },
                { label: 'Impact', text: 'Fewer false-positive launches, more confident product decisions, and a team that builds the habit of data-driven validation.' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">{item.label}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>Built by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Xavi Marín</a> · All calculations run locally, no data stored</span>
          <span>PO Toolkit #9 of 13</span>
        </div>
      </footer>
    </div>
  );
}
