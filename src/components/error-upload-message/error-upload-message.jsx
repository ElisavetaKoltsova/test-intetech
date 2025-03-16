const ErrorUploadMessage = (error) => {
  return (
    <>
      <h1>Файл успешно загружен</h1>
      <div className="file-info">
        {error}
      </div>
    </>
  );
};

export default ErrorUploadMessage;
