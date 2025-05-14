import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface SingerCardProps {
  name: string;
  image: string;
  slug: string;
  tags?: string;
}

const SingerCard = ({ name, image, slug, tags }: SingerCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Link
        to={`/singer/${slug}`}
        className="group block relative w-full rounded-xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 backdrop-blur-sm transition-colors rounded-xl border border-white/20" />
        <div className="relative w-full pt-[100%]"> {/* 1:1 aspect ratio */}
          <img
            src={image}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-contain p-2 rounded-xl"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white text-xl font-bold text-center">{name}</h3>
          {tags && (
            <p className="text-white/70 text-xs text-center mt-1 line-clamp-1">{tags}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default SingerCard;