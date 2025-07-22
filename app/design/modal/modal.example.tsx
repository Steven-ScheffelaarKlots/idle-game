import React, { useState } from 'react';
import Button from '../button/button';
import Modal, { ModalButton } from './modal';
import { useModal } from './modalContext';

const ModalExample: React.FC = () => {
  // Example using the Modal component directly
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState('basic');
  
  // Example using the Modal context
  const { openModal } = useModal();

  const modalButtons: ModalButton[] = [
    {
      label: 'Cancel',
      onClick: () => setIsModalOpen(false),
      variant: 'secondary',
    },
    {
      label: 'Confirm',
      onClick: () => {
        alert('Action confirmed!');
        setIsModalOpen(false);
      },
      variant: 'primary',
    },
  ];

  const showContextModal = () => {
    openModal({
      title: 'Context-Based Modal',
      content: (
        <div>
          <p>This modal is opened using the modal context!</p>
          <p>It&apos;s a more convenient way to manage modals in your application.</p>
        </div>
      ),
      buttons: [
        {
          label: 'Got it!',
          onClick: () => {},
          variant: 'success',
        },
      ],
    });
  };

  const renderModalContent = () => {
    switch (currentModal) {
      case 'basic':
        return <p>This is a basic modal with customizable buttons.</p>;
      case 'form':
        return (
          <form>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                Username:
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                Password:
              </label>
              <input
                type="password"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          </form>
        );
      case 'long':
        return (
          <div>
            <p>This modal has a lot of content to demonstrate scrolling.</p>
            {Array.from({ length: 20 }).map((_, index) => (
              <p key={index}>
                Paragraph {index + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.
              </p>
            ))}
          </div>
        );
      default:
        return <p>Unknown modal type</p>;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Modal Component Examples</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>Basic Usage</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => { setCurrentModal('basic'); setIsModalOpen(true); }}>
            Open Basic Modal
          </Button>
          <Button onClick={() => { setCurrentModal('form'); setIsModalOpen(true); }} variant="info">
            Open Form Modal
          </Button>
          <Button onClick={() => { setCurrentModal('long'); setIsModalOpen(true); }} variant="warning">
            Open Long Content Modal
          </Button>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Using Modal Context</h2>
        <Button onClick={showContextModal} variant="success">
          Open Context Modal
        </Button>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${currentModal.charAt(0).toUpperCase() + currentModal.slice(1)} Modal Example`}
        buttons={modalButtons}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default ModalExample;
