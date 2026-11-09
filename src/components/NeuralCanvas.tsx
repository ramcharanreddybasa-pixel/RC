import React, { useEffect, useRef } from 'react';

interface NeuralCanvasProps {
  theme: 'dark' | 'light';
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

export const NeuralCanvas: React.FC<NeuralCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Node population
    const count = Math.min(48, Math.floor((width * height) / 18000));
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2 + 1.5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
      });
    }

    const mouse = { x: -1000, y: -1000, maxDist: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const isLight = theme === 'light';
    const nodeColor = isLight ? 'rgba(37, 99, 235, 0.45)' : 'rgba(56, 189, 248, 0.5)';
    const lineColorBase = isLight ? 'rgba(37, 99, 235, ' : 'rgba(56, 189, 248, ';
    const maxLinkDist = 110;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Mouse proximity interaction
        const dxMouse = n1.x - mouse.x;
        const dyMouse = n1.y - mouse.y;
        const mouseDist = Math.hypot(dxMouse, dyMouse);

        if (mouseDist < mouse.maxDist) {
          const force = (1 - mouseDist / mouse.maxDist) * 0.04;
          n1.vx -= dxMouse * force;
          n1.vy -= dyMouse * force;
          n1.radius = n1.baseRadius + (1 - mouseDist / mouse.maxDist) * 2.5;

          // Mouse link line
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `${lineColorBase}${(1 - mouseDist / mouse.maxDist) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          n1.radius = n1.baseRadius;
        }

        // Inter-node links
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < maxLinkDist) {
            const alpha = (1 - dist / maxLinkDist) * (isLight ? 0.18 : 0.22);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `${lineColorBase}${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
};
