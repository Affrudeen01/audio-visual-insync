import { useState } from 'react';
import { Volume2, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface AudioTrack {
  id: string;
  language: string;
  label: string;
  isDefault?: boolean;
}

const mockAudioTracks: AudioTrack[] = [
  { id: 'en', language: 'en', label: 'English', isDefault: true },
  { id: 'fr', language: 'fr', label: 'Français' },
  { id: 'de', language: 'de', label: 'Deutsch' },
  { id: 'ar', language: 'ar', label: 'العربية' },
];

export const AudioSelector = () => {
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack>(
    mockAudioTracks.find(track => track.isDefault) || mockAudioTracks[0]
  );

  const handleTrackSelect = (track: AudioTrack) => {
    setSelectedTrack(track);
    // Here you would implement the actual audio track switching logic
    console.log('Switching to audio track:', track);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="bg-player-control/90 backdrop-blur-sm border border-border/20 hover:bg-player-control-hover transition-all duration-200"
        >
          <Volume2 className="w-4 h-4 mr-2" />
          <span className="text-xs font-medium">{selectedTrack.label}</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="min-w-[160px] bg-popover/95 backdrop-blur-sm border-border/30"
      >
        {mockAudioTracks.map((track) => (
          <DropdownMenuItem
            key={track.id}
            onClick={() => handleTrackSelect(track)}
            className={`cursor-pointer transition-colors ${
              selectedTrack.id === track.id 
                ? 'bg-primary/20 text-primary' 
                : 'hover:bg-muted/50'
            }`}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            <div className="flex flex-col">
              <span className="font-medium">{track.label}</span>
              <span className="text-xs text-muted-foreground">Audio Track</span>
            </div>
            {selectedTrack.id === track.id && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};