import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/DHARMAPURI-NIRAJ", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/dharmapuri-niraj", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/dharmapuri_niraj", label: "instagram" },
];

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-display text-2xl font-semibold tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-accent">N</span>iraj<span className="text-accent">.</span>
          </motion.a>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by Dharmapuri Niraj
          </p>
        </div>
      </div>
    </footer>
  );
};
