import React, { useState, useRef } from 'react';
import { Send, Heart, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';
import { memoriesUploadService } from '@/services/memoriesUpload';

const FileInfo = ({ file, onRemove }) => {
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
        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
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
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Valider les fichiers
    const errors = memoriesUploadService.validateFiles(selectedFiles);
    if (errors.length > 0) {
      toast({
        title: t.memories.validationError,
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
        title: t.memories.error,
        description: t.memories.nameRequired,
        variant: "destructive"
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: t.memories.error, 
        description: t.memories.filesRequired,
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const result = await memoriesUploadService.uploadMemories(files, name.trim(), message.trim());
      
      toast({
        title: t.memories.uploadSuccess,
        description: `${result.filesUploaded} ${t.memories.uploadSuccessDescription}`,
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
      
    } catch (error) {
      toast({
        title: t.memories.uploadError,
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
            Votre nom *
          </Label>
          <Input
            id="memoryName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom..."
            required
            disabled={isUploading}
            className="bg-background"
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="memoryMessage" className="flex items-center mb-3 text-sm font-medium text-foreground">
            <FileText className="w-4 h-4 mr-2 text-primary" />
            Votre message / Anecdote
          </Label>
          <Textarea
            id="memoryMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Partagez un souvenir, une anecdote... (optionnel)"
            rows="4"
            disabled={isUploading}
            className="bg-background"
          />
        </div>

        {/* Sélection de fichiers */}
        <div>
          <Label className="flex items-center mb-3 text-sm font-medium text-foreground">
            <FileText className="w-4 h-4 mr-2 text-primary" />
            Fichiers ({files.length}/10)
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
                {files.length >= 10 ? 'Maximum atteint' : 'Sélectionner des fichiers'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Images, vidéos, audio (max 100 Mo chacun)
              </p>
            </div>
          </Button>
        </div>

        {/* Liste des fichiers */}
        {files.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Fichiers sélectionnés :
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
        <Button 
          type="submit" 
          disabled={isUploading || !name.trim() || files.length === 0}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group h-12"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Upload en cours...
            </>
          ) : (
            <>
              Partager le souvenir 
              <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Vos souvenirs seront conservés privés et accessibles uniquement aux mariés.
        </p>
      </form>
    </div>
  );
};

const Memories = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="memories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <MemoryForm t={t.memories} />
      </div>
    </section>
  );
};

export default Memories;