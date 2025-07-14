import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  showControls: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onFullscreen: () => void;
}

export const VideoControls = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  showControls,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onFullscreen
}: VideoControlsProps) => {
  
  // Format time display
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`absolute inset-0 player-controls ${showControls ? 'visible' : ''}`}>
      {/* Main Play Button - Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          variant="ghost"
          size="lg"
          onClick={onPlayPause}
          className="player-button primary w-20 h-20 hover:scale-110"
        >
          {isPlaying ? 
            <Pause className="w-8 h-8" /> : 
            <Play className="w-8 h-8 ml-1" />
          }
        </Button>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="group">
            <div 
              className="progress-bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickPercentage = (clickX / rect.width) * 100;
                const newTime = (clickPercentage / 100) * duration;
                onSeek(newTime);
              }}
            >
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              />
              <div 
                className="progress-thumb"
                style={{ left: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Control Buttons and Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Skip Back */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSeek(Math.max(0, currentTime - 10))}
                className="player-button"
              >
                <SkipBack className="w-5 h-5" />
              </Button>

              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onPlayPause}
                className="player-button primary"
              >
                {isPlaying ? 
                  <Pause className="w-5 h-5" /> : 
                  <Play className="w-5 h-5 ml-0.5" />
                }
              </Button>

              {/* Skip Forward */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSeek(Math.min(duration, currentTime + 10))}
                className="player-button"
              >
                <SkipForward className="w-5 h-5" />
              </Button>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}
                  className="player-button"
                >
                  {volume > 0 ? 
                    <Volume2 className="w-5 h-5" /> : 
                    <VolumeX className="w-5 h-5" />
                  }
                </Button>
                <div className="w-24">
                  <Slider
                    value={[volume * 100]}
                    onValueChange={(value) => onVolumeChange(value[0] / 100)}
                    max={100}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Time Display */}
              <div className="text-sm text-foreground/80 font-mono min-w-[120px]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2">
              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onFullscreen}
                className="player-button"
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};