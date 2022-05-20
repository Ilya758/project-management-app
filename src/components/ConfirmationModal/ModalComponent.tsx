import { FC } from 'react';
import '../ConfirmationModal/ConfirmationModal.scss';

interface IProps {
  modalClose: () => void;
  applyFunc: () => void;
}

export const ModalComponent: FC<IProps> = ({ applyFunc, modalClose }) => {
  const apply = () => {
    applyFunc();
    modalClose();
  };

  return (
    <div className="modal-wrapper" onClick={modalClose}>
      <div className="modal-component">
        <h2>DELETE</h2>
        <div className="container-buttons">
          <span>Delete without possibillity of recovery?</span>
          <div>
            <button onClick={modalClose}>Cancel</button>
            <button onClick={apply}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
