import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SingerCardProps {
  name: string;
  image: string;
  slug: string;
  tags?: string;
}

const SingerCard = ({ name, image, slug, tags }: SingerCardProps) => {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 220, damping: 20 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 220, damping: 20 });
  const maxTilt = 8;

  return (
    <motion.div
      whileHover={{ 
        scale: 1.04,
        y: -4,
        boxShadow: "0 18px 40px rgba(0,0,0,0.18)"
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const percentX = (offsetX - rect.width / 2) / (rect.width / 2);
        const percentY = (offsetY - rect.height / 2) / (rect.height / 2);

        tiltX.set(-percentY * maxTilt);
        tiltY.set(percentX * maxTilt);
      }}
      onMouseLeave={() => {
        tiltX.set(0);
        tiltY.set(0);
      }}
      style={{
        rotateX: tiltXSpring,
        rotateY: tiltYSpring,
        transformPerspective: 900,
      }}
      className="w-full will-change-transform"
    >
      <Link
        to={`/singer/${slug}`}
        className="group block relative w-full rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/25 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-transparent to-emerald-500/25 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative w-full pt-[100%]">
          <img
            src={image}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
          />
        </div>
        <div className="absolute inset-x-3 bottom-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 px-3 py-2 transition-colors duration-300 group-hover:border-emerald-400/30">
          <h3 className="font-display text-white text-lg font-semibold text-center tracking-wide drop-shadow">{name}</h3>
          {tags && (
            <p className="text-white/70 text-[11px] text-center mt-0.5 line-clamp-1">{tags}</p>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
        </div>
      </Link>
    </motion.div>
  );
};

export default SingerCard;
