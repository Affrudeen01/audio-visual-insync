import { useState, useRef } from 'react';
import { Upload, X, FileVideo, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface VideoUploaderProps {
  onVideoSelect: (file: File, url: string) => void;
  className?: string;
}

export const VideoUploader = ({ onVideoSelect, className = "" }: VideoUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov', 'video/mkv'];

  const handleFileSelect = (file: File) => {
    if (!validVideoTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid video file (MP4, WebM, OGG, AVI, MOV, MKV).",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 500 * 1024 * 1024) { // 500MB limit
      toast({
        title: "File too large",
        description: "Please upload a video file smaller than 500MB.",
        variant: "destructive"
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setSelectedVideo(file);
    setVideoUrl(url);
    onVideoSelect(file, url);

    toast({
      title: "Video uploaded successfully",
      description: `Loaded: ${file.name}`,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => validVideoTypes.includes(file.type));
    
    if (videoFile) {
      handleFileSelect(videoFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const clearVideo = () => {
    setSelectedVideo(null);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      {!selectedVideo ? (
        <Card
          className={`border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-primary/50 ${
            isDragOver ? 'border-primary bg-primary/5' : 'border-border/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <Upload className={`w-12 h-12 mb-4 transition-colors ${
              isDragOver ? 'text-primary' : 'text-muted-foreground'
            }`} />
            <h3 className="text-lg font-semibold mb-2">
              {isDragOver ? 'Drop video here' : 'Upload Video'}
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your video file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports MP4, WebM, OGG, AVI, MOV, MKV (Max 500MB)
            </p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              {t('common.upload')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <FileVideo className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm truncate max-w-[200px]">
                    {selectedVideo.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedVideo.size)}
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearVideo}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
};