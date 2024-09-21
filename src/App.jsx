import React, { useState } from 'react';
import { Button, IconButton, TextField, Box } from '@mui/material';
import './App.css';
import myImage from './assets/1.png';  // Importing the image from src/assets

function App() {
  const [activeOption, setActiveOption] = useState(null); // Tracks which screen is active
  const [rightPaneTitle, setRightPaneTitle] = useState('Welcome to our form');
  const [rightPaneDescription, setRightPaneDescription] = useState('This is a description of the form');
  const [image, setImage] = useState(myImage); // Store the default image from folder
  const [alignment, setAlignment] = useState('left'); // Alignment state for image and text
  const [email, setEmail] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  // Function to handle alignment change
  const handleAlignmentChange = () => {
    setAlignment(alignment === 'left' ? 'right' : 'left');
  };

  const handleEmailOptionClick = () => {
    setActiveOption('enterEmail');
    setRightPaneTitle('Enter your email');
    setRightPaneDescription('This will be used to contact you for the next steps.');
  };

  // Email validation function
  const validateEmail = () => {
    if (!email.includes('@') || !email.includes('.')) {
      alert('Email is missing @ or .');
    }
  };

  const handleClose = () => {
    setActiveOption(null);
    setRightPaneTitle('Welcome to our form');
    setRightPaneDescription('This is a description of the form');
    setImage(myImage);  // Reset to default image when switching back
  };

  return (
    <div className="App">
      <div className="container">
        <div className="left-panel">
          {activeOption === 'welcomeScreen' && (
            <div>
              <div className="settings-header">
                <h2 style={{ float: 'left' }}>Settings</h2>
                <IconButton onClick={handleClose} style={{ float: 'right' }}>X</IconButton>
              </div>
              <h3>Title</h3>
              <TextField
                fullWidth
                variant="outlined"
                value={rightPaneTitle}
                onChange={(e) => setRightPaneTitle(e.target.value)}
              />
              <h3>Description</h3>
              <TextField
                fullWidth
                variant="outlined"
                value={rightPaneDescription}
                onChange={(e) => setRightPaneDescription(e.target.value)}
              />
              <h3>Upload Image</h3>
              <Button variant="contained" component="label">
                Upload
                <input type="file" hidden onChange={handleImageUpload} />
              </Button>
              {image && (
                <div>
                  <h4>Preview</h4>
                  <img 
                    src={image} 
                    alt="Preview" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '1rem' }} 
                  />
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleRemoveImage} 
                    style={{ display: 'flex', marginTop: '1rem'}}
                  >
                    Remove Image
                  </Button>
                </div>
              )}
              <h3>Image Alignment</h3>
              <Button variant="outlined" onClick={handleAlignmentChange}>
                Align {alignment === 'left' ? 'Right' : 'Left'}
              </Button>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary">
                  Save
                </Button>
                <Button variant="outlined" color="secondary">
                  Discard
                </Button>
              </div>
            </div>
          )}

          {activeOption === 'enterEmail' && (
            <div>
              <div className="settings-header">
                <h2 style={{ float: 'left' }}>Settings</h2>
                <IconButton onClick={handleClose} style={{ float: 'right' }}>X</IconButton>
              </div>
              <h3>Title</h3>
              <TextField
                fullWidth
                variant="outlined"
                value={rightPaneTitle}
                onChange={(e) => setRightPaneTitle(e.target.value)}
              />
              <h3>Description</h3>
              <TextField
                fullWidth
                variant="outlined"
                value={rightPaneDescription}
                onChange={(e) => setRightPaneDescription(e.target.value)}
              />
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary">
                  Save
                </Button>
                <Button variant="outlined" color="secondary">
                  Discard
                </Button>
              </div>
            </div>
          )}

          {/* Default Options List */}
          {!activeOption && (
            <div>
              <h2>Steps</h2>
              <p>Click on a step to configure it:</p>
              <ul>
                <li onClick={() => setActiveOption('welcomeScreen')}>Welcome Screen</li>
                <li onClick={() => setActiveOption('enterEmail')}>Enter Your Name</li>
                <li onClick={handleEmailOptionClick}>Enter Your Email</li>
              </ul>
              <Button variant="contained" style={{ marginTop: '1rem' }}>
                Add Fields
              </Button>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>
                  Save and Publish
                </Button>
                <Button variant="outlined" style={{ backgroundColor: 'white', color: 'red', borderColor: 'red'}}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <Box
            sx={{
              display: 'flex',
              flexDirection: alignment === 'left' ? 'row' : 'row-reverse',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h2>{rightPaneTitle}</h2>
              <p>{rightPaneDescription}</p>
              {activeOption === 'enterEmail' && (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail} // Validate email when the field loses focus
                />
              )}
            </div>
            {image && (
              <img
                src={image}
                alt="Right Pane"
                style={{ width: '50%', height: 'auto', objectFit: 'contain', marginLeft: '1rem' }}
              />
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default App;
