import { Link } from "react-router-dom";

interface SingerCardProps {
  name: string;
  image: string;
  slug: string;
}

const SingerCard = ({ name, image, slug }: SingerCardProps) => {
  return (
    
    <Link
      to={`/singer/${slug}`}
      className="group relative w-72 h-96 rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 backdrop-blur-sm transition-colors rounded-xl border border-white/20" />
      <div className="relative w-full h-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-white text-xl font-bold">{name}</h3>
      </div>
    </Link>
  );
};

export default SingerCard;