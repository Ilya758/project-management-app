import axios from 'axios';
import { useState, useEffect, FC, SyntheticEvent } from 'react';
import { PATH } from '../../constants/path';
import { IBoard } from '../../models/boards';
import { Modal, IProps } from '../ConfirmationModal/ConfirmationModal';
import { Box, Button, TextField } from '@mui/material';
import './MainPage.scss';
import { useNavigate } from 'react-router-dom';

const MainPage: FC<IProps> = ({ openModal }) => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getBoardUpdate();
  }, []);

  const getBoardUpdate = () => {
    axios.get(PATH.BOARDS).then((response) => {
      setBoards(response.data);
    });
  };

  const handleOnChangeBoard = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value as string);
  };

  const deleteBoard = (id: string, event: SyntheticEvent) => {
    event.stopPropagation();
    openModal(() => {
      axios.delete(PATH.DELETE_BOARD(id)).then(getBoardUpdate);
    });
  };

  const onBoardOpen = (id: string) => {
    navigate(`/boards/${id}`);
  };

  const boardSubmit = () => {
    axios.post(PATH.BOARDS, { title }).then(() => {
      getBoardUpdate();
      setTitle('');
    });
  };
  return (
    <div className="wrapper-component">
      <div className="create-board-component">
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Create Your New Board"
            autoFocus
            value={title}
            onChange={handleOnChangeBoard}
          />
        </Box>
        <Button type="submit" className="hover" onClick={boardSubmit}>
          CREATE
        </Button>
      </div>
      <div className="wrapper-boards">
        {boards.map((board) => (
          <div key={board.id} className="board-card" onClick={() => onBoardOpen(board.id)}>
            <div className="card-title-container">
              <h3 className="title">{board.title}</h3>
              <button
                onClick={(event) => deleteBoard(board.id, event)}
                className="board-card-button"
              ></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal(MainPage);
