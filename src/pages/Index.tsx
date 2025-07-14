import { VideoPlayer } from '@/components/VideoPlayer';
import { Play, Globe, Subtitles, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
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
              <Button variant="ghost" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                EN
              </Button>
              <Button variant="secondary" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Premium Video Streaming Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Multi-language video player optimized for low-resource environments with advanced subtitle support and AI-powered generation.
          </p>
        </div>

        {/* Video Player Section */}
        <div className="mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                Video Player
              </CardTitle>
              <CardDescription>
                Professional video playback with multi-language audio and subtitle support
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <VideoPlayer 
                className="aspect-video w-full max-w-4xl mx-auto"
                poster="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&h=900"
              />
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card/30 backdrop-blur-sm border-border/20 hover:bg-card/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Play className="w-5 h-5 text-primary" />
                Multi-Format Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Supports MP4, MKV, WebM with HLS and MPEG-DASH streaming protocols for maximum compatibility.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/20 hover:bg-card/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-accent" />
                Multi-Language Audio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Seamless switching between multiple audio tracks in different languages with automatic detection.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/20 hover:bg-card/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Subtitles className="w-5 h-5 text-primary" />
                Advanced Subtitles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built-in subtitle support with external file upload, timing controls, and AI-powered generation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon - Subtitle Generator */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              AI Subtitle Generation
              <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </CardTitle>
            <CardDescription>
              Upload videos and automatically generate subtitles in multiple languages using OpenAI Whisper
            </CardDescription>
          </CardHeader>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-card/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 InSync Video Platform. Optimized for in-flight entertainment and low-resource environments.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
