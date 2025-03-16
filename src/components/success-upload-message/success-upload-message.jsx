const SuccessUploadMessage = ({file}) => {
  console.log(file.lastModifiedDate)
  return (
    <>
      <h1>Файл успешно загружен</h1>
      <div className="file-info">
        <span>name: {file.name}</span> {/* только название */}
        <span>filename: {file.type}</span>
        <span>timestamp: {file.date}</span> {/* за сколько было загружено */}
        <span>message: success</span>
      </div>
      
    </>
  );
};

export default SuccessUploadMessage;
