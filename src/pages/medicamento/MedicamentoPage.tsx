import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import httpRequest from '../../service/httpRequest'
import { Box, CircularProgress, Container, IconButton, Pagination, Typography, Stack, TextField, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import ForwardIcon from '@mui/icons-material/Forward';
import SearchIcon from '@mui/icons-material/Search';

type Props = {};

type Farmaco = {
  id: number,
  nome: string
}

const MedicamentoPage = (props: Props) => {

  const [farmacos, setFarmacos] = useState(Array<Farmaco>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(undefined)
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpRequest.get(`/farmaco?page=${page}&search=${search}`);
        setTotalPages(response.data.totalPages)
        setFarmacos(response.data.farmacos);

      } catch (error) {
        const err = error as AxiosError
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(page);
  };



  return (
    <Container maxWidth="xl">
      <Box component="section"
        sx={{
          mt: 12,
          flexDirection: 'row'
        }}>
        <Grid container spacing={2}>
          <Grid xs={10}>
            <Typography variant="h3" sx={{
              fontWeight: 500
            }}>Medicamentos</Typography>
          </Grid>
        </Grid>
      </Box>

      <Container maxWidth="md">
        <Box sx={{
          mt: 6,
        }}>

          <Box sx={{
            mt: 8,
            mb: 4,
            flexDirection: 'row'
          }}>
            <TextField
              id="input-with-icon-textfield"
              label="Pesquisar Fármaco"
              onChange={(event) => setSearch(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth
            />
          </Box>

          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={500}>Selecione um fármaco para acessar seus respectivos medicamentos:</Typography>
            {farmacos.map((farmaco, index) => (
              <Box component="a" sx={{ textDecoration: "none" }} href={`medicamento/${farmaco.id}`} key={index}>
                <Grid container sx={{ backgroundColor: "#1976d2", p: 1, borderRadius: 3, alignItems: "center" }}>
                  <Grid xs={11}><Typography variant='button' fontSize={16} color="#fff">{farmaco.nome}</Typography></Grid>
                  <Grid xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <IconButton aria-label="delete" size="small">
                      <ForwardIcon fontSize="medium" sx={{ color: "#fff" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Stack>
        </Box>

        <Grid container sx={{ mt: 5, justifyContent: "center" }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </Grid>
      </Container>
    </Container >
  );
};

export default MedicamentoPage;
