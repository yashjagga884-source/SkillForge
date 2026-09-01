import { motion } from '../components/common/StaticMotion'
import { CheckCircle, Users, Target, Zap } from '../components/common/Icons'

export function About() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <h1 className="section-heading">About SkillForge AI</h1>
        <p className="section-subheading">Empowering the next generation of tech professionals</p>
      </motion.section>

      {/* Mission */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="card p-8 md:p-12"
      >
        <h2 className="text-3xl font-bold mb-4 font-poppins">Our Mission</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          SkillForge AI is built on a simple belief: every student deserves access to personalized career guidance and quality learning resources. We combine artificial intelligence with real-world career data to create tailored learning paths that lead to job-ready skills and meaningful careers.
        </p>
      </motion.section>

      {/* Values */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center font-poppins">Our Values</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: Target,
              title: 'Personalization',
              desc: 'Every student has unique goals. We create tailored paths for individual success.'
            },
            {
              icon: Zap,
              title: 'Practical Learning',
              desc: 'Learn skills that actually matter. Build real projects, not just theoretical knowledge.'
            },
            {
              icon: Users,
              title: 'Community',
              desc: 'Join a supportive network of learners, sharing knowledge and growing together.'
            },
            {
              icon: CheckCircle,
              title: 'Accessibility',
              desc: 'Quality education should be available to everyone, regardless of background.'
            },
          ].map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-xl transition-shadow"
              >
                <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Careers Available', value: '8+' },
            { label: 'Technologies', value: '12+' },
            { label: 'Learning Paths', value: '50+' },
            { label: 'Students Helped', value: '1000+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center font-poppins">Meet the Team</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {[
            {
              name: 'Alex Kumar',
              role: 'Founder & CEO',
              bio: 'Full-stack developer with 10+ years of experience building scalable products.',
              emoji: '👨‍💼'
            },
            {
              name: 'Priya Sharma',
              role: 'Head of Content',
              bio: 'Career strategist and educational researcher focused on student success.',
              emoji: '👩‍🏫'
            },
            {
              name: 'Rahul Singh',
              role: 'AI Lead',
              bio: 'ML engineer specializing in personalization and recommendation systems.',
              emoji: '👨‍💻'
            },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card p-8 text-center hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-12"
      >
        <h2 className="text-3xl font-bold mb-4 font-poppins">Join Our Community</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Be part of a movement transforming how students discover careers and build their futures.
        </p>
        <button className="btn-primary text-lg">Get Started Today</button>
      </motion.section>
    </div>
  )
}
