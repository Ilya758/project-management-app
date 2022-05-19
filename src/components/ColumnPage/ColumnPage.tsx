import { Alert, Box, Button, Card, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnInfo } from '../../common/common.types';
import columnsService from '../../services/services.columns';
import './ColumnPage.scss';

const ColumnPage = () => {
  const { boardId, columnId } = useParams();
  const navigate = useNavigate();

  const [column, setColumn] = useState<ColumnInfo>(
    (columnId ? {} : { title: 'New column', order: 1 }) as ColumnInfo
  );

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (boardId) {
      if (columnId) {
        try {
          await columnsService.updateColumn(boardId, columnId, column);
          navigate(-1);
        } catch (error) {
          setError((error as { message: string }).message);
        }
      } else {
        try {
          await columnsService.createColumn(boardId, column);
          navigate(-1);
        } catch (error) {
          setError((error as { message: string }).message);
        }
      }
    }
  };

  useEffect(() => {
    async function getColumn(boardId: string, columnId: string) {
      try {
        const result = await columnsService.getColumn(boardId, columnId);
        setColumn(result);
      } catch (error) {
        setError((error as { message: string }).message);
      }
    }

    if (columnId) {
      if (boardId) {
        getColumn(boardId, columnId);
      } else {
        setError('Parameters is not correct.');
      }
    }
  }, [boardId, columnId]);

  return (
    <>
      <div className="columnPage">
        <Container maxWidth="xs">
          <div className="columnPage__header">Column</div>
          <Card>
            <div className="columnPage__container">
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', m: 2 }}
              >
                <TextField
                  margin="normal"
                  required
                  label="Title"
                  autoFocus
                  value={column.title}
                  onChange={(e) => {
                    setColumn({ ...column, title: e.currentTarget.value });
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  label="Order"
                  value={column.order}
                  onChange={(e) => {
                    const order = Number.parseInt(e.currentTarget.value);
                    if (!Number.isNaN(order)) {
                      setColumn({ ...column, order });
                    }
                  }}
                />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {columnId ? 'Save' : 'Create'}
                </Button>
              </Box>
            </div>
          </Card>
        </Container>
        <div className="columnPage__footer">{error && <Alert severity="error">{error}</Alert>}</div>
      </div>
    </>
  );
};

export default ColumnPage;
