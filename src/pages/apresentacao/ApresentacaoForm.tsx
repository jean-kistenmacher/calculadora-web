import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import httpRequest from '../../service/httpRequest'
import { Box, Button, CircularProgress, Checkbox, FormControlLabel, Container, IconButton, Pagination, Typography, Stack, TextField, InputAdornment, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';


type Props = {};

type Apresentacao = {
  id: number,
  id_medicamento: number,
  id_marca: number,
  id_laboratorio: number,
  qtd_apresentacao: string,
  bolsa: boolean,
  marca: {
    id: number,
    nome: string
  },
  laboratorio: {
    id: number,
    nome: string
  }
}

type Medicamento = {
  id: number | null,
  nome: string
}

type Marca = {
  id: number | null,
  nome: string
}

type Laboratorio = {
  id: number | null,
  nome: string
}

const ApresentacaoFormPage = (props: Props) => {

  const [apresentacoes, setApresentacoes] = useState(Array<Apresentacao>);
  const [medicamento, setMedicamento] = useState<Medicamento>({ id: null, nome: "" })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [marcaValue, setMarcaValue] = useState<Marca | null>(null);
  const [inputMarcaValue, setInputMarcaValue] = useState('');

  const [laboratorioValue, setLaboratorioValue] = useState<Laboratorio | null>(null);
  const [inputLaboratorioValue, setInputLaboratorioValue] = useState('');

  const [apresentacaoValue, setApresentacaoValue] = useState('');

  const [bolsaValue, setBolsaValue] = useState(false);

  const [showForm, setShowForm] = useState(false)

  const { idMedicamento } = useParams();

  const [marcas, setMarcas] = useState(Array<any>);
  const [laboratorios, setLaboratorios] = useState(Array<any>);

  const [marcaRequired, setMarcaRequired] = useState(false);
  const [laboratorioRequired, setLaboratorioRequired] = useState(false);
  const [apresentacaoRequired, setApresentacaoRequired] = useState(false);

  const [apresentacaoId, setApresentacaoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const [resMedicamento, resApresentacoes, resMarcas, resLaboratorios] = await Promise.all([
          httpRequest.get(`/medicamento/${idMedicamento}`),
          httpRequest.get(`/apresentacao?idMedicamento=${idMedicamento}`),
          httpRequest.get(`/marca/all`),
          httpRequest.get(`/laboratorio/all`)
        ])

        setMedicamento(resMedicamento.data)
        setApresentacoes(resApresentacoes.data);

        setMarcas(resMarcas.data);
        setLaboratorios(resLaboratorios.data);

      } catch (error) {
        const err = error as AxiosError
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idMedicamento]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAdd = async () => {

    if (!marcaValue || !laboratorioValue || apresentacaoValue === "") {
      setMarcaRequired(!marcaValue?.id);
      setLaboratorioRequired(!laboratorioValue?.id);
      setApresentacaoRequired(!apresentacaoValue);
      return
    }

    const data = {
      idMedicamento: Number(idMedicamento),
      idMarca: marcaValue?.id,
      idLaboratorio: laboratorioValue?.id,
      qtdApresentacao: apresentacaoValue,
      bolsa: bolsaValue,
    }
    console.log(data)

    await httpRequest.post(`/apresentacao${apresentacaoId ? `/${apresentacaoId}` : ''}`, data)
      .then(async response => {
        const resData = await httpRequest.get(`/apresentacao`);
        Swal.fire({
          title: `Salvo com Sucesso!`,
          icon: 'success'
        });
        setApresentacoes(resData.data);
        handleCancel();
      })
      .catch(error => {
        Swal.fire({
          title: "Erro!",
          text: `${error}`,
          icon: "error"
        });
      });
  }

  const handleEdit = (apresentacao: Apresentacao) => {
    setApresentacaoId(apresentacao.id);
    setMarcaValue(apresentacao.marca);
    setLaboratorioValue(apresentacao.laboratorio);
    setApresentacaoValue(apresentacao.qtd_apresentacao);
    setBolsaValue(apresentacao.bolsa);
    setShowForm(true);
  }

  const handleDelete = (apresentacao: Apresentacao) => {
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
        await httpRequest.delete(`/apresentacao/${apresentacao.id}`)
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
              text: `Apresentacao ${data.nome} removida.`,
              icon: "success"
            });
            const resData = await httpRequest.get(`/apresentacao`);
            setApresentacoes(resData.data);
          }).catch(error => {
            Swal.showValidationMessage(`Erro ao deletar: ${error}`);
            return;
          });
      }
    });
  }

  const handleShowForm = () => {
    setShowForm(true);
  }

  const handleCancel = () => {
    setShowForm(false);
    setMarcaValue(null);
    setInputMarcaValue('');
    setLaboratorioValue(null);
    setInputLaboratorioValue('');
    setApresentacaoValue('');
    setBolsaValue(false);
    setMarcaRequired(false);
    setLaboratorioRequired(false);
    setApresentacaoRequired(false);
    setApresentacaoId(null);
  }

  const handleMarcaChange = (event: any, value: any) => {
    setMarcaValue(value);
    setMarcaRequired(!value);
  }

  const handleLaboratorioChange = (event: any, value: any) => {
    setLaboratorioValue(value);
    setLaboratorioRequired(!value);
  }


  const handleApresentacaoChange = (event: any) => {
    setApresentacaoValue(event.target.value);
    setApresentacaoRequired(!event.target.value);
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
            <Button onClick={handleShowForm} variant="contained" sx={{ p: 2, fontSize: 15 }} startIcon={<AddIcon />}>Adicionar</Button>
          </Grid>
        </Grid>
        <Typography variant="h4" sx={{
          fontWeight: 400
        }} >Medicamento {medicamento.nome}</Typography>

      </Box>

      {
        showForm && <Container maxWidth="lg">

          <Box sx={{
            mt: 8,
            mb: 4,
            p: 2,
            borderRadius: 2,
            borderColor: '#e9e9e9',
            borderStyle: 'solid',
            backgroundColor: '#f3f3f3',
            flexDirection: 'column'
          }}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body1" sx={{
                  fontWeight: 500
                }} >Adicionar apresentação</Typography>
              </Grid>

              <Grid container xs={12}>
                <Grid xs={4}>
                  <Autocomplete
                    value={marcaValue}
                    onChange={handleMarcaChange}
                    inputValue={inputMarcaValue}
                    onInputChange={(event, newInputValue) => {
                      setInputMarcaValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={marcas}
                    getOptionLabel={(option) => option.nome}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        label="Marcas"
                        variant="outlined"
                        required={marcaRequired}
                        error={marcaRequired}
                        helperText={marcaRequired ? 'Campo Obrigatório' : ''}
                      />

                    }
                  />
                </Grid>
                <Grid xs={4}>
                  <Autocomplete
                    value={laboratorioValue}
                    onChange={handleLaboratorioChange}
                    inputValue={inputLaboratorioValue}
                    onInputChange={(event, newInputValue) => {
                      setInputLaboratorioValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={laboratorios}
                    getOptionLabel={(option) => option.nome}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) =>
                      <TextField {...params} label="Laboratório"
                        variant="outlined"
                        required={laboratorioRequired}
                        error={laboratorioRequired}
                        helperText={laboratorioRequired ? 'Campo Obrigatório' : ''}
                      />}
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    id="outlined-basic"
                    value={apresentacaoValue}
                    onChange={handleApresentacaoChange}
                    fullWidth
                    label="Apresentação"
                    variant="outlined"
                    required={apresentacaoRequired}
                    error={apresentacaoRequired}
                    helperText={apresentacaoRequired ? 'Campo Obrigatório' : ''} />
                </Grid>
                <Grid container xs={12}>
                  <Grid xs={2}>
                    <FormControlLabel control={<Checkbox checked={bolsaValue} onClick={() => setBolsaValue(!bolsaValue)} />} label="Bolsa" sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />
                  </Grid>
                  <Grid xs={10} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleCancel} color='inherit' variant="contained" sx={{ p: 2, fontSize: 15, marginRight: 2 }} startIcon={<CloseIcon />}>Cancelar</Button>
                    <Button onClick={handleAdd} variant="contained" sx={{ p: 2, fontSize: 15 }} startIcon={<SaveIcon />}>Salvar</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      }



      <Container maxWidth="md">
        <Box sx={{
          mt: 6,
        }}>

          <Stack spacing={2}>
            {apresentacoes.length ? apresentacoes.map((apresentacao, index) => (
              <Box key={index}>
                <Grid container sx={{ backgroundColor: "#1976d2", p: 1, borderRadius: 3, alignItems: "center" }}>
                  <Grid xs={10}>
                    <Typography variant='button' fontSize={16} color="#fff">{`${apresentacao.marca.nome} - ${apresentacao.laboratorio.nome} - ${apresentacao.qtd_apresentacao}${apresentacao.bolsa ? ' - Bolsa' : ''}`}</Typography>
                  </Grid>
                  <Grid xs={1}>
                    <IconButton aria-label="delete" size="small" onClick={() => { handleEdit(apresentacao) }}>
                      <EditIcon fontSize="medium" sx={{ color: "#fff" }} />
                    </IconButton>
                  </Grid>
                  <Grid xs={1}>
                    <IconButton aria-label="delete" size="small" onClick={() => { handleDelete(apresentacao) }}>
                      <DeleteIcon fontSize="medium" sx={{ color: "#fff" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            )) : <Grid container sx={{ backgroundColor: "#1976d2", p: 1, borderRadius: 3, alignItems: "center" }}>
              <Grid xs={10}>
                <Typography variant='button' fontSize={16} color="#fff">Não foram encontradas apresentações registradas</Typography>
              </Grid>
            </Grid>}
          </Stack>
        </Box>

        <Grid container sx={{ mt: 5, justifyContent: "center" }}>
        </Grid>
      </Container>
    </Container >
  );
};

export default ApresentacaoFormPage;
