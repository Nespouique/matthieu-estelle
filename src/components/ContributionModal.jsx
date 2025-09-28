import React, { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';

// Modal Component inline pour éviter les problèmes d'import
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto border border-secondary/20">
        {children}
      </div>
    </div>
  );
};

const ContributionModal = ({ isOpen, onClose, translations }) => {
  const [copiedIban, setCopiedIban] = useState(false);
  const [copiedBic, setCopiedBic] = useState(false);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'iban') {
        setCopiedIban(true);
        setTimeout(() => setCopiedIban(false), 2000);
      } else if (type === 'bic') {
        setCopiedBic(true);
        setTimeout(() => setCopiedBic(false), 2000);
      }
    } catch (err) {
      // Failed to copy - fallback could be implemented here
    }
  };

  const handleRevolutClick = () => {
    window.open('https://revolut.me/matthijho4', '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-primary mb-4">
            {translations.modal.title}
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* SEPA Transfer */}
          <div className="bg-secondary/25 border border-secondary/30 rounded-xl p-6">
            <h3 className="text-xl text-primary mb-4">
              {translations.modal.sepaTitle}
            </h3>
            
            {/* IBAN */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="text-md font-mono text-foreground/80">
                  {translations.modal.iban}
                </div>
                <button
                  onClick={() => copyToClipboard('FR76282330000117400183920179', 'iban')}
                  className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex-shrink-0"
                >
                  {copiedIban ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* BIC */}
            <div>
              <div className="flex items-center justify-between">
                <div className="text-md font-mono text-foreground/80">
                  {translations.modal.bic}
                </div>
                <button
                  onClick={() => copyToClipboard('REVOFRP2', 'bic')}
                  className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex-shrink-0"
                >
                  {copiedBic ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Revolut */}
          <div className="bg-secondary/25 border border-secondary/30 rounded-xl p-6">
            <h3 className="text-xl text-primary mb-4">
              {translations.modal.revolutTitle}
            </h3>
            <button
              onClick={handleRevolutClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-medium transition-colors"
            >
              {translations.modal.revolutButton}
            </button>
          </div>

          {/* Physical contribution */}
          <div className="bg-secondary/25 border border-secondary/30 rounded-xl p-6">
            <h3 className="text-xl text-primary mb-4">
              {translations.modal.urneTitle}
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              {translations.modal.urneDescription}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContributionModal;