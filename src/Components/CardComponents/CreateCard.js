import React,{useState,useContext} from 'react'
import axios from 'axios';
import BucketContext from '../BucketContext';

function CreateCard() {


const { selectedBucket } = useContext(BucketContext);
const [cardName, setCardName] = useState('');
const [cardLink, setCardLink] = useState('');
const [cards, setCards] = useState([]);



const handleCardSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post(`http://localhost:3000/cards`, { name: cardName, link: cardLink,bucketId: selectedBucket.id });
      setCards([...cards, response.data]);
  } catch (err) {
      console.log(err);
  }
  setCardName('');
  setCardLink('');
  const interval = setInterval(handleCardSubmit, 5000);
  return () => clearInterval(interval);
}

  
  return (
    <div>
   <form onSubmit={handleCardSubmit}>
    <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Enter card name" />
    <input type="text" value={cardLink} onChange={e => setCardLink(e.target.value)} placeholder="Enter video/audio link" />
    <button type="submit">Add Card</button>
  </form>

  </div>
  )
}

export default CreateCard;