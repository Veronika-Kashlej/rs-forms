import { useState } from 'react';
import Modal from '../../components/modal/Modal';
import UncontrolledForm from './components/forms/UncontrolledForm';
import HookForm from './components/forms/HookForm';
import DataDisplay from '@/components/data/DataDisplay';

function HomePage() {
  const [isUncontrolledModalOpen, setIsUncontrolledModalOpen] = useState(false);
  const [isHookFormModalOpen, setIsHookFormModalOpen] = useState(false);
  return (
    <>
      <h1>Home Page</h1>
      <div className="buttons-container">
        <button onClick={() => setIsUncontrolledModalOpen(true)}>
          Open Uncontrolled Form
        </button>
        <button onClick={() => setIsHookFormModalOpen(true)}>
          Open React Hook Form
        </button>
      </div>
      <DataDisplay />
      <Modal
        isOpen={isUncontrolledModalOpen}
        onClose={() => setIsUncontrolledModalOpen(false)}
        title="Uncontrolled Form"
      >
        <UncontrolledForm onClose={() => setIsUncontrolledModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isHookFormModalOpen}
        onClose={() => setIsHookFormModalOpen(false)}
        title="Hook Form"
      >
        <HookForm onClose={() => setIsHookFormModalOpen(false)} />
      </Modal>
    </>
  );
}
export default HomePage;
