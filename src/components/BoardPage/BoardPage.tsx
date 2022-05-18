import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { BoardInfo } from '../../common/common.types';
import boardsService from '../../services/services.boards';
import Column from './Column/Column';
import { useParams } from 'react-router-dom';
import './BoardPage.scss';

const BoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState<BoardInfo>();
  const [error, setError] = useState('');

  useEffect(() => {
    async function getBoard(boardId: string) {
      try {
        const result = await boardsService.getBoard(boardId);
        setBoard(result);
      } catch (error) {
        setError((error as { message: string }).message);
      }
    }

    if (id) {
      getBoard(id);
    } else {
      setError('Parameter Id is required.');
    }
  }, [id]);

  return (
    <>
      {board && (
        <div className="board">
          <div className="board__header">
            <div className="board__title">{board.title}</div>
            <div className="board__btn">+</div>
          </div>
          <div className="board__container">
            {board.columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </div>
        </div>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default BoardPage;
