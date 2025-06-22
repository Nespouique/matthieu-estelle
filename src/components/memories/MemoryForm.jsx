import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Image as ImageIcon, Send, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const MemoryForm = ({ onAddMemory, t }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: t.memoriesForm.error,
          description: "File size should not exceed 5MB.",
          variant: "destructive",
        });
        return;
      }
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
              <img  src={filePreview} alt="Aperçu du fichier" className="max-h-40 rounded-md shadow-md"  src="https://images.unsplash.com/photo-1689330306004-8c72d2399132" />
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

export default MemoryForm;