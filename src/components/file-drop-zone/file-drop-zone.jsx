const FileDropZone = ({dragOver, onDragOver, onDragLeave, onDrop, inputFileRef, onChange, isLoader, errorValidationMessage, isUploading, isUploadingEnd}) => {
  return (
    <>
    {
      !isLoader && (
        <div
          className={`upload-box ${dragOver ? "drag-over" : ""}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <label htmlFor="file-input">
            <img src="/docs.png" alt="Перенесите ваш файл в область ниже" className="icon" />
            <p>Перенесите ваш файл<br></br>в область ниже</p>
          </label>
          <input
            ref={inputFileRef}
            className="file-upload-input"
            id="file-input"
            type="file"
            accept=".txt,.json,.csv"
            onChange={onChange}
            disabled={isLoader || isUploading || isUploadingEnd}
          />
          {errorValidationMessage && errorValidationMessage.type === 'type' && <span className="error-message">{errorValidationMessage.message}</span>}
        </div>
      )
    }
    
    </>
  );
};

export default FileDropZone;
