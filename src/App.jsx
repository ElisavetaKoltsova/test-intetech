import { useState } from 'react';
import './App.css'
import FileUpload from './components/file-upload/file-upload'

const App = () => {
  const [uploadState, setUploadState] = useState('');

  return (
    <div className={`app-container ${uploadState}`}>
      <FileUpload
        onUploadSuccess={() => setUploadState('success')} 
        onUploadError={() => setUploadState('error')} 
        onReset={() => setUploadState('')}
      />
    </div>
  );
};

export default App;
