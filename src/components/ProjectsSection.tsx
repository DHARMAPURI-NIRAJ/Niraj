import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, secure payments, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates, drag-and-drop, and team features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "AI Content Generator",
    description: "AI-powered platform for generating marketing copy, blog posts, and social media content.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Finance Dashboard",
    description: "Interactive financial dashboard with data visualization, analytics, and reporting features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    tags: ["React", "D3.js", "Supabase", "Tailwind"],
    github: "https://github.com",
    live: "https://example.com",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-2">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Overlay links */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-accent text-accent-foreground rounded-full hover:shadow-glow transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-xl font-semibold group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-all transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-secondary text-xs font-medium rounded-md text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-secondary rounded-full text-sm font-medium text-muted-foreground mb-4">
            Featured Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Recent <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for building great products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
