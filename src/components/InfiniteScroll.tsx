import { useRef, useEffect } from "react";
import SingerCard from "./SingerCard";

const singers = [
  { name: "Akizora", image: "/images/akizora.png", slug: "akizora" },
  { name: "Asoqwer", image: "/images/asoqwer.png", slug: "asoqwer" },
  { name: "Simon Weber", image: "/images/simon-weber-eu.png", slug: "simon-weber" },
  { name: "Mitsuo", image: "/images/mitsuo.png", slug: "mitsuo" },
];

const InfiniteScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const cloneItems = () => {
      const items = scrollElement.querySelectorAll(".scroll-item");
      items.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        scrollElement.appendChild(clone);
      });
    };

    cloneItems();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex animate-infinite-scroll"
      >
        {singers.map((singer) => (
          <div
            key={singer.slug}
            className="scroll-item flex-none mx-4 w-64 h-64"
          >
            <SingerCard {...singer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
