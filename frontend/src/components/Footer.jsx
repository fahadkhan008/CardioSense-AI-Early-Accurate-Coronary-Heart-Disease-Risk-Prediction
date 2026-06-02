import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  const techStack = [
    'React',
    'FastAPI',
    'XGBoost',
    'LightGBM',
    'CatBoost',
    'Framer Motion',
    'Recharts'
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1629]/80 border-t border-[#1E2A45]">
      {/* Animated heartbeat line */}
      <div className="h-1 bg-gradient-to-r from-[#06B6D4] via-[#E53E3E] to-[#10B981] animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Heart size={28} className="text-[#E53E3E]" fill="currentColor" />
              <span className="text-xl font-bold text-gradient">CardioSense AI</span>
            </div>
            <p className="text-[#94A3B8] text-sm">
              Early detection saves lives. AI-powered heart disease risk assessment.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              {['Home', 'How It Works', 'Predict', 'About'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-[#06B6D4] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">University</h4>
            <p className="text-[#94A3B8] text-sm">
              University of South Asia<br />
              Lahore, Pakistan
            </p>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-[#1E2A45] pt-8 mb-8"
        >
          <h4 className="font-semibold mb-4">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-[#0A0F1E] border border-[#1E2A45] rounded-lg text-sm text-[#06B6D4] font-medium hover:border-[#06B6D4] transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-[#1E2A45] pt-8 text-center"
        >
          <p className="text-[#94A3B8] text-sm">
            CardioSense AI © {currentYear} — University of South Asia, Lahore
          </p>
          <p className="text-[#94A3B8] text-xs mt-2">
            This is a research project for educational purposes. Always consult qualified healthcare providers.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
