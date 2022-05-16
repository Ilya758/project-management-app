import React, { useEffect, useState } from 'react';
import { Container, Alert, Typography, Box } from '@mui/material';
import { BoardInfo } from '../../common/common.types';
import boardsService from '../../services/services.boards';
import Column from './Column/Column';
import { useParams } from 'react-router-dom';

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
        <Container
          maxWidth={false}
          sx={{
            heigth: 'auto',
            pt: 1,
            pb: 1,
          }}
        >
          <Box
            sx={{
              mt: 1,
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3" component="h3">
              {board.title}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              mb: 2,
              display: 'flex',
              gap: 4,
            }}
          >
            {board.columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </Box>
        </Container>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default BoardPage;
