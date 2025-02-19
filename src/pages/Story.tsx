import React, { useState, useEffect, useRef, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import LoadingSpinner from "@/components/LoadingSpinner";

const Story = () => {
    const { theme } = useTheme();
    const [chaptersData, setChaptersData] = useState([]);
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    


    const loadStory = useCallback(async (lang) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/story_${lang}.txt`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            const parsedChapters = parseStoryText(text);
            setChaptersData(parsedChapters);

            if (selectedChapterIndex >= parsedChapters.length) {
                setSelectedChapterIndex(0); 
            }


        } catch (error) {
            console.error(`Failed to load story in ${lang}:`, error);
            setChaptersData([{ title: `Error loading story (${lang})`, content: `Failed to load story in ${lang} from story_${lang}.txt. Please check console for details.`}]);
        } finally {
            setIsLoading(false);
        }
    }, [selectedChapterIndex]);


    useEffect(() => {
        loadStory(selectedLanguage);
    }, [selectedLanguage, loadStory]);


    const parseStoryText = (text) => {
        const chapterSeparator = '---';
        const chapterLines = text.split(chapterSeparator).map(chapterText => chapterText.trim()).filter(chapterText => chapterText);
        return chapterLines.map(chapterText => {
            const lines = chapterText.split('\n').map(line => line.trim()).filter(line => line);
            const titleLine = lines.find(line => line.startsWith('# Chapter'));
            const title = titleLine ? titleLine.substring(titleLine.indexOf(':') + 1).trim() : "No Title";
            let content = lines.filter(line => !line.startsWith('# Chapter')).join('\n').trim();
            content = content.replace(/\*\*\{(.*?)\}\*\*/g, '<strong>$1</strong>');
            content = content.replace(/\{\\n\}/g, '<br>');

            return { title, content };
        });
    };


    const handleChapterChange = (index: number) => {
        setSelectedChapterIndex(index);
    };

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);

    };


    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div
            className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50"
            
            ref={containerRef}
        >
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-8 flex pt-24">
                <div className="flex justify-end space-x-2 absolute top-24 right-20">
                    <button
                        onClick={() => handleLanguageChange('ru')}
                        className={`p-2 rounded-md hover:bg-primary/10 transition-colors ${selectedLanguage === 'ru' ? 'bg-primary/20 font-semibold' : 'text-primary/80'}`}
                    >
                        RU
                    </button>
                    <button
                        onClick={() => handleLanguageChange('en')}
                        className={`p-2 rounded-md hover:bg-primary/10 transition-colors ${selectedLanguage === 'en' ? 'bg-primary/20 font-semibold' : 'text-primary/80'}`}
                    >
                        EN
                    </button>
                </div>
                {/* Chapter Navigation Panel */}
                <aside className="w-1/4 p-4 neo-blur rounded-xl mr-8 h-fit sticky top-24">
                    <h2 className="text-xl font-bold text-primary mb-4 text-center">Chapters</h2>
                    <nav className="space-y-2">
                        {chaptersData.map((chapter, index) => (
                            <button
                                key={index}
                                className={`w-full p-2 rounded-md text-left hover:bg-primary/10 transition-colors ${selectedChapterIndex === index ? 'bg-primary/20 font-semibold' : 'text-primary/80'}`}
                                onClick={() => handleChapterChange(index)}
                            >
                                {chapter.title}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Chapter Content Area */}
                <article className="w-3/4 p-8 neo-blur rounded-xl">
                    <h1 className="text-3xl font-bold text-primary mb-6">{chaptersData[selectedChapterIndex].title}</h1>
                    <div className="text-primary whitespace-pre-line" dangerouslySetInnerHTML={{ __html: chaptersData[selectedChapterIndex].content }}>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default Story;