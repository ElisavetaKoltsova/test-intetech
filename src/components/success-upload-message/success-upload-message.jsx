const SuccessUploadMessage = ({response}) => {

  return (
    <>
      <h1>Файл успешно загружен</h1>
      <div className="file-info">
        <span>name: {response.name}</span> {/* только название */}
        <span>filename:</span>
        <span>
          {response.filename}
        </span>
        <span>timestamp: {response.timestamp}</span> {/* за сколько было загружено */}
        <span>message: {response.message}</span>
      </div>
    </>
  );
};

export default SuccessUploadMessage;
