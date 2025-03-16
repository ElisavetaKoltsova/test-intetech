import { CSSTransition } from "react-transition-group";
import { PurplePlusIcon } from "../icons/plus-icon";
import FileUploadIcon from '../icons/file-upload-icon';

const FileUploadProgress = ({nodeLoadingRef, nodeLoadingEndRef, isUploading, isUploadingEnd, fileName, progress, onClick}) => {
  return (
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
        <div className="purple-plus-icon-conainer" onClick={onClick}>
          <PurplePlusIcon />
        </div>
      </div>
    </CSSTransition>
  );
};

export default FileUploadProgress;
