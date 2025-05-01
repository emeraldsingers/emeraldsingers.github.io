import React, { useRef, useEffect } from 'react';

interface Circle {
    id: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    opacity: number;
    scale: number;
    startTime: number;
    duration: number; 
    driftX: number; 
    driftY: number; 
}

const BackgroundCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const circlesRef = useRef<Circle[]>([]); 
    const animationFrameId = useRef<number>(0);
    const lastTimestamp = useRef<number>(0);
    const circleIdCounter = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const colors = [
            'rgba(60, 179, 113, 0.07)',
            'rgba(46, 139, 87, 0.08)',
            'rgba(0, 128, 0, 0.06)',
            'rgba(34, 139, 34, 0.09)',
            'rgba(0, 100, 0, 0.07)',
        ];

        const addCircle = () => {
            if (canvas.width === 0 || canvas.height === 0) return; 
            
            const id = circleIdCounter.current++;
            const radius = Math.random() * 75 + 25;
            const newCircle: Circle = {
                id,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 0,
                scale: 0,
                startTime: performance.now(),
                duration: Math.random() * 15000 + 10000,
                driftX: (Math.random() - 0.5) * 100,
                driftY: (Math.random() - 0.5) * 100,
            };
            circlesRef.current.push(newCircle);
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

        };

        const draw = (timestamp: number) => {
            if (!lastTimestamp.current) {
                lastTimestamp.current = timestamp;
            }
            const now = performance.now();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = 'blur(16px)';

            circlesRef.current = circlesRef.current.filter(circle => {
                const elapsed = now - circle.startTime;
                const progress = Math.min(elapsed / circle.duration, 1);
                const fadeInOutProgress = Math.sin(progress * Math.PI);
                circle.opacity = fadeInOutProgress * 0.8;
                circle.scale = fadeInOutProgress;
                const currentDriftX = circle.driftX * progress;
                const currentDriftY = circle.driftY * progress;

                ctx.beginPath();
                ctx.arc(circle.x + currentDriftX, circle.y + currentDriftY, circle.radius * circle.scale, 0, Math.PI * 2);
                ctx.fillStyle = circle.color;
                ctx.globalAlpha = circle.opacity;
                ctx.fill();

                return progress < 1;
            });
            ctx.globalAlpha = 1;
            ctx.filter = 'none';

            animationFrameId.current = requestAnimationFrame(draw);
        };
        
        resizeCanvas(); 

        circlesRef.current = []; 
        for (let i = 0; i < 100; i++) { 
            addCircle();
        }

        lastTimestamp.current = 0; 
        cancelAnimationFrame(animationFrameId.current); 
        animationFrameId.current = requestAnimationFrame(draw);

        const intervalId = setInterval(addCircle, 2500);

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId.current);
            clearInterval(intervalId);
            circlesRef.current = [];
        };
    }, []); 

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0 pointer-events-none bg-black"
        />
    );
};

export default BackgroundCanvas; 