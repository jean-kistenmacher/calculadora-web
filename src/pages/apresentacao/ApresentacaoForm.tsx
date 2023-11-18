import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import httpRequest from '../../service/httpRequest'
import { Box, Button, CircularProgress, Container, IconButton, Pagination, Typography, Stack, TextField, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

type Props = {};

type Medicamento = {
  id: number,
  nome: string
}

type Farmaco = {
  id: number | null,
  nome: string
}

const MedicamentoFormPage = (props: Props) => {

  const [medicamentos, setMedicamentos] = useState(Array<Medicamento>);
  const [farmaco, setFarmaco] = useState<Farmaco>({ id: null, nome: "" })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { idFarmaco } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {

        const [resFarmaco, resMedicamentos] = await Promise.all([
          httpRequest.get(`/farmaco/${idFarmaco}`),
          httpRequest.get(`/medicamento`),
        ])

        setFarmaco(resFarmaco.data)
        setMedicamentos(resMedicamentos.data);

      } catch (error) {
        const err = error as AxiosError
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idFarmaco]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAdd = () => {
    Swal.fire({
      title: "Informe a Medicamento",
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

        await httpRequest.post('/medicamento', { nome })
          .then(async response => {
            const resData = await httpRequest.get(`/medicamento`);
            setMedicamentos(resData.data.medicamentos);
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

  const handleEdit = (medicamento: Medicamento) => {
    const inputValue = medicamento.nome;
    Swal.fire({
      title: "Atualizar Medicamento",
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

        await httpRequest.put(`/medicamento/${medicamento.id}`, { nome })
          .then(response => {
            const { data } = response;
            return data;
          })
          .catch(error => {
            Swal.showValidationMessage(` Erro ao cadastrar: ${error}`);
            return;
          });
        const response = await httpRequest.get(`/medicamento`);
        setMedicamentos(response.data);
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

  const handleDelete = (medicamento: Medicamento) => {
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
        await httpRequest.delete(`/medicamento/${medicamento.id}`)
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
              text: `Medicamento ${data.nome} removida.`,
              icon: "success"
            });
            const resData = await httpRequest.get(`/medicamento`);
            setMedicamentos(resData.data.medicamentos);
          }).catch(error => {
            Swal.showValidationMessage(`Erro ao deletar: ${error}`);
            return;
          });
      }
    });
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
            }}>Apresentações</Typography>
          </Grid>
          <Grid xs={2}>
            <Button onClick={handleAdd} variant="contained" sx={{ p: 2, fontSize: 15 }} startIcon={<AddIcon />}>Adicionar</Button>
          </Grid>
        </Grid>
        <Typography variant="h4" sx={{
          fontWeight: 400
        }} >Medicamento {farmaco.nome}</Typography>

      </Box>

      <Container maxWidth="md">
        <Box sx={{
          mt: 6,
        }}>

          <Box sx={{
            mt: 8,
            mb: 4,
            flexDirection: 'column'
          }}>

          </Box>

          <Stack spacing={2}>
            {medicamentos.map((medicamento, index) => (
              <Box key={index}>
                <Grid container sx={{ backgroundColor: "#1976d2", p: 1, borderRadius: 3, alignItems: "center" }}>
                  {/* <Grid xs={10}><Typography variant='button' fontSize={16} color="#fff">{medicamento.nome}</Typography></Grid>
                  <Grid xs={1}>
                    <IconButton aria-label="delete" size="small" onClick={() => { handleEdit(medicamento) }}>
                      <EditIcon fontSize="medium" sx={{ color: "#fff" }} />
                    </IconButton>
                  </Grid>
                  <Grid xs={1}>
                    <IconButton aria-label="delete" size="small" onClick={() => { handleDelete(medicamento) }}>
                      <DeleteIcon fontSize="medium" sx={{ color: "#fff" }} />
                    </IconButton>
                  </Grid> */}
                </Grid>
              </Box>
            ))}
          </Stack>
        </Box>

        <Grid container sx={{ mt: 5, justifyContent: "center" }}>
        </Grid>
      </Container>
    </Container >
  );
};

export default MedicamentoFormPage;
