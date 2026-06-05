import { motion } from 'framer-motion';

export default function TeamSection() {
  const team = [
    {
      name: 'Hammad Ahmed',
      id: 'B-28400',
      roles: ['Data Pre-Processing', 'EDA', 'Model Training', 'Fine-Tunning','Documentation'],
      color: '#3B82F6'
    },
    {
      name: 'Fahad Khan',
      id: 'B-28417',
      roles: ['Research', 'Feature Engineering', 'Class Imbalance Handling', 'Model Evaluation', 'Deployment',],
      color: '#10B981'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1629]/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About This Project</h2>
          <div className="glass-morphism p-6 rounded-xl border border-[#1E2A45] max-w-2xl mx-auto mb-8">
            <p className="text-[#94A3B8] mb-3">
              <span className="font-semibold text-[#F1F5F9]">University:</span> University of South Asia, Lahore
            </p>
            <p className="text-[#94A3B8] mb-3">
              <span className="font-semibold text-[#F1F5F9]">Department:</span> Computer Science
            </p>
            <p className="text-[#94A3B8]">
              <span className="font-semibold text-[#F1F5F9]">Project:</span> Final Semester AI Project - Early Coronary Heart Disease Detection Using Ensemble Machine Learning
            </p>
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: `0 0 30px ${member.color}30` }}
              className="glass-morphism p-8 rounded-xl border border-[#1E2A45] text-center"
            >
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${member.color}20, ${member.color}05)`,
                  border: `3px solid ${member.color}`,
                  boxShadow: `0 0 30px ${member.color}40`
                }}
              >
                <div className="text-3xl font-bold" style={{ color: member.color }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </motion.div>

              {/* Name */}
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>

              {/* ID */}
              <p className="text-[#94A3B8] text-sm mb-4">{member.id}</p>

              {/* Roles */}
              <div className="flex flex-wrap gap-2 justify-center">
                {member.roles.map((role, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${member.color}20`,
                      color: member.color
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
