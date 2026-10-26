import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, BookOpen, Compass, Code2 } from 'lucide-react'
import { CAREERS, TECHNOLOGIES, TESTIMONIALS, FAQS } from '../constants/data'
import { QUIZZES } from '../constants/quizzes'
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
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <span className="absolute left-[12%] top-8 h-64 w-64 rounded-full bg-sky-300/20 blur-[90px] dark:bg-blue-500/15" />
          <span className="absolute right-[12%] top-28 h-72 w-72 rounded-full bg-indigo-200/25 blur-[100px] dark:bg-cyan-500/10" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-12 -z-10 flex flex-col items-center select-none overflow-hidden">
          <span className="absolute -top-8 translate-x-3 text-[clamp(5rem,15vw,12rem)] font-bold leading-none tracking-[-0.08em] text-primary/[0.035] blur-[2px]">SkillForge</span>
          <span className="absolute top-0 -translate-x-2 text-[clamp(5rem,15vw,12rem)] font-bold leading-none tracking-[-0.08em] text-secondary/[0.04] blur-[5px]">SkillForge</span>
          <span className="absolute top-8 translate-x-1 text-[clamp(5rem,15vw,12rem)] font-bold leading-none tracking-[-0.08em] text-primary/[0.025] blur-[9px]">SkillForge</span>
        </div>
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold font-poppins mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="gradient-text">Find your next step.</span>
            <br />
            <span className="gradient-text">Build useful skills.</span>
            <br />
            <span className="gradient-text">Keep moving.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Career ideas, learning resources, and quick quizzes in one place. Start with what you’re curious about; take it one step at a time.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
        </motion.div>

        {/* Hero Animation */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: Zap, label: `${CAREERS.length} Career paths`, desc: 'Ideas to help you choose a direction' },
            { icon: Code2, label: `${TECHNOLOGIES.length} Technologies`, desc: 'Topics to explore at your own pace' },
            { icon: BookOpen, label: `${QUIZZES.length} Quick quizzes`, desc: 'A simple way to check what you know' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card p-8 text-center hover:shadow-2xl transition-shadow"
              >
                <div className="text-5xl mb-4 flex justify-center">
                  <Icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{stat.label}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Quick links for returning learners */}
      <section aria-labelledby="learning-dashboard-heading" className="-mt-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="learning-dashboard-heading" className="text-2xl font-semibold">Your learning dashboard</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-300">Pick up with a career, a skill, or a quick quiz.</p>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">No perfect starting point needed.</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Compass, title: 'I’m figuring out what to do', detail: 'Look through career paths, skills, and the kind of work each involves.', action: 'Explore careers', to: '/careers' },
            { icon: Code2, title: 'I know what I want to learn', detail: 'Browse technologies and find a topic that feels like a good next step.', action: 'Browse technologies', to: '/technologies' },
            { icon: BookOpen, title: 'I want to test myself', detail: 'Try a short quiz and see what you already know.', action: 'Find a quiz', to: '/quizzes' },
          ].map(({ icon: Icon, title, detail, action, to }) => (
            <button key={title} onClick={() => navigate(to)} className="card group flex w-full items-start gap-4 p-5 text-left hover:border-primary/50">
              <span className="rounded-lg bg-primary/10 p-3 text-primary"><Icon size={21} aria-hidden="true" /></span>
              <span className="min-w-0">
                <span className="block font-semibold">{title}</span>
                <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">{detail}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">{action}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Careers */}
      <section>
        <div className="mb-12">
          <h2 className="section-heading">Popular Careers</h2>
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
          <h2 className="section-heading">Top Technologies</h2>
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
      <section className="py-12 rounded-2xl border border-primary/10 bg-white/70 px-8 dark:bg-dark-card/60">
        <div className="text-center mb-12">
          <h2 className="section-heading">A few learner stories</h2>
          <p className="section-subheading">People from the SkillForge community, and where they are now.</p>
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
              className="bg-white dark:bg-dark-bg p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{testimonial.image}</span>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Now: {testimonial.role}</p>
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
      <section className="py-12 bg-white rounded-2xl border border-primary/20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold font-poppins text-secondary">Ready to Transform Your Career?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your personalized learning journey today and reach your career goals faster.
          </p>
          <button
            onClick={() => navigate('/careers')}
            className="btn-primary px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>
    </div>
  )
}
