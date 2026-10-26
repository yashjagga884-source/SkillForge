import { useState } from 'react'
import { motion } from '../components/common/StaticMotion'
import { Mail, Phone, MapPin, Send } from '../components/common/Icons'
import toast from '../utils/toast'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Here you would typically send this to a backend
      console.log('Form submitted:', formData)

      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <h1 className="section-heading">Get in Touch</h1>
        <p className="section-subheading">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </motion.section>

      {/* Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {[
            {
              icon: Mail,
              label: 'Email',
              value: 'hello@skillforge.ai',
              href: 'mailto:hello@skillforge.ai'
            },
            {
              icon: Phone,
              label: 'Phone',
              value: '+1 (555) 123-4567',
              href: 'tel:+15551234567'
            },
            {
              icon: MapPin,
              label: 'Location',
              value: 'San Francisco, CA',
              href: '#'
            },
          ].map((info, i) => {
            const Icon = info.icon
            return (
              <motion.a
                key={i}
                href={info.href}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{info.label}</p>
                    <p className="font-semibold">{info.value}</p>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 card p-8 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="Your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="input-field w-full"
              placeholder="Message subject"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="input-field w-full resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : (
              <>
                Send Message
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.form>
      </div>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Frequently Asked Questions</h2>
        <motion.div
          className="space-y-4 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {[
            {
              q: 'How quickly will you respond to my message?',
              a: 'We aim to respond to all inquiries within 24 hours during business days.'
            },
            {
              q: 'Can I schedule a call with the team?',
              a: 'Absolutely! Reply to your email or mention in the form that you\'d like to schedule a call.'
            },
            {
              q: 'Do you offer partnerships?',
              a: 'Yes, we\'re always looking to partner with educational institutions and companies. Contact us to discuss.'
            },
            {
              q: 'Is SkillForge AI available internationally?',
              a: 'Yes! SkillForge AI is accessible worldwide. We support multiple time zones and currencies.'
            },
          ].map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 cursor-pointer group"
            >
              <summary className="flex items-center justify-between font-bold text-lg hover:text-primary transition-colors">
                {faq.q}
                <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">{faq.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </section>

      {/* Newsletter */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 font-poppins">Stay Updated</h2>
        <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
          Subscribe to our newsletter for the latest career tips, learning resources, and platform updates.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
          />
          <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-colors">
            Subscribe
          </button>
        </div>
      </motion.section>
    </div>
  )
}
