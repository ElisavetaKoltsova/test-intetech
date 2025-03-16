import { useState } from 'react';
import './App.css'
import FileUpload from './components/file-upload/file-upload'
import { ClipLoader } from 'react-spinners';

const App = () => {
  // Состояение для управления размером окна
  // и выбора класса в зависимости от успеха или ошибки
  const [uploadState, setUploadState] = useState('');

  return (
    <div className={`app-container ${uploadState}`}>
      {uploadState === 'disabled' && (
        <div className="overlay">
          <ClipLoader color="rgba(240, 92, 92, 1)" size={40} />
        </div>
      )}
      <FileUpload
        onUploadSuccess={() => setUploadState('success')} 
        onUploadError={() => setUploadState('error')}
        onBlock={() => setUploadState('disabled')}
        onReset={() => setUploadState('')}
      />
    </div>
  );
};

export default App;
