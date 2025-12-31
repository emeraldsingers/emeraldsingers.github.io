import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SimpleSingerCard = ({ name, image, slug }: { name: string; image: string; slug: string }) => {
  return (
    <Link
      to={`/singer/${slug}`}
      className="block relative rounded-2xl overflow-hidden w-full h-full transform transition-transform hover:scale-105"
    >
      <div className="absolute inset-0 bg-black/5 dark:bg-black/20 hover:bg-black/10 transition-colors rounded-2xl" />
      <img
        src={image}
        alt={name}
        className="w-full h-full object-contain p-2"
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/20 dark:from-black/80 to-transparent">
        <h3 className="text-white dark:text-white text-lg font-medium text-center">{name}</h3>
      </div>
    </Link>
  );
};

const singers = [
  { name: "Akizora", image: "/images/akizora_thumb.webp", slug: "akizora" },
  { name: "Asoqwer", image: "/images/asoqwer_thumb.webp", slug: "asoqwer" },
  { name: "Emerald", image: "/images/Emerald2025NoLogo_thumb.webp", slug: "emerald" },
  { name: "Fukuna Douri", image: "/images/douri-thumb.webp", slug: "douri" },
  { name: "Fukuna Kira", image: "/images/kira-thumb.webp", slug: "kira" },
  { name: "Mitsuo", image: "/images/mitsuo_thumb.webp", slug: "mitsuo" },
  { name: "Simon Weber", image: "/images/simon-weber-eu_thumb.webp", slug: "simon-weber" },
  { name: "Toisku", image: "/images/toisku_thumb.webp", slug: "toisku" },

];

const itemWidthPx = 224 + 24; 

const InfiniteScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const cloneItems = () => {
      const items = scrollElement.querySelectorAll(".scroll-item");
      
      for (let i = 0; i < 6; i++) {
        items.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          scrollElement.appendChild(clone);
        });
      }
    };

    cloneItems();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-6">Featured Singers</h2>
      <div
        ref={scrollRef}
        className="flex animate-infinite-scroll"
      >
        {singers.map((singer) => (
          <div
            key={singer.slug}
            className="scroll-item flex-none mx-3 w-56 h-56 md:w-64 md:h-64 mb-16" 
          >
            <SimpleSingerCard {...singer} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-${itemWidthPx}px * ${singers.length}));
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScroll;
