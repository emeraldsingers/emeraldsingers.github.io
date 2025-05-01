import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SimpleSingerCard = ({ name, image, slug }: { name: string; image: string; slug: string }) => {
  return (
    <Link
      to={`/singer/${slug}`}
      className="block relative rounded-2xl overflow-hidden w-full h-full transform transition-transform hover:scale-105"
    >
      <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors rounded-2xl" />
      <img
        src={image}
        alt={name}
        className="w-full h-full object-contain p-2"
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white text-lg font-medium text-center">{name}</h3>
      </div>
    </Link>
  );
};

const singers = [
  { name: "Akizora", image: "/images/akizora.png", slug: "akizora" },
  { name: "Asoqwer", image: "/images/asoqwer.png", slug: "asoqwer" },
  { name: "Simon Weber", image: "/images/simon-weber-eu.png", slug: "simon-weber" },
  { name: "Mitsuo", image: "/images/mitsuo.png", slug: "mitsuo" },
];

const itemWidthPx = 224 + 24; 

const InfiniteScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const cloneItems = () => {
      const items = scrollElement.querySelectorAll(".scroll-item");
      
      for (let i = 0; i < 5; i++) {
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
      <h2 className="text-3xl font-bold text-white text-center mb-6">Featured Singers</h2>
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
          animation: infinite-scroll 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScroll;
