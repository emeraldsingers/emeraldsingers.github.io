import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto glass-morphism rounded-xl p-8">
          <h1 className="text-4xl font-bold text-primary mb-8">Terms of Use</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Usage Guidelines</h2>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
              <li>The voicebanks are free for personal and non-commercial use</li>
              <li>Credit must be given to the original creator in all works</li>
              <li>Redistribution of the voicebanks is not permitted</li>
              <li>Commercial use requires separate licensing agreement</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-primary mb-4">Prohibited Uses</h2>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
              <li>Using the voicebanks for hate speech or harmful content</li>
              <li>Usage for training artificial intelligence models</li>
              <li>Claiming ownership of the voicebanks</li> 
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Note</h2>
            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
              <li>By using the voicebanks, you agree to these terms and conditions.</li>
              <li>All character have flexible design. You can do whatever you want if it is not against these terms</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;