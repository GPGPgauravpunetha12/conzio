import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MoveCards({ card ,handleCardMove}) {
  const [buckets, setBuckets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetBucketId, setTargetBucketId] = useState(null);

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/buckets`);
        setBuckets(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBuckets();
  }, []);

  const handleMoveClick = () => {
    setModalOpen(true);
  };

  const handleTargetBucketSelect = (e) => {
    setTargetBucketId(e.target.value);
  };

  const handleMoveSubmit = async (e) => {
    try {
        const bucketId = parseInt(targetBucketId);
      const res = await axios.patch(`http://localhost:3000/cards/${card.id}`, { bucketId});
   
        setModalOpen(res.data);
        
      handleCardMove({ ...card, bucketId });
      } catch (err) {
        console.error(err);
      
      }
  };

  return (
    <div className="card-container">

      <button onClick={handleMoveClick}>Move</button>
      {modalOpen && (
        <div className="modal">
          <h3>Select a bucket</h3>
          <select onChange={handleTargetBucketSelect}>
            {buckets.map((bucket) => (
              <option key={bucket.id} value={bucket.id}>
                {bucket.name}
              </option>
            ))}
          </select>
          <button onClick={handleMoveSubmit}>Move</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </div>

        
      )}
    </div>
  );
            }
 export default MoveCards;