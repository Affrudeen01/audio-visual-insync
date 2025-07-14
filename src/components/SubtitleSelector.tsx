import { useState, useRef } from 'react';
import { Subtitles, ChevronDown, Upload, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface SubtitleTrack {
  id: string;
  language: string;
  label: string;
  src?: string;
  isExternal?: boolean;
}

const mockSubtitleTracks: SubtitleTrack[] = [
  { id: 'en', language: 'en', label: 'English' },
  { id: 'fr', language: 'fr', label: 'Français' },
  { id: 'de', language: 'de', label: 'Deutsch' },
  { id: 'ar', language: 'ar', label: 'العربية' },
];

export const SubtitleSelector = () => {
  const [selectedTrack, setSelectedTrack] = useState<SubtitleTrack | null>(null);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [availableTracks, setAvailableTracks] = useState<SubtitleTrack[]>(mockSubtitleTracks);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleTrackSelect = (track: SubtitleTrack | null) => {
    setSelectedTrack(track);
    setSubtitlesEnabled(track !== null);
    // Here you would implement the actual subtitle track switching logic
    console.log('Switching to subtitle track:', track);
  };

  const handleSubtitleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['.srt', '.vtt', '.txt'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!validTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a .srt, .vtt, or .txt subtitle file.",
          variant: "destructive"
        });
        return;
      }

      // Create a new subtitle track from the uploaded file
      const newTrack: SubtitleTrack = {
        id: `custom-${Date.now()}`,
        language: 'custom',
        label: file.name.replace(/\.[^/.]+$/, ''),
        src: URL.createObjectURL(file),
        isExternal: true
      };

      setAvailableTracks(prev => [...prev, newTrack]);
      setSelectedTrack(newTrack);
      setSubtitlesEnabled(true);

      toast({
        title: "Subtitles uploaded",
        description: `Successfully loaded: ${file.name}`,
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const toggleSubtitles = () => {
    setSubtitlesEnabled(!subtitlesEnabled);
    if (!subtitlesEnabled && selectedTrack) {
      // If enabling and we have a selected track, keep it
      return;
    }
    if (subtitlesEnabled) {
      // If disabling, just turn off display but keep selection
      return;
    }
    // If enabling but no track selected, select first available
    if (!selectedTrack && availableTracks.length > 0) {
      setSelectedTrack(availableTracks[0]);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className={`bg-player-control/90 backdrop-blur-sm border border-border/20 hover:bg-player-control-hover transition-all duration-200 ${
              subtitlesEnabled ? 'ring-2 ring-primary/50' : ''
            }`}
          >
            <Subtitles className="w-4 h-4 mr-2" />
            <span className="text-xs font-medium">
              {selectedTrack ? selectedTrack.label : 'Subtitles'}
            </span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="min-w-[200px] bg-popover/95 backdrop-blur-sm border-border/30"
        >
          {/* Toggle Subtitles */}
          <DropdownMenuItem
            onClick={toggleSubtitles}
            className="cursor-pointer hover:bg-muted/50"
          >
            {subtitlesEnabled ? (
              <Eye className="w-4 h-4 mr-2" />
            ) : (
              <EyeOff className="w-4 h-4 mr-2" />
            )}
            <span>{subtitlesEnabled ? 'Hide Subtitles' : 'Show Subtitles'}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Off Option */}
          <DropdownMenuItem
            onClick={() => handleTrackSelect(null)}
            className={`cursor-pointer transition-colors ${
              !selectedTrack 
                ? 'bg-primary/20 text-primary' 
                : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>Off</span>
              {!selectedTrack && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Available Tracks */}
          {availableTracks.map((track) => (
            <DropdownMenuItem
              key={track.id}
              onClick={() => handleTrackSelect(track)}
              className={`cursor-pointer transition-colors ${
                selectedTrack?.id === track.id 
                  ? 'bg-primary/20 text-primary' 
                  : 'hover:bg-muted/50'
              }`}
            >
              <Subtitles className="w-4 h-4 mr-2" />
              <div className="flex flex-col flex-1">
                <span className="font-medium">{track.label}</span>
                <span className="text-xs text-muted-foreground">
                  {track.isExternal ? 'External' : 'Built-in'}
                </span>
              </div>
              {selectedTrack?.id === track.id && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          {/* Upload Option */}
          <DropdownMenuItem
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer hover:bg-muted/50"
          >
            <Upload className="w-4 h-4 mr-2" />
            <span>Upload Subtitle File</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".srt,.vtt,.txt"
        onChange={handleSubtitleUpload}
        className="hidden"
      />
    </>
  );
};
