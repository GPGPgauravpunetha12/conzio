import React, { useState } from 'react';
import axios from 'axios';
function CreateBucket() {
    const [bucketName, setBucketName] = useState('');
  
    const handleCreateBucket = async () => {
      try {
        const response = await axios.post('http://localhost:3000/buckets', {
          name: bucketName
        });
        console.log(response);
        setBucketName('');
      } catch (err) {
        console.error(err);
      }
    }
  
    return (
      <div>
        <input
          type="text"
          value={bucketName}
          onChange={e => setBucketName(e.target.value)}
          placeholder="Enter bucket name"
        />
        <button onClick={handleCreateBucket}>Create Bucket</button>
      </div>
    );
  }
  export default CreateBucket;