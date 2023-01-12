import React, { useContext, useState, useEffect } from 'react';
import BucketContext from '../BucketContext';
import axios from 'axios';
import DeleteEditCard from './DeleteEditCard';
import MoveCards from './MoveCards';
import Modal from './Modal';
const ShowAllCards = () => {
    const { selectedBucket } = useContext(BucketContext); 
    const [cards, setCards] = useState([]); 

    useEffect(() => {
        const fetchCards = async () => {
            try {
                if (selectedBucket) {
                    const response = await axios.get(`http://localhost:3000/cards`);
                    setCards(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCards();
    }, [selectedBucket]);
    const handleCardMove = (updatedCard) => {
        setCards(cards.map(card => card.id === updatedCard.id ? updatedCard : card));
      }
    return (
        <div className='card-list'>
             <h2>{ selectedBucket.name}</h2>
        {cards.filter(card => card.bucketId === selectedBucket.id).map(card => (
        <div key={card.id} className='card-container'>
       
      
        <DeleteEditCard card={card}/>
        <MoveCards card={card} handleCardMove={handleCardMove}  />
        <Modal card={card}/>
        </div>
        ))}
        </div>
        );
        
}

export default ShowAllCards;
