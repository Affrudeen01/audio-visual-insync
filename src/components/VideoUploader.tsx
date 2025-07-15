import { useState } from 'react';
import { Upload, Video } from 'lucide-react';
import { Button } from './ui/button';
import { VideoUploaderModal } from './VideoUploaderModal';
import { useTranslation } from 'react-i18next';

interface VideoUploaderProps {
  onVideoSelect: (file: File, url: string) => void;
  className?: string;
}

export const VideoUploader = ({ onVideoSelect, className = "" }: VideoUploaderProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Upload className="w-5 h-5 mr-2" />
          {t('video.uploadVideo')}
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Upload your video to begin processing
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supports MP4, WebM, AVI, MKV (max 500MB)
          </p>
        </div>
      </div>

      <VideoUploaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVideoSelect={onVideoSelect}
      />
    </>
  );
};