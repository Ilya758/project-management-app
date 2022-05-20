export type DialogProps = {
  open: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  handleOk: () => void;
};
