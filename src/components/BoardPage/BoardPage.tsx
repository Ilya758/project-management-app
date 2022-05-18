import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { BoardInfo } from '../../common/common.types';
import boardsService from '../../services/services.boards';
import Column from './Column/Column';
import { useParams, useNavigate } from 'react-router-dom';
import './BoardPage.scss';
import AddIcon from '@mui/icons-material/Add';

const BoardPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardInfo>();
  const [error, setError] = useState('');

  const handleCreateColumn = () => {
    navigate(`/boards/${boardId}/columns`);
  };

  useEffect(() => {
    async function getBoard(boardId: string) {
      try {
        const result = await boardsService.getBoard(boardId);
        setBoard(result);
      } catch (error) {
        setError((error as { message: string }).message);
      }
    }

    if (boardId) {
      getBoard(boardId);
    } else {
      setError('Parameter Id is required.');
    }
  }, [boardId]);

  return (
    <>
      {board && (
        <div className="board">
          <div className="board__header">
            <div className="board__title">{board.title}</div>
            <div className="board__add-column">
              <AddIcon onClick={handleCreateColumn} color="success" />
            </div>
          </div>
          <div className="board__container">
            {board.columns
              .sort((a, b) => a.order - b.order)
              .map((column) => (
                <Column key={column.id} column={column} boardId={board.id} />
              ))}
          </div>
        </div>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default BoardPage;
