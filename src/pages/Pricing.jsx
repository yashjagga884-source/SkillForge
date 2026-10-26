import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Weekly',
    price: '₹49',
    period: 'per week',
    detail: 'A little room to try things out.',
    comparison: '₹49 / week',
    savings: null,
    action: 'Ask about weekly',
  },
  {
    name: 'Monthly',
    price: '₹149',
    period: 'per month',
    detail: 'A steady pace, billed once a month.',
    comparison: '₹149 / month',
    savings: null,
    action: 'Ask about monthly',
  },
  {
    name: 'Annual',
    price: '₹999',
    period: 'per year',
    detail: 'Best value if you plan to keep learning.',
    comparison: 'About ₹83 / month',
    savings: 'Save ₹789 vs 12 monthly payments',
    action: 'Ask about annual',
    featured: true,
  },
]

const included = [
  'Career paths and role guides',
  'Technology learning resources',
  'Full quiz library',
  'Progress saved in your browser',
]

export function Pricing() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 py-8">
      <header className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Subscribe</p>
        <h1 className="section-heading">Choose a plan that fits your pace.</h1>
        <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-300">
          Choose how often you’d like to be billed. Every plan includes the same SkillForge learning tools.
        </p>
      </header>

      <section className="grid items-stretch gap-5 md:grid-cols-3" aria-label="Subscription plans">
        {plans.map((plan) => (
          <article key={plan.name} className={`relative flex flex-col rounded-xl border p-6 ${plan.featured ? 'border-primary bg-primary/[0.035] shadow-md dark:bg-primary/10' : 'card'}`}>
            {plan.featured && <span className="absolute right-5 top-5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Best value</span>}
            <div className={plan.featured ? 'pt-9' : ''}>
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="mt-2 min-h-10 text-sm text-slate-600 dark:text-slate-300">{plan.detail}</p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{plan.period}</span>
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{plan.comparison}</p>
              {plan.savings ? <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">{plan.savings}</p> : <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Billed {plan.name.toLowerCase()}</p>}
            </div>

            <a
              className={plan.featured ? 'btn-primary mt-6 text-center' : 'btn-outline mt-6 text-center'}
              href={`mailto:hello@skillforge.ai?subject=${encodeURIComponent(`Interested in the ${plan.name.toLowerCase()} plan`)}`}
            >
              {plan.action}
            </a>

            <div className="mt-7 border-t border-slate-200 pt-5 dark:border-dark-border">
              <p className="mb-4 text-sm font-semibold">Included with every plan</p>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Check size={17} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <p className="mx-auto max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
        Prices are shown in INR. Subscription checkout is not enabled yet; use the plan links to get in touch.
      </p>
    </div>
  )
}
