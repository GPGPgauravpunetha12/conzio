import React, { useState, useEffect} from 'react';
import axios from 'axios';
import '../../App.css';
import CreateCard from '../CardComponents/CreateCard';
import ShowAllCards from '../CardComponents/ShowAllCards';
import BucketContext from '../BucketContext';

function BucketList() {
  const [buckets, setBuckets] = useState([]);
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {// fetch all the list of buckets from db.json
    const fetchBuckets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/buckets');
        setBuckets(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const interval = setInterval(fetchBuckets, 5000);
    return () => clearInterval(interval);
  }, []);


 

  
  const handleRename = () => {
    axios.put(`http://localhost:3000/buckets/${selectedBucket.id}`, { name: newName })
      .then(res => {
        // update the state with the updated data
        const updatedBucket = res.data
        const updatedBuckets = buckets.map(b=> b.id === updatedBucket.id ? updatedBucket : b)
        setBuckets(updatedBuckets)
      })
      .catch(err => {
        console.log(err)
      });
    setSelectedBucket(null);
    setNewName("")
  }
  

  
 
  return (

    <div className='bucket-list'>
                  <BucketContext.Provider value={{ selectedBucket, setSelectedBucket }}>
    
      <h2>Bucket List</h2>
      {buckets.map(bucket => (
        <div key={bucket.id} onClick={() => { setSelectedBucket(bucket); }}>
          <p>{bucket.name}</p>
        </div>
        
      ))}
      {selectedBucket && (
    <div   className="rename-form">
        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Enter new name" />
        <button onClick={handleRename}>Rename</button>
        <ShowAllCards/>
    </div>
)}
<CreateCard />
</BucketContext.Provider> </div>
  );
}
export default BucketList;