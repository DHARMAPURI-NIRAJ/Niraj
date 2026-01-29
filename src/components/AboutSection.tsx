import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Briefcase, GraduationCap, MapPin } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const stats = [
  { label: "Years Experience", value: "+0" },
  { label: "Projects Completed", value: "5+" },
  { label: "Technologies", value: "10+" },
];

const highlights = [
  {
    icon: Briefcase,
    title: "Frontend Developer",
    subtitle: "Samskruti college of engineering",
  },
  {
    icon: GraduationCap,
    title: "Computer Science",
    subtitle: "Btech Degree",
  },
  {
    icon: MapPin,
    title: "Hyderabad",
    subtitle: "Telangana, India",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-secondary rounded-full text-sm font-medium text-muted-foreground mb-4">
            About Me
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Get to <span className="text-gradient">Know Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main photo */}
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden shadow-card"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
              <img
                  src={profilePhoto}
                  alt="DHARMAPURI NIRAJ - Frontend Developer"
                  className="w-full h-auto aspect-[4/5] object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-accent/30 rounded-2xl -z-10" />

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-card z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
                Passionate Developer & Creative Problem Solver
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Hi, I’m Dharmapuri Niraj, a Frontend Developer and 4th-year BTech CSE student. I build user-friendly web applications, including AI-powered apps and Learning Management Systems (LMS).
                 I specialize in React, Node.js, and modern cloud technologies, and I enjoy turning ideas into real-world products that users love.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently seeking opportunities to apply my skills in real-world projects and innovative teams.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-accent/10 rounded-lg shrink-0">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-secondary/50 rounded-xl"
                >
                  <motion.p
                    className="font-display text-2xl md:text-3xl font-bold text-accent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-4"
            >
              <motion.a
                href="/assets/Niraj_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium rounded-xl hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
