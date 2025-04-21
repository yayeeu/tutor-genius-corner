
import { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface VoiceRecorderProps {
  onTranscriptionComplete: (text: string) => void;
}

const VoiceRecorder = ({ onTranscriptionComplete }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const { toast } = useToast();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const progressIntervalRef = useRef<number | null>(null);
  const maxRecordingTime = 30; // seconds

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  };
  
  const handleAudioStop = async () => {
    if (audioChunksRef.current.length === 0) return;
    
    setRecordingProgress(0);
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      const base64Audio = base64data.split(',')[1];
      
      try {
        toast({ title: "Converting speech to text..." });
        
        const response = await fetch("/api/speech-to-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audio: base64Audio }),
        });
        
        if (!response.ok) {
          throw new Error("Speech recognition failed");
        }
        
        const { text } = await response.json();
        
        if (text && text.trim()) {
          onTranscriptionComplete(text);
          toast({ title: "Speech converted to text", description: "You can edit before sending" });
        } else {
          toast({ 
            title: "Could not recognize speech", 
            description: "Please try speaking more clearly", 
            variant: "destructive" 
          });
        }
      } catch (error) {
        console.error("Error in speech recognition:", error);
        toast({
          title: "Speech recognition error",
          description: "Please try again or use text input",
          variant: "destructive",
        });
      }
    };
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = handleAudioStop;
      
      mediaRecorder.start();
      setIsRecording(true);
      toast({ 
        title: "Recording started", 
        description: "Speak clearly into your microphone" 
      });
      
      let secondsElapsed = 0;
      setRecordingProgress(0);
      
      progressIntervalRef.current = window.setInterval(() => {
        secondsElapsed++;
        const progress = Math.min((secondsElapsed / maxRecordingTime) * 100, 100);
        setRecordingProgress(progress);
        
        if (secondsElapsed >= maxRecordingTime) {
          stopRecording();
        }
      }, 1000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone access denied",
        description: "Please enable microphone access to use voice input",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {isRecording && (
        <div className="w-full mb-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-tutor-orange font-medium">Recording...</span>
            <span>{Math.floor(recordingProgress / 100 * maxRecordingTime)}s / {maxRecordingTime}s</span>
          </div>
          <Progress value={recordingProgress} className="h-1.5" />
        </div>
      )}
      
      <Button
        variant="outline"
        size="icon"
        className={`h-10 w-10 border-tutor-light-gray ${isRecording ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white'}`}
        onClick={toggleRecording}
      >
        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
    </>
  );
};

export default VoiceRecorder;
