import { CSSTransition } from "react-transition-group";
import { GrayPlusIcon } from "../icons/plus-icon";

const FileInput = ({nodeInputRef, isUploading, inputFileNameRef, onInput, isLoader, isUploadingEnd, errorValidationMessage, onClick}) => {
  return (
    <CSSTransition
      nodeRef={nodeInputRef}
      in={!isUploading}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div ref={nodeInputRef} className={`rename-input-container ${!isUploading ? "fade-enter-active" : "fade-exit-active"}`}>
        <input
          ref={inputFileNameRef}
          className="rename-input"
          type="text"
          placeholder="Название файла"
          defaultValue=""
          onInput={onInput}
          disabled={isLoader || isUploadingEnd}
        />
        {errorValidationMessage && errorValidationMessage.type === 'name' && <span className="error-message">{errorValidationMessage.message}</span>}
        <div className="gray-plus-icon-container" onClick={onClick}>
          <GrayPlusIcon />
        </div>
      </div>
    </CSSTransition>
  );
};

export default FileInput;
