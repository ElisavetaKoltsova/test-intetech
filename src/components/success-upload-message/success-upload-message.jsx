const SuccessUploadMessage = (file) => {
  return (
    <>
      <h1>Файл успешно загружен</h1>
      <div className="file-info">
        <span>name: {file.name}</span>
        <span>filename: {file.type}</span>
        <span>timestamp: {file.date}</span>
        <span>message: success</span>
      </div>
      
    </>
  );
};

export default SuccessUploadMessage;
