import { useState } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { VideoUploader } from '@/components/VideoUploader';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Play, Subtitles, Upload } from 'lucide-react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>('');

  const handleVideoSelect = (file: File, url: string) => {
    setUploadedVideoUrl(url);
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  InSync
                </h1>
                <p className="text-xs text-muted-foreground">Premium Video Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {t('video.heroTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('video.heroDescription')}
          </p>
        </div>

        {/* Video Player Section */}
        <div className="mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                {t('video.player')}
              </CardTitle>
              <CardDescription>
                {t('video.playerDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <VideoUploader
                  onVideoSelect={handleVideoSelect}
                  className="mb-4"
                />
                <VideoPlayer 
                  className="aspect-video w-full max-w-4xl mx-auto"
                  src={uploadedVideoUrl}
                  poster="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&h=900"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card/30 backdrop-blur-sm border-border/20 hover:bg-card/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Play className="w-5 h-5 text-primary" />
                {t('video.multiFormat')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('video.multiFormatDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/20 hover:bg-card/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-accent" />
                {t('video.multiLanguage')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('video.multiLanguageDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/20 hover:bg-card/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Subtitles className="w-5 h-5 text-primary" />
                {t('video.advancedSubtitles')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('video.advancedSubtitlesDesc')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon - Subtitle Generator */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              {t('video.aiGeneration')}
              <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                {t('video.comingSoon')}
              </span>
            </CardTitle>
            <CardDescription>
              {t('video.aiGenerationDesc')}
            </CardDescription>
          </CardHeader>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-card/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
