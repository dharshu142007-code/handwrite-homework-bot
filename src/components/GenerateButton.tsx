import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

const GenerateButton = ({ onClick, disabled, loading }: GenerateButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      size="lg"
      className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow text-primary-foreground font-semibold px-8 py-6 text-lg"
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="w-5 h-5 mr-2" />
          Generate Handwritten Version
        </>
      )}
    </Button>
  );
};

export default GenerateButton;
