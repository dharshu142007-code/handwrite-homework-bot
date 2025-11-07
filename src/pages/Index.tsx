import { useState } from 'react';
import HomeworkUpload from '@/components/HomeworkUpload';
import GenerateButton from '@/components/GenerateButton';
import { Helmet } from 'react-helmet';
import { PenTool } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [handwritingSample, setHandwritingSample] = useState<File | null>(null);
  const [homeworkFile, setHomeworkFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!handwritingSample || !homeworkFile) {
      toast({
        title: "Missing files",
        description: "Please upload both your handwriting sample and homework PDF",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // TODO: Implement AI handwriting generation
    // This will need Lovable Cloud for backend processing
    toast({
      title: "Coming soon!",
      description: "AI handwriting generation will be enabled after connecting Lovable Cloud",
    });
    
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>AI Homework Writer - Convert to Your Handwriting</title>
        <meta 
          name="description" 
          content="Transform digital homework into your personal handwriting style using AI. Upload your handwriting sample and homework PDF to get started." 
        />
      </Helmet>
      
      <main className="min-h-screen bg-gradient-paper">
        {/* Header */}
        <header className="py-8 px-4">
          <div className="container mx-auto flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <PenTool className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Homework Writer
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Transform Digital Text into Your Handwriting
            </h2>
            <p className="text-muted-foreground text-lg">
              Upload a sample of your handwriting and your homework PDF. 
              Our AI will generate a handwritten version matching your unique style.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <HomeworkUpload
              onHandwritingSampleUpload={setHandwritingSample}
              onHomeworkUpload={setHomeworkFile}
            />

            <GenerateButton
              onClick={handleGenerate}
              disabled={!handwritingSample || !homeworkFile}
              loading={loading}
            />

            {/* Info Section */}
            <div className="max-w-2xl text-center mt-8 p-6 bg-card rounded-xl border border-border/50 shadow-card">
              <h3 className="font-semibold text-foreground mb-2">How it works</h3>
              <ol className="text-sm text-muted-foreground space-y-2 text-left list-decimal list-inside">
                <li>Upload a clear image of your handwriting (write a few sentences)</li>
                <li>Upload the homework PDF from your WhatsApp group</li>
                <li>Click generate and let AI create a handwritten version</li>
                <li>Download and print your personalized homework!</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
