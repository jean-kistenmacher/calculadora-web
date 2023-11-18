import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AxiosError } from 'axios';
import httpRequest from '../../service/httpRequest'
import { Box, Button, CircularProgress, Container, IconButton, Pagination, Typography, Stack, TextField, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

type Props = {};

type Acesso = {
  id: number,
  nome: string
}

const DefaultPage = (props: Props) => {

  const [acessos, setAcessos] = useState(Array<Acesso>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(undefined)
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpRequest.get(`/acesso?page=${page}&search=${search}`);
        setTotalPages(response.data.totalPages)
        setAcessos(response.data.acessos);

      } catch (error) {
        const err = error as AxiosError
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAdd = () => {
    Swal.fire({
      title: "Informe o Acesso",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Adicionar",
      confirmButtonColor: "#00b740",
      showLoaderOnConfirm: true,
      preConfirm: async (nome) => {

        if (!nome) {
          Swal.showValidationMessage(`Informe o nome para cadastro.`);
          return
        }

        await httpRequest.post('/acesso', { nome })
          .then(async response => {
            const resData = await httpRequest.get(`/acesso?page=${page}`);
            setAcessos(resData.data.acessos);
            setTotalPages(resData.data.totalPages);
          })
          .catch(error => {
            Swal.showValidationMessage(` Erro ao cadastrar: ${error}`);
            return;
          });
      },
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire({
          title: `Salvo com Sucesso!`,
          icon: 'success'
        });
      }
    });
  }

  const handleEdit = (acesso: Acesso) => {
    const inputValue = acesso.nome;
    Swal.fire({
      title: "Atualizar Acesso",
      input: "text",
      inputValue,
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Atualizar",
      confirmButtonColor: "#00b740",
      showLoaderOnConfirm: true,
      preConfirm: async (nome) => {

        if (!nome) {
          Swal.showValidationMessage(`Informe o nome para cadastro.`);
          return
        }

        await httpRequest.put(`/acesso/${acesso.id}`, { nome })
          .then(response => {
            const { data } = response;
            return data;
          })
          .catch(error => {
            Swal.showValidationMessage(` Erro ao cadastrar: ${error}`);
            return;
          });
        const response = await httpRequest.get(`/acesso?page=${page}`);
        setAcessos(response.data.acessos);
        setTotalPages(response.data.totalPages)
      },
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire({
          title: `Salvo com Sucesso!`,
          icon: 'success'
        });
      }
    });
  }

  const handleDelete = (acesso: Acesso) => {
    Swal.fire({
      title: "Você deseja deletar o registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await httpRequest.delete(`/acesso/${acesso.id}`)
          .then(async (response) => {
            if (response.data?.error) {
              Swal.fire({
                title: "Erro!",
                text: `${response.data?.error}`,
                icon: "error"
              });
              return;
            }
            const { data } = response;
            Swal.fire({
              title: "Deletado!",
              text: `Acesso ${data.nome} removido.`,
              icon: "success"
            });
            setPage(1);
            const resData = await httpRequest.get(`/acesso?page=${page}`);
            setAcessos(resData.data.acessos);
            setTotalPages(resData.data.totalPages)
          }).catch(error => {
            Swal.showValidationMessage(`Erro ao deletar: ${error}`);
            return;
          });
      }
    });
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(page);
  };

  const handleSearch = async (event: { key: string; }) => {
    if (event.key === 'Enter') {
      console.log(search)
      try {
        const response = await httpRequest.get(`/acesso?page=${1}&search=${search}`);
        setTotalPages(response.data.totalPages)
        setAcessos(response.data.acessos);

      } catch (error) {
        const err = error as AxiosError
        setError(err.message);
      }
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    console.log(search)
  }

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
            }}>Acessos</Typography>
          </Grid>
          <Grid xs={2}>
            <Button onClick={handleAdd} variant="contained" sx={{ p: 2, fontSize: 15 }} startIcon={<AddIcon />}>Adicionar</Button>
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
              label="Pesquisar"
              onKeyDown={handleSearch}
              onChange={handleSearchChange}
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
            {acessos.map((acesso, index) => (
              <Box key={index}>
                <Grid container sx={{ backgroundColor: "#1976d2", p: 1, borderRadius: 3, alignItems: "center" }}>
                  <Grid xs={10}><Typography variant='button' fontSize={16} color="#fff">{acesso.nome}</Typography></Grid>
                  <Grid xs={1}>
                    <IconButton aria-label="delete" size="small" onClick={() => { handleEdit(acesso) }}>
                      <EditIcon fontSize="medium" sx={{ color: "#fff" }} />
                    </IconButton>
                  </Grid>
                  <Grid xs={1}>
                    <IconButton aria-label="delete" size="small" onClick={() => { handleDelete(acesso) }}>
                      <DeleteIcon fontSize="medium" sx={{ color: "#fff" }} />
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

export default DefaultPage;
