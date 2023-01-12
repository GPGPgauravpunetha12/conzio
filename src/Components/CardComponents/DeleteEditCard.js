import React, { useState } from 'react';
import axios from 'axios';


    function DeleteEditCard({ card }) {
        const [isEditing, setIsEditing] = useState(false);
        const [cardName, setCardName] = useState(card.name);
        const [cardLink, setCardLink] = useState(card.link);
        const [cards, setCards] = useState([]);  // initialize state for cards
      
        const handleDelete = async () => {
          try {
            await axios.delete(`http://localhost:3000/cards/${card.id}`);
            // update the state by removing the deleted card
            setCards(cards.filter(c => c.id !== card.id));
          } catch (err) {
            console.error(err);
          }
        };
      
        const handleEdit = async () => {
          try {
            await axios.patch(`http://localhost:3000/cards/${card.id}`, { name: cardName, link: cardLink });
            // update the state by replacing the old card with the updated card
            const updatedCard = { id: card.id, name: cardName, link: cardLink };
            setCards(cards.map(c => c.id === card.id ? updatedCard : c));
            setIsEditing(false);
          } catch (err) {
            console.error(err);
          }
        };
      
        return (
          <div className="card-container">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Enter card name"
                />
           
          <input
            type="text"
            value={cardLink}
          
            onChange={(e) => setCardLink(e.target.value)}
            placeholder="Enter video/audio link"
            />
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
            ) : (
            <>
            <h4>{card.name}</h4>
            <a href={card.link}>{card.link}</a>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            </>
            )}
            </div>
            );
            }
            
            export default DeleteEditCard;