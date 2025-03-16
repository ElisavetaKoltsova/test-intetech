const ErrorUploadMessage = ({error}) => {
  
  return (
    <>
      <h1>Ошибка в загрузке файла </h1>
      <div className="file-error-info">
        <span>Error: {error.message}</span>
        <span>"{error.response?.data.error ? error.response.data.error : ''}"</span>
      </div>
    </>
  );
};

export default ErrorUploadMessage;
