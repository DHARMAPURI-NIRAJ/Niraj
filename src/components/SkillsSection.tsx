import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Palette, Server, Smartphone, Zap } from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    items: ["Node.js", "Express", "Python", "Django", "MongoDB","Atlas"],
  },
  {
    category: "Design",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    items: ["Figma", "Adobe XD", "UI/UX", "Canva", "Design Systems"],
  },
  {
    category: "Database",
    icon: Database,
    color: "from-orange-500 to-red-500",
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase"],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    color: "from-indigo-500 to-violet-500",
    items: ["React Native", "Flutter", "iOS", "Android",],
  },
  {
    category: "DevOps",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    items: ["Docker", "AWS", "CI/CD", "Git", "Kubernetes"],
  },
];

const SkillCard = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"
           style={{ background: `linear-gradient(135deg, var(--accent) 0%, transparent 100%)` }} />
      
      <div className="bg-card border border-border rounded-2xl p-6 h-full shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${skill.color} mb-4`}>
          <skill.icon className="w-6 h-6 text-white" />
        </div>
        
        <h3 className="font-display text-xl font-semibold mb-4">{skill.category}</h3>
        
        <div className="flex flex-wrap gap-2">
          {skill.items.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 bg-secondary text-sm rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-secondary rounded-full text-sm font-medium text-muted-foreground mb-4">
            My Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I've worked and learning with a variety of technologies and tools to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.category} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
