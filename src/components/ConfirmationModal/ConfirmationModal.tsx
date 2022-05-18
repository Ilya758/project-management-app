import { useState, FC } from 'react';
import { ModalComponent } from './ModalComponent';
import '../ConfirmationModal/ConfirmationModal.scss';

export interface IProps {
  openModal: (func: () => void) => void;
  closeModal: () => void;
}

export const Modal = (ChildComponent: FC<IProps>) => {
  const ModalWindow = () => {
    const [open, setOpen] = useState(false);
    const [applyFunc, setApplyFunc] = useState<() => void>(() => {});

    const openModal = (func: () => void) => {
      setOpen(true);
      setApplyFunc(() => func);
    };

    const closeModal = () => {
      setOpen(false);
    };

    return (
      <>
        {open && <ModalComponent modalClose={closeModal} applyFunc={applyFunc} />}
        <ChildComponent openModal={openModal} closeModal={closeModal} />
      </>
    );
  };
  return ModalWindow;
};
