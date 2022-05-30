import { createRef, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Context } from '../../../common/common.context';
import {
  Alert,
  Box,
  IconButton,
  InputBase,
  LinearProgress,
  Paper,
  Popover,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import boardsService from '../../../services/services.boards';
import { BoardInfo } from '../../../common/common.types';
import { Link } from 'react-router-dom';

type SearchItem = {
  name: string;
  link: string;
};

export const SearchPage = () => {
  const { t } = useTranslation();
  const { isAuthorize } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = useState('');
  const [boards, setBoards] = useState<SearchItem[]>([]);
  const [columns, setColumns] = useState<SearchItem[]>([]);
  const [tasks, setTasks] = useState<SearchItem[]>([]);
  const [error, setError] = useState('');
  const [isWait, setIsWait] = useState(false);
  const ref = createRef<HTMLInputElement>();

  const openResult = async () => {
    if (searchText) {
      setBoards([]);
      setColumns([]);
      setTasks([]);
      setAnchorEl(anchorEl ? null : ref.current);
      setIsWait(true);
      const text = searchText.trim().toUpperCase();
      const findedBoards: SearchItem[] = [];
      const findedColumns: SearchItem[] = [];
      const findedTasks: SearchItem[] = [];
      try {
        const resultBoards = (await boardsService.getBoards()) as BoardInfo[];
        Promise.all(
          resultBoards.map(async (board) => {
            if (
              board.title.toUpperCase().includes(text) ||
              board.description.toUpperCase().includes(text)
            ) {
              findedBoards.push({
                name: board.title,
                link: `boards\\${board.id}`,
              });
            }

            const boardInfo = (await boardsService.getBoard(board.id)) as BoardInfo;
            Promise.all(
              boardInfo.columns.map(async (column) => {
                if (column.title.toUpperCase().includes(text)) {
                  findedColumns.push({
                    name: column.title,
                    link: `boards\\${board.id}`,
                  });
                }
                await column.tasks.map(async (task) => {
                  if (
                    task.title.toUpperCase().includes(text) ||
                    task.description.toUpperCase().includes(text)
                  ) {
                    findedTasks.push({
                      name: task.title,
                      link: `boards\\${board.id}`,
                    });
                  }
                });
              })
            );
          })
        ).then(() => {
          setBoards(findedBoards);
          setColumns(findedColumns);
          setTasks(findedTasks);
        });
      } catch (error) {
        setError((error as { message: string }).message);
      } finally {
        setIsWait(false);
      }
    }
  };

  const handleClick = () => {
    openResult();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key == 'Enter') {
      openResult();
    }
  };

  return (
    <>
      {isAuthorize && (
        <div className="search">
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '20vh' }}
          >
            <InputBase
              ref={ref}
              sx={{ ml: 1, flex: 1 }}
              placeholder={t('search.placeholder')}
              value={searchText}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              size="small"
            />
            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleClick}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box sx={{ width: '50vw', height: '500px', minWidth: '200px' }}>
              <Typography variant="subtitle1" sx={{ p: 0.5, borderBottom: 0.5 }}>
                {t('search.result')}
              </Typography>
              <Box sx={{ width: '100%' }}>{isWait && <LinearProgress color="secondary" />}</Box>
              {error && <Alert severity="error">{error}</Alert>}
              {boards.length > 0 && (
                <Typography variant="subtitle2" sx={{ pt: 1, pl: 1 }}>
                  {t('boards.caption')}
                </Typography>
              )}
              {boards.length > 0 &&
                boards.map((x, index) => (
                  <div key={index}>
                    <Link
                      style={{ padding: '2px 0 2px 16px', textDecoration: 'none' }}
                      to={x.link}
                      onClick={() => {
                        handleClose();
                        setSearchText('');
                      }}
                    >
                      {x.name}
                    </Link>
                  </div>
                ))}
              {columns.length > 0 && (
                <Typography variant="subtitle2" sx={{ pt: 1, pl: 1 }}>
                  {t('column.caption')}
                </Typography>
              )}
              {columns.length > 0 &&
                columns.map((x, index) => (
                  <div key={index}>
                    <Link
                      style={{ padding: '2px 0 2px 16px', textDecoration: 'none' }}
                      key={index}
                      to={x.link}
                      onClick={() => {
                        handleClose();
                        setSearchText('');
                      }}
                    >
                      {x.name}
                    </Link>
                  </div>
                ))}
              {tasks.length > 0 && (
                <Typography variant="subtitle2" sx={{ pt: 1, pl: 1 }}>
                  {t('task.caption')}
                </Typography>
              )}
              {tasks.length > 0 &&
                tasks.map((x, index) => (
                  <div key={index}>
                    {' '}
                    <Link
                      style={{ padding: '2px 0 2px 16px', textDecoration: 'none' }}
                      key={index}
                      to={x.link}
                      onClick={() => {
                        handleClose();
                        setSearchText('');
                      }}
                    >
                      {x.name}
                    </Link>
                  </div>
                ))}
            </Box>
          </Popover>
        </div>
      )}
    </>
  );
};
