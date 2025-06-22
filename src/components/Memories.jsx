import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { MessageCircle, Image as ImageIcon, Video, Send, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { translations } from '@/lib/translations';

const MemoryForm = ({ onAddMemory, t }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({ title: t.memoriesForm.error, description: t.memoriesForm.nameMessageError, variant: "destructive" });
      return;
    }
    onAddMemory({ name, message, file, filePreview, date: new Date().toISOString() });
    setName('');
    setMessage('');
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };
  const { toast } = useToast();

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl shadow-xl border border-primary/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div>
        <Label htmlFor="memoryName" className="flex items-center mb-1 text-sm font-medium text-foreground">
          <Heart className="w-4 h-4 mr-2 text-primary" /> {t.memoriesForm.name} *
        </Label>
        <Input
          id="memoryName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.memoriesForm.namePlaceholder}
          required
        />
      </div>
      <div>
        <Label htmlFor="memoryMessage" className="flex items-center mb-1 text-sm font-medium text-foreground">
          <MessageCircle className="w-4 h-4 mr-2 text-primary" /> {t.memoriesForm.message} *
        </Label>
        <Textarea
          id="memoryMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.memoriesForm.messagePlaceholder}
          rows="4"
          required
        />
      </div>
      <div>
        <Label htmlFor="memoryFile" className="flex items-center mb-1 text-sm font-medium text-foreground">
          <ImageIcon className="w-4 h-4 mr-2 text-primary" /> {t.memoriesForm.file}
        </Label>
        <Input
          id="memoryFile"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
        />
        {filePreview && (
          <div className="mt-4">
            {file && file.type.startsWith('image/') ? (
              <img src={filePreview} alt="Aperçu du fichier" className="max-h-40 rounded-md shadow-md" />
            ) : (
              <video src={filePreview} controls className="max-h-40 rounded-md shadow-md"></video>
            )}
          </div>
        )}
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
        {t.memoriesForm.submit} <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.form>
  );
};

const MemoryCard = ({ memory, t }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(t.localeForDate, options);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      className="bg-background p-6 rounded-xl shadow-lg border border-secondary/10"
    >
      {memory.filePreview && (
        <div className="mb-4 rounded-lg overflow-hidden">
          {memory.file && memory.file.type.startsWith('image/') ? (
            <img src={memory.filePreview} alt={`${t.memories.altFilePreview} ${memory.name}`} className="w-full h-auto max-h-60 object-cover" />
          ) : (
            <video src={memory.filePreview} controls className="w-full h-auto max-h-60"></video>
          )}
        </div>
      )}
      <h4 className="text-lg font-serif text-secondary mb-1">{memory.name}</h4>
      <p className="text-xs text-muted-foreground mb-3">{formatDate(memory.date)}</p>
      <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{memory.message}</p>
    </motion.div>
  );
};

const Memories = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const storedMemories = JSON.parse(localStorage.getItem('memories') || '[]');
    setMemories(storedMemories);
  }, []);

  const addMemory = (newMemory) => {
    const updatedMemories = [newMemory, ...memories];
    setMemories(updatedMemories);
    localStorage.setItem('memories', JSON.stringify(updatedMemories));
    toast({
      title: t.memories.memoriesForm.success,
      description: t.memories.memoriesForm.successMessage,
    });
  };

  return (
    <section id="memories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary mb-6">{t.memories.memoriesTitle}</h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mb-8"></div>
          <p className="text-foreground/80 max-w-xl mx-auto">{t.memories.memoriesDescription}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <MemoryForm onAddMemory={addMemory} t={t.memories} />
          
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {memories.length > 0 ? (
                memories.map((memory, index) => (
                  <MemoryCard key={index} memory={memory} t={t} />
                ))
              ) : (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-muted-foreground py-8"
                >
                  {t.memories.noMemoriesYet}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memories;