import React, { useState, useRef } from 'react';
import { Send, Heart, X, Mic, Square, Trash2, Files, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';
import { memoriesUploadService } from '@/services/memoriesUpload';

  const AudioRecorder = ({ t, onAudioRecorded, audioBlob, onAudioDeleted }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const intervalRef = useRef(null);
    const { toast } = useToast();

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            const audioBlob = new Blob([event.data], { type: 'audio/webm' });
            onAudioRecorded(audioBlob);
          }
        };

        recorder.onstop = () => {
          stream.getTracks().forEach(track => track.stop());
        };

        setMediaRecorder(recorder);
        recorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        
        intervalRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } catch (error) {
        toast({
          title: t.microphoneError,
          description: t.microphoneErrorDesc,
          variant: "destructive"
        });
      }
    };

    const stopRecording = () => {
      if (mediaRecorder && isRecording) {
        const finalDuration = recordingTime;
        mediaRecorder.stop();
        setIsRecording(false);
        setMediaRecorder(null);
        setAudioDuration(finalDuration);
        
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    };

    const deleteRecording = () => {
      onAudioDeleted();
      setRecordingTime(0);
      setAudioDuration(0);
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const WaveAnimation = () => (
      <div className="flex items-center space-x-1 ml-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-primary rounded-full animate-pulse"
            style={{
              height: `${8 + Math.sin(Date.now() / 200 + i) * 3}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
    );

    return (
      <div>
        <Label className="flex items-center mb-3 text-sm font-medium text-foreground">
          <Mic className="w-4 h-4 mr-2 text-primary" />
          {t.audioMessage}
        </Label>
        
        <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-background">
          {/* État initial - pas d'enregistrement */}
          {!isRecording && !audioBlob && (
            <>
              <span className="text-sm text-primary/70 font-medium">{t.startRecorderButton}</span>
              <Button
                type="button"
                onClick={startRecording}
                variant="outline"
                size="sm"
                className="w-10 h-10 rounded-full p-0 border-red-300 hover:bg-red-50"
              >
                <div className="w-4 h-4 bg-red-500 rounded-full" />
              </Button>
            </>
          )}

          {/* État d'enregistrement */}
          {isRecording && (
            <>
              <div className="flex items-center">
                <span className="text-sm text-primary/70 font-medium">{t.recordingStatus} {formatTime(recordingTime)}</span>
                <WaveAnimation />
              </div>
              <Button
                type="button"
                onClick={stopRecording}
                variant="outline"
                size="sm"
                className="w-10 h-10 rounded-full p-0 border-red-300 hover:bg-red-50"
              >
                <Square className="w-4 h-4 fill-red-500 text-red-500" />
              </Button>
            </>
          )}

          {/* État après enregistrement */}
          {audioBlob && !isRecording && (
            <>
              <span className="text-sm text-primary/70 font-medium">{t.audioRecordedStatus} {formatTime(audioDuration)}</span>
              <Button
                type="button"
                onClick={deleteRecording}
                variant="outline"
                size="sm"
                className="w-10 h-10 rounded-full p-0 border-gray-300 hover:bg-gray-50"
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };const FileInfo = ({ file, onRemove }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="relative bg-secondary/10 rounded-lg p-3 flex items-center space-x-3">
      <div className="flex-grow min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground ">{formatFileSize(file.size)}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onRemove(file)}
        className="flex-shrink-0 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

const MemoryForm = ({ t }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleAudioRecorded = (blob) => {
    setAudioBlob(blob);
  };

  const handleAudioDeleted = () => {
    setAudioBlob(null);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Valider les fichiers
    const errors = memoriesUploadService.validateFiles(selectedFiles);
    if (errors.length > 0) {
      toast({
        title: t.validationError,
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    // Ajouter les nouveaux fichiers sans dépasser 10
    const newFiles = [...files, ...selectedFiles].slice(0, 10);
    setFiles(newFiles);

    // Reset l'input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: t.error,
        description: t.nameRequired,
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Préparer les fichiers pour l'upload (inclure l'audio si présent)
      const allFiles = audioBlob 
        ? [...files, new File([audioBlob], `message-audio-${Date.now()}.webm`, { type: 'audio/webm' })]
        : [...files];

      const result = await memoriesUploadService.uploadMemories(allFiles, name.trim(), message.trim());
      
      toast({
        title: t.uploadSuccess,
        description: `${result.filesUploaded} ${t.uploadSuccessDescription}`,
        className: "border-green-200 bg-green-50",
        style: {
          borderColor: "#bbf7d0",
          backgroundColor: "#f0fdf4",
          color: "#166534"
        }
      });

      // Reset du formulaire
      setName('');
      setMessage('');
      setFiles([]);
      setAudioBlob(null);
      
    } catch (error) {
      toast({
        title: t.uploadError,
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.memoriesTitle}</h2>
        <div className="w-20 h-0.5 bg-primary mx-auto mb-8"></div>
        <p className="text-foreground/80 max-w-xl mx-auto">{t.memoriesDescription}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl shadow-xl border border-primary/10"
      >
        {/* Nom */}
        <div>
          <Label htmlFor="memoryName" className="flex items-center mb-3 text-sm font-medium text-foreground">
            <Heart className="w-4 h-4 mr-2 text-primary" />
            {t.yourName}
          </Label>
          <Input
            id="memoryName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.yourNamePlaceholder}
            required
            disabled={isUploading}
            className="bg-background"
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="memoryMessage" className="flex items-center mb-3 text-sm font-medium text-foreground">
            <Edit3 className="w-4 h-4 mr-2 text-primary" />
            {t.yourMessage}
          </Label>
          <Textarea
            id="memoryMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.yourMessagePlaceholder}
            rows="4"
            disabled={isUploading}
            className="bg-background"
          />
        </div>

        {/* Message audio */}
        <AudioRecorder 
          t={t}
          onAudioRecorded={handleAudioRecorded}
          audioBlob={audioBlob}
          onAudioDeleted={handleAudioDeleted}
        />

        {/* Sélection de fichiers */}
        <div>
          <Label className="flex items-center mb-3 text-sm font-medium text-foreground">
            <Files className="w-4 h-4 mr-2 text-primary" />
            {t.files} ({files.length}/10)
          </Label>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept={memoriesUploadService.getAcceptedTypes()}
            capture="environment"
            multiple
            className="hidden"
            disabled={isUploading}
          />
          
          <Button
            type="button"
            onClick={handleFileSelect}
            disabled={isUploading || files.length >= 10}
            variant="outline"
            className="w-full h-16 border-2 border-dashed border-primary/30 hover:border-primary/50 bg-background hover:bg-primary/5"
          >
            <div className="text-center">
              <p className="text-sm text-primary/70 font-medium">
                {files.length >= 10 ? t.maxReached : t.selectFiles}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-normal">
                {t.fileTypes}
              </p>
            </div>
          </Button>
        </div>

        {/* Liste des fichiers */}
        {files.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              {t.selectedFiles}
            </Label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <FileInfo
                  key={`${file.name}-${file.lastModified}-${index}`}
                  file={file}
                  onRemove={removeFile}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bouton de soumission */}
        <div className="py-2">
          <Button 
            type="submit" 
            disabled={isUploading || !name.trim()}
            className={`w-full group h-12 ${
              !isUploading && name.trim()
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                : 'bg-foreground/20 text-foreground/50 cursor-not-allowed'
            }`}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                {t.sharing}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                {t.shareMemory}
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          {t.privacyNote}
        </p>
      </form>
    </div>
  );
};

const Memories = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="memories" className="py-20 section-light section-transition">
      <div className="container mx-auto px-4 relative z-10">
        <MemoryForm t={t.memories} />
      </div>
    </section>
  );
};

export default Memories;