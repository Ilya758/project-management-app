import axios from 'axios';
import { useState, useEffect } from 'react';
import { PATH } from '../../constants/path';
import { IBoard } from '../../models/boards';
import './MainPage.scss';

const MainPage = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getBoardUpdate();
  }, []);

  const getBoardUpdate = () => {
    axios.get(PATH.BOARDS).then((response) => {
      setBoards(response.data);
    });
  };

  const handleOnChangeBoard = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value as string);
  };

  const deleteBoard = (id: string) => {
    axios.delete(PATH.DELETE_BOARD(id)).then(getBoardUpdate);
  };

  const boardSubmit = () => {
    axios.post(PATH.BOARDS, { title }).then(() => {
      getBoardUpdate();
      setTitle('');
    });
  };
  return (
    <div className="wrapper-component">
      <input
        type="text"
        value={title}
        onChange={handleOnChangeBoard}
        placeholder="Enter title Your board"
      />
      <button onClick={boardSubmit}>CREATE</button>
      {boards.map((board) => (
        <div key={board.id} className="board-card">
          {board.title}
          <button onClick={() => deleteBoard(board.id)} className="board-card-button"></button>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
