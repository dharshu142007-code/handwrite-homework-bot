import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HomeworkUploadProps {
  onHandwritingSampleUpload: (file: File) => void;
  onHomeworkUpload: (file: File) => void;
}

const HomeworkUpload = ({ onHandwritingSampleUpload, onHomeworkUpload }: HomeworkUploadProps) => {
  const { toast } = useToast();
  const [handwritingSample, setHandwritingSample] = useState<File | null>(null);
  const [homeworkFile, setHomeworkFile] = useState<File | null>(null);

  const handleHandwritingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image of your handwriting",
          variant: "destructive",
        });
        return;
      }
      setHandwritingSample(file);
      onHandwritingSampleUpload(file);
      toast({
        title: "Handwriting sample uploaded",
        description: "Your handwriting style has been captured!",
      });
    }
  };

  const handleHomeworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
      setHomeworkFile(file);
      onHomeworkUpload(file);
      toast({
        title: "Homework uploaded",
        description: "Ready to convert to handwriting!",
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
      <Card className="p-8 shadow-card hover:shadow-glow transition-all duration-300 border-border/50">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Upload Handwriting Sample</h3>
          <p className="text-muted-foreground text-sm">
            Upload a clear image of your handwriting so we can replicate your style
          </p>
          <label className="cursor-pointer w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleHandwritingUpload}
              className="hidden"
            />
            <Button variant="outline" className="w-full" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                {handwritingSample ? handwritingSample.name : 'Choose Image'}
              </span>
            </Button>
          </label>
          {handwritingSample && (
            <div className="w-full p-3 bg-secondary rounded-lg text-secondary-foreground text-sm">
              ✓ Sample uploaded
            </div>
          )}
        </div>
      </Card>

      <Card className="p-8 shadow-card hover:shadow-glow transition-all duration-300 border-border/50">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Upload Homework PDF</h3>
          <p className="text-muted-foreground text-sm">
            Upload the PDF from your WhatsApp group or any other source
          </p>
          <label className="cursor-pointer w-full">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleHomeworkUpload}
              className="hidden"
            />
            <Button variant="outline" className="w-full" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                {homeworkFile ? homeworkFile.name : 'Choose PDF'}
              </span>
            </Button>
          </label>
          {homeworkFile && (
            <div className="w-full p-3 bg-secondary rounded-lg text-secondary-foreground text-sm">
              ✓ PDF uploaded
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HomeworkUpload;
