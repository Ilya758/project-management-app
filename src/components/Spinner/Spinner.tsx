import { CircularProgress } from '@mui/material';
import './Spinner.scss';

export const Spinner = () => {
  return (
    <div className="spinner-container">
      <CircularProgress color="secondary" />
    </div>
  );
};
