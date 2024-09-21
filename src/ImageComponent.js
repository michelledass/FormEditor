import React from 'react';
import myImage from '../assets/1.png'; // Importing from assets folder

function ImageComponent() {
  return (
    <div>
      <h3>Image from Folder</h3>
      <img
        src={myImage}
        alt="Folder Image"
        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
      />
    </div>
  );
}

export default ImageComponent;
