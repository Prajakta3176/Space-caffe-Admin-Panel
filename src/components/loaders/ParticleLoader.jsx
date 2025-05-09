import React, { useEffect, useRef } from "react";

const ParticleLoader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resizeCanvas = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      };
    
      window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(angle, speed, radius) {
        this.angle = angle;
        this.speed = speed;
        this.radius = radius;
        this.color = `hsl(${angle * 50}, 100%, 70%)`;
      }

      update() {
        this.angle += this.speed;
        this.x = width / 2 + Math.cos(this.angle) * this.radius;
        this.y = height / 2 + Math.sin(this.angle) * this.radius;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle(i * 0.1, 0.02 + Math.random() * 0.015, 80));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
       
        width: "100%",
        height: "100vh",
      }}
    />
  );
};

export default ParticleLoader;
