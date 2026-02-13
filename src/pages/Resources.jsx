import { useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Headphones, Monitor, Cable, Lightbulb, Wifi } from "lucide-react";
import "./resources.css";

export default function Resources() {
  /* ================= PARTICLE NETWORK ================= */
  useEffect(() => {
    const canvas = document.querySelector(".particle-network-resources");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 50;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;

          if (distance < 8000) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(14,165,233,0.5)";
      ctx.strokeStyle = "rgba(14,165,233,0.25)";

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  const resources = [
    { id: 1, name: "Projectors", count: 8, icon: Monitor },
    { id: 2, name: "Microphones", count: 12, icon: Headphones },
    { id: 3, name: "Audio System", count: 4, icon: Cable },
    { id: 4, name: "Lighting Kits", count: 6, icon: Lightbulb },
    { id: 5, name: "WiFi Routers", count: 10, icon: Wifi },
    { id: 6, name: "Cables & Adapters", count: "20+", icon: Package },
  ];

  return (
    <motion.div className="resources-page" initial="hidden" animate="visible" variants={containerVariants}>
      <canvas className="particle-network-resources"></canvas>

      <motion.div className="resources-header" variants={itemVariants} custom={0}>
        <motion.div className="header-icon" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Package size={48} />
        </motion.div>
        <h1>Available Resources</h1>
        <p>Equipment and assets ready for your event</p>
      </motion.div>

      <motion.div className="resources-grid" variants={containerVariants}>
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <motion.div
              key={resource.id}
              className="resource-card"
              variants={itemVariants}
              custom={index + 1}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="resource-icon">
                <Icon size={32} />
              </div>
              <h3>{resource.name}</h3>
              <div className="resource-count">{resource.count}</div>
              <motion.button
                className="resource-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div className="resource-info" variants={itemVariants} custom={7}>
        <h3>Resource Management</h3>
        <p>All equipment is regularly maintained and tested. Request resources in advance for guaranteed availability.</p>
      </motion.div>
    </motion.div>
  );
}
