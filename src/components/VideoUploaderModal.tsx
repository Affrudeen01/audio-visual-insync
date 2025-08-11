import { useState } from 'react';
import { Upload, File, Video, Music, Languages, Mic, Settings, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface VideoProcessingOptions {
  extractAudio: boolean;
  generateSubtitles: boolean;
  subtitleLanguages: string[];
  subtitleFormats: string[];
  generateAudioFromTranscript: boolean;
}

interface VideoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoSelect: (file: File, url: string) => void;
}

const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const subtitleFormats = [
  { id: 'vtt', name: 'WebVTT', extension: '.vtt' },
  { id: 'srt', name: 'SubRip', extension: '.srt' },
  { id: 'ass', name: 'Advanced SSA', extension: '.ass' },
  { id: 'txt', name: 'Plain Text', extension: '.txt' },
];

export const VideoUploaderModal = ({ isOpen, onClose, onVideoSelect }: VideoUploaderModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState<VideoProcessingOptions>({
    extractAudio: false,
    generateSubtitles: true,
    subtitleLanguages: ['en'],
    subtitleFormats: ['vtt', 'srt'],
    generateAudioFromTranscript: false,
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mkv'];
      if (!validTypes.some(type => file.type.includes(type.split('/')[1]))) {
        toast({
          title: "Invalid file type",
          description: "Please upload a valid video file (MP4, WebM, AVI, MKV).",
          variant: "destructive"
        });
        return;
      }

      // Check file size (limit to 500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a video file smaller than 500MB.",
          variant: "destructive"
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleLanguageToggle = (langCode: string) => {
    setOptions(prev => ({
      ...prev,
      subtitleLanguages: prev.subtitleLanguages.includes(langCode)
        ? prev.subtitleLanguages.filter(code => code !== langCode)
        : [...prev.subtitleLanguages, langCode]
    }));
  };

  const handleFormatToggle = (formatId: string) => {
    setOptions(prev => ({
      ...prev,
      subtitleFormats: prev.subtitleFormats.includes(formatId)
        ? prev.subtitleFormats.filter(id => id !== formatId)
        : [...prev.subtitleFormats, formatId]
    }));
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setProcessing(true);
    
    try {
      // Create video URL for immediate playback
      const videoUrl = URL.createObjectURL(selectedFile);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the parent callback to set the video
      onVideoSelect(selectedFile, videoUrl);
      
      // Show success message
      toast({
        title: "Video uploaded successfully!",
        description: `Processing options: ${
          [
            options.extractAudio && "Audio extraction",
            options.generateSubtitles && `Subtitles (${options.subtitleLanguages.length} languages)`,
            options.generateAudioFromTranscript && "Audio from transcript"
          ].filter(Boolean).join(", ") || "Basic upload"
        }`,
      });

      // Reset and close
      setSelectedFile(null);
      setProcessing(false);
      onClose();
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error processing your video. Please try again.",
        variant: "destructive"
      });
      setProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            {t('upload.title')}
          </DialogTitle>
          <DialogDescription>
            {t('upload.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload Section */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <File className="w-5 h-5" />
                Select Video File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="video-upload"
                />
                <Label htmlFor="video-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      {selectedFile ? selectedFile.name : "Click to select video file"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('upload.supportedFormats')} ({t('upload.maxSize')})
                    </p>
                    {selectedFile && (
                      <Badge variant="secondary" className="mt-2">
                        {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                      </Badge>
                    )}
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>

          {selectedFile && (
            <div className="space-y-6 fade-in-scale">
              {/* Audio Processing Options */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Music className="w-5 h-5" />
                    Audio Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="extract-audio"
                      checked={options.extractAudio}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, extractAudio: checked as boolean }))
                      }
                    />
                    <Label htmlFor="extract-audio" className="text-sm font-medium">
                      {t('upload.extractAudio')}
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    {t('upload.extractAudioDesc')}
                  </p>
                </CardContent>
              </Card>

              {/* Subtitle Generation Options */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Languages className="w-5 h-5" />
                    Subtitle Generation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="generate-subtitles"
                      checked={options.generateSubtitles}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, generateSubtitles: checked as boolean }))
                      }
                    />
                    <Label htmlFor="generate-subtitles" className="text-sm font-medium">
                      {t('upload.generateSubtitles')}
                    </Label>
                  </div>

                  {options.generateSubtitles && (
                    <div className="space-y-4 ml-6">
                      {/* Language Selection */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">{t('upload.selectLanguages')}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {availableLanguages.map((lang) => (
                            <div key={lang.code} className="flex items-center space-x-2">
                              <Checkbox
                                id={`lang-${lang.code}`}
                                checked={options.subtitleLanguages.includes(lang.code)}
                                onCheckedChange={() => handleLanguageToggle(lang.code)}
                              />
                              <Label htmlFor={`lang-${lang.code}`} className="text-sm cursor-pointer">
                                {lang.flag} {lang.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Format Selection */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">{t('upload.selectFormats')}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {subtitleFormats.map((format) => (
                            <div key={format.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`format-${format.id}`}
                                checked={options.subtitleFormats.includes(format.id)}
                                onCheckedChange={() => handleFormatToggle(format.id)}
                              />
                              <Label htmlFor={`format-${format.id}`} className="text-sm cursor-pointer">
                                {format.name} ({format.extension})
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Audio Generation */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Mic className="w-5 h-5" />
                    AI Audio Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="generate-audio"
                      checked={options.generateAudioFromTranscript}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, generateAudioFromTranscript: checked as boolean }))
                      }
                    />
                    <Label htmlFor="generate-audio" className="text-sm font-medium">
                      {t('upload.generateTTS')}
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6 mt-2">
                    {t('upload.generateTTSDesc')}
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={onClose} disabled={processing}>
                  {t('upload.cancel')}
                </Button>
                <Button 
                  onClick={handleProcess} 
                  disabled={processing}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('upload.processing')}
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      {t('upload.process')}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};