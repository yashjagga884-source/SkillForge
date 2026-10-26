import { Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-dark-card border-t border-primary/15 dark:border-dark-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold font-poppins gradient-text mb-2">SkillForge</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Learn smarter. Build faster. Get hired.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary transition">Features</a></li>
              <li><Link to="/pricing" className="hover:text-primary transition">Subscribe</Link></li>
              <li><a href="#" className="hover:text-primary transition">Roadmap</a></li>
              <li><a href="#" className="hover:text-primary transition">Blog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary transition">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition">Community</a></li>
              <li><a href="#" className="hover:text-primary transition">Guides</a></li>
              <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex gap-4">
              <a
                href="mailto:hello@skillforge.ai"
                className="p-2 rounded-lg bg-gray-200 dark:bg-dark-border hover:bg-primary hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-200 dark:bg-dark-border hover:bg-primary hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-200 dark:bg-dark-border hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-200 dark:bg-dark-border hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-dark-border my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} SkillForge AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition">Terms of Service</a>
            <a href="#" className="hover:text-primary transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
