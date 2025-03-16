import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import './file-upload.styles.css';
import fileUploadStyles from "./file-upload.shadow.css?inline";
import { CSSTransition } from "react-transition-group";
import {PlusIcon} from '../icons/plus-icon';
import SuccessUploadMessage from "../success-upload-message/success-upload-message";
import ErrorUploadMessage from "../error-upload-message/error-upload-message";
import { uploadFile } from "../../services/uploadFile";
import { allowedFormats } from "../../consts";
import FileInput from "../file-input/file-input";
import FileDropZone from "../file-drop-zone/file-drop-zone";
import FileUploadProgress from "../file-upload-progress/file-upload-progress";

const FileUpload = ({ onUploadSuccess, onUploadError, onReset, onBlock }) => {
  const shadowHostRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);
  const inputFileNameRef = useRef(null);
  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingEnd, setIsUploadingEnd] = useState(false);
  const [isUploadedToServer, setIsUploadedToServer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [errorValidationMessage, setErrorValidationMessage] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  const nodeInputRef = useRef(null);
  const nodeLoadingRef = useRef(null);
  const nodeLoadingEndRef = useRef(null);
  const nodeSuccessMessageRef = useRef(null);
  const nodeErrorMessageRef = useRef(null);

  useEffect(() => {
    if (shadowHostRef.current && !shadowHostRef.current.shadowRoot) {
      const shadow = shadowHostRef.current.attachShadow({ mode: "open" });

      const style = document.createElement("style");
      style.textContent = fileUploadStyles; 

      shadow.appendChild(style);
      setShadowRoot(shadow);
    }
  }, [shadowRoot]);

  const loadFile = () => {
    setIsUploading(true);
    setProgress(0);

    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploadingEnd(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const uploadingFile = (newFile) => {
    if (newFile) {
      const fileExtension = newFile.name.slice(newFile.name.lastIndexOf('.')).toLowerCase();

      if (!allowedFormats.includes(fileExtension)) {
        setErrorValidationMessage({message: 'Допустимые форматы: .txt, .json, .csv', type: 'type'});

        // Очистка инпута
        if (inputFileRef.current) {
          inputFileRef.current.value = '';
        }

        return;
      }

      if (!inputFileNameRef.current.value) {
        setErrorValidationMessage({message: 'Введите название файла', type: 'name'});
        // Очистка инпута
        if (inputFileRef.current) {
          inputFileRef.current.value = '';
        }
      } else {
        setErrorValidationMessage(null);
        setFile(newFile);
        setFileName(inputFileNameRef.current.value);
        loadFile();
      }
    }
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    uploadingFile(newFile);
  };

  const handleRename = (newName) => {
    setErrorValidationMessage(null);
    setFile(newName);
    setFileName(newName.name);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const newFile = event.dataTransfer.files[0];

    uploadingFile(newFile);
  };

  const handleSend = async () => {
    if (!file || !fileName) {
      onUploadError();
      return;
    }

    setIsLoader(true);
    onBlock();

    try {
      const data = await uploadFile(file, fileName);
      setResponse(data);
      onUploadSuccess();
      setIsUploadedToServer(true);
    } catch (error) {
      onUploadError();
      setError(error);
      setIsUploadedToServer(false);
    }
    setIsLoader(false);
  };

  const handleResetClickButton = () => {
    if (!isLoader) {
      // Очистка инпута
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }

      if (isUploadedToServer || error !== null) {
        setShadowRoot(null);
      }

      onReset();
      setIsUploadedToServer(false);
      setIsUploading(false);
      setIsUploadingEnd(false);
      setError(null);
      setErrorValidationMessage(null);
      setResponse({});
      setFile(null);
      setFileName('');
      setProgress(0);
    }
  };

  const handleClearFileNameInputClick = () => {
    setFileName('');
    if (inputFileNameRef.current.value) {
      inputFileNameRef.current.value = '';
    }
  };

  return (
    <>
      <div className='plus-icon-container'>
        <div className='plus-icon' onClick={handleResetClickButton} disabled={isLoader}>
          <PlusIcon />
        </div>
      </div>

      {
        (!isUploadedToServer && error === null) || isLoader ?
        (
          <><h1>Загрузочное окно</h1><h2>Перед загрузкой дайте имя файлу</h2><div ref={shadowHostRef} className="file-upload-container">

              {shadowRoot &&
                createPortal(
                  <>
                    <FileInput
                      nodeInputRef={nodeInputRef}
                      isUploading={isUploading}
                      inputFileNameRef={inputFileNameRef}
                      onInput={(e) => handleRename(e.target.value)}
                      isLoader={isLoader}
                      isUploadingEnd={isUploadingEnd}
                      errorValidationMessage={errorValidationMessage}
                      onClick={handleClearFileNameInputClick}
                    />

                    <FileDropZone
                      dragOver={dragOver}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      inputFileRef={inputFileRef}
                      onChange={handleFileChange}
                      isLoader={isLoader}
                      errorValidationMessage={errorValidationMessage}
                    />

                    <FileUploadProgress
                      nodeLoadingRef={nodeLoadingRef}
                      nodeLoadingEndRef={nodeLoadingEndRef}
                      isUploading={isUploading}
                      isUploadingEnd={isUploadingEnd}
                      fileName={fileName}
                      progress={progress}
                      onClick={handleResetClickButton}
                    />

                    <button
                      onClick={handleSend}
                      className={`upload-button${isUploadingEnd ? '-active' : ''}`}
                      disabled={!isUploadingEnd || isLoader}
                    >
                      Загрузить
                    </button>
                  </>,

                  shadowRoot
                )}
            </div></>
        ) : ''
      }
      
      <CSSTransition
        nodeRef={nodeSuccessMessageRef}
        in={isUploadedToServer && !error}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div ref={nodeSuccessMessageRef} className="success-message-container">
          <SuccessUploadMessage response={response} />
        </div>
      </CSSTransition>

      <CSSTransition
        in={error !== null}
        timeout={500}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeErrorMessageRef}
      >
        <div ref={nodeErrorMessageRef} className="error-message-container">
          <ErrorUploadMessage error={error !== null ? error : {message: ''}} />
        </div>
      </CSSTransition>
    </>
  );
};

export default FileUpload;
