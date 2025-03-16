const ErrorUploadMessage = ({error}) => {
  return (
    <>
      <h1>Ошибка в загрузке файла </h1>
      <div className="file-error-info">
        <span>Error: {error.message}</span>
      </div>
    </>
  );
};

export default ErrorUploadMessage;
