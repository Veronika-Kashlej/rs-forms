import React, { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

interface ModalPortalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalPortal: React.FC<ModalPortalProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      const overlay = document.querySelector('.modal-overlay');
      if (overlay && e.target === overlay) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleOutsideClick);
    document.body.classList.add('modal-open');

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleOutsideClick);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    console.error('Modal root element not found!');
    return null;
  }

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    modalRoot
  );
};

export default ModalPortal;
