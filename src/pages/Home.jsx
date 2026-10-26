import { useNavigate } from 'react-router-dom'
import { motion } from '../components/common/StaticMotion'
import { ArrowRight, Zap, Users, Rocket, CheckCircle2, Sparkles } from '../components/common/Icons'
import { CAREERS, TECHNOLOGIES, TESTIMONIALS, FAQS } from '../constants/data'
import { CareerCard } from '../components/common/CareerCard'
import { TechCard } from '../components/common/TechCard'

export function Home() {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-6 py-16 dark:border-indigo-400/15 dark:from-indigo-950/30 dark:via-dark-bg dark:to-emerald-950/20 md:px-12 md:py-24">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />
        <motion.div
          className="relative text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight font-poppins mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="eyebrow mb-6"><Sparkles className="h-3.5 w-3.5" /> Your career co-pilot</span>
            <br />
            <span className="gradient-text">Learn smarter.</span>
            <br />
            <span className="text-ink dark:text-white">Build faster.</span>
            <br />
            <span className="gradient-text">Get hired.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl leading-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Discover your ideal career path, get personalized learning roadmaps, and build an impressive portfolio with SkillForge AI.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <button
              onClick={() => navigate('/careers')}
              className="btn-primary flex items-center justify-center gap-2 text-lg"
            >
              Explore Careers <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/technologies')}
              className="btn-outline flex items-center justify-center gap-2 text-lg"
            >
              Browse Technologies
            </button>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            {['Personalized roadmaps', 'Industry-aligned skills', 'Portfolio-first learning'].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-secondary" />{item}</span>
            ))}
          </div>
        </motion.div>

        {/* Hero Animation */}
        <motion.div
          className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: Zap, label: '8+ Careers', desc: 'Explore diverse career paths' },
            { icon: Users, label: '1000+ Students', desc: 'Join our learning community' },
            { icon: Rocket, label: '100% Success', desc: 'Career transition stories' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-2xl border border-white/70 bg-white/70 p-6 text-center shadow-sm backdrop-blur-sm dark:border-dark-border dark:bg-dark-card/80"
              >
                <div className="mb-4 flex justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-primary dark:bg-indigo-400/10"><Icon className="w-6 h-6" /></span>
                </div>
                <h3 className="text-xl font-bold mb-1">{stat.label}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Featured Careers */}
      <section>
        <div className="mb-12">
          <span className="eyebrow mb-4">Explore pathways</span>
          <h2 className="section-heading">Popular careers</h2>
          <p className="section-subheading">Start your journey in one of these exciting fields</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CAREERS.slice(0, 6).map((career) => (
            <motion.div key={career.id} variants={itemVariants}>
              <CareerCard
                career={career}
                onClick={() => navigate(`/careers/${career.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/careers')}
            className="btn-primary flex items-center justify-center gap-2 mx-auto"
          >
            View All Careers <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Featured Technologies */}
      <section>
        <div className="mb-12">
          <span className="eyebrow mb-4">Build your toolkit</span>
          <h2 className="section-heading">Top technologies</h2>
          <p className="section-subheading">Master the skills that matter</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TECHNOLOGIES.slice(0, 8).map((tech) => (
            <motion.div key={tech.id} variants={itemVariants}>
              <TechCard tech={tech} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/technologies')}
            className="btn-primary flex items-center justify-center gap-2 mx-auto"
          >
            View All Technologies <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="rounded-[2rem] border border-slate-200 bg-slate-100/70 px-6 py-12 dark:border-dark-border dark:bg-dark-card/60 md:px-10">
        <div className="text-center mb-12">
          <h2 className="section-heading">Student Success Stories</h2>
          <p className="section-subheading">See how students are transforming their careers</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-dark-border dark:bg-dark-bg"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{testimonial.image}</span>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subheading">Get answers to your questions</p>
        </div>

        <motion.div
          className="space-y-4 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FAQS.map((faq) => (
            <motion.details
              key={faq.id}
              variants={itemVariants}
              className="card p-6 cursor-pointer group"
            >
              <summary className="flex items-center justify-between font-bold text-lg hover:text-primary transition-colors">
                {faq.question}
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </motion.details>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-primary to-secondary py-14 text-center text-white shadow-xl shadow-indigo-500/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold font-poppins">Ready to Transform Your Career?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Start your personalized learning journey today and reach your career goals faster.
          </p>
          <button
            onClick={() => navigate('/careers')}
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>
    </div>
  )
}
