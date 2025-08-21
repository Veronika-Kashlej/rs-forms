import { ReactNode } from 'react';
import ModalPortal from './ModalPortal';
import './modal.css';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <ModalPortal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
          <h2 id="modal-title">{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
