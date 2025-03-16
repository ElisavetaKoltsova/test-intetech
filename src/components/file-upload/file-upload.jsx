import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import './file-upload.styles.css';
import fileUploadStyles from "./file-upload.shadow.css?inline";
import { GrayPlusIcon, PurplePlusIcon } from "../icons/plus-icon";
import FileUploadIcon from "../icons/file-upload-icon";
import { CSSTransition } from "react-transition-group";
import {PlusIcon} from '../icons/plus-icon';
import SuccessUploadMessage from "../success-upload-message/success-upload-message";
import ErrorUploadMessage from "../error-upload-message/error-upload-message";

const FileUpload = ({ onUploadSuccess, onUploadError, onReset }) => {
  const shadowHostRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingEnd, setIsUploadingEnd] = useState(false);
  const [isUploadedToServer, setIsUploadedToServer] = useState(false);
  const [progress, setProgress] = useState(0);

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
  }, []);

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

    console.log("Готоый файл:", { file, name: fileName });
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
      setFileName(newFile.name);
    }

    loadFile();
  };

  const handleRename = (newName) => {
    setFile(newName);
    setFileName(newName.name);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const newFile = event.dataTransfer.files[0];
    if (newFile) {
      setFile(newFile);
      setFileName(newFile.name);
    }

    loadFile();
  };

  const handleSend = () => {
    if (!file) {
      console.log("Сначала загрузите файл!");
      onUploadError();
      return;
    }
    
    setIsUploadedToServer(true);
    onUploadSuccess();
  };

  return (
    <>
      <div className='plus-icon-container'>
        <div className='plus-icon'>
          <PlusIcon />
        </div>
      </div>

      {
        !isUploadedToServer ?
        (
          <><h1>Загрузочное окно</h1><h2>Перед загрузкой дайте имя файлу</h2><div ref={shadowHostRef} className="file-upload-container">

              {shadowRoot &&
                createPortal(
                  <>
                    <CSSTransition
                      nodeRef={nodeInputRef}
                      in={!isUploading}
                      timeout={300}
                      classNames="fade"
                      unmountOnExit
                    >
                      <div ref={nodeInputRef} className={`rename-input-container ${!isUploading ? "fade-enter-active" : "fade-exit-active"}`}>
                        <input
                          className="rename-input"
                          type="text"
                          placeholder="Название файла"
                          value={fileName}
                          onInput={(e) => handleRename(e.target.value)} />
                        <div className="gray-plus-icon-container">
                          <GrayPlusIcon />
                        </div>
                      </div>
                    </CSSTransition>

                    <div
                      className={`upload-box ${dragOver ? "drag-over" : ""}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      } }
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                    >
                      <label htmlFor="file-input">
                        <img src="/docs.png" alt="Перенесите ваш файл в область ниже" className="icon" />
                        <p>Перенесите ваш файл<br></br>в область ниже</p>
                      </label>
                      <input
                        className="file-upload-input"
                        id="file-input"
                        type="file"
                        accept=".txt,.json,.csv"
                        onChange={handleFileChange} />
                    </div>

                    <CSSTransition
                      nodeRef={nodeLoadingRef}
                      in={isUploading}
                      timeout={500}
                      classNames="fade"
                      unmountOnExit
                    >
                      <div ref={nodeLoadingRef} className="loading-container">
                        <div>
                          <FileUploadIcon />
                        </div>
                        <div className="file-upload-name-and-loader-container">
                          {!isUploadingEnd ? (
                            <><div className="file-upload-name">
                              <span>
                                {fileName}
                              </span>
                              <span>
                                {progress}%
                              </span>
                            </div>
                              <div className="loader-container">
                                <hr className="loader" style={{ width: `${progress}%` }} />
                              </div></>
                          ) : ''}
                          <CSSTransition
                            nodeRef={nodeLoadingEndRef}
                            in={isUploadingEnd}
                            timeout={500}
                            classNames="fade"
                            unmountOnExit
                          >
                            <div ref={nodeLoadingEndRef} className="file-upload-end-name">
                              <span>
                                {fileName}
                              </span>
                              <span className="percent">
                                100%
                              </span>
                            </div>
                          </CSSTransition>
                        </div>
                        <div>
                          <PurplePlusIcon />
                        </div>
                      </div>
                    </CSSTransition>

                    <button onClick={handleSend} className={`upload-button${isUploadingEnd ? '-active' : ''}`} disabled={!isUploadingEnd}>Загрузить</button>
                  </>,

                  shadowRoot
                )}
            </div></>
        ) : ''
      }
      
      <CSSTransition
        nodeRef={nodeSuccessMessageRef}
        in={isUploadedToServer}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div ref={nodeSuccessMessageRef} className="success-message-container">
          <SuccessUploadMessage file={file} />
        </div>
      </CSSTransition>

      {/* <CSSTransition
        in={!isUploadedToServer}
        timeout={500}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeErrorMessageRef}
      >
        <div ref={nodeErrorMessageRef} className="error-message-container">
          <ErrorUploadMessage error={'error'} />
        </div>
      </CSSTransition> */}
    </>
  );
};

export default FileUpload;
