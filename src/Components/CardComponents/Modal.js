import React, { useState } from 'react';

function Modal({ card }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleCardClick = () => {
    setModalOpen(true);
    setVideoUrl(card.link);
  };

  return (
    <div>
      <div onClick={handleCardClick}>
        {card.name}
      </div>
      {modalOpen && (
        <div className="modal">
          <iframe src={videoUrl} />
          <button onClick={() => setModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
export default Modal;