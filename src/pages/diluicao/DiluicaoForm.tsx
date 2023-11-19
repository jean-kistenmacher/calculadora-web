import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import httpRequest from '../../service/httpRequest'
import { Box, Button, CircularProgress, Checkbox, InputAdornment, FormControlLabel, Container, IconButton, Typography, Stack, TextField, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalculateIcon from '@mui/icons-material/Calculate';

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

type Acesso = {
  id: number | null,
  nome: string
}

type Via = {
  id: number | null,
  nome: string
}

const DiluicaoFormPage = (props: Props) => {

  const navigate = useNavigate();

  const [diluicoes, setDiluicoes] = useState(Array<Apresentacao>);
  const [apresentacoes, setApresentacoes] = useState(Array<any>);
  const [acessos, setAcessos] = useState(Array<any>);
  const [vias, setVias] = useState(Array<any>);
  const [medicamento, setMedicamento] = useState<Medicamento>({ id: null, nome: "" })


  const [showForm, setShowForm] = useState(false)


  const [apresentacaoValue, setApresentacaoValue] = useState<Apresentacao | null>(null);
  const [inputApresentacaoValue, setInputApresentacaoValue] = useState('');
  const [apresentacaoRequired, setApresentacaoRequired] = useState(false);


  const [viaValue, setViaValue] = useState<Via | null>(null);
  const [inputViaValue, setInputViaValue] = useState('');
  const [viaRequired, setViaRequired] = useState(false);

  const [acessoValue, setAcessoValue] = useState<Acesso | null>(null);
  const [inputAcessoValue, setInputAcessoValue] = useState('');
  const [acessoRequired, setAcessoRequired] = useState(false);


  const [concentracaoValue, setConcentracaoValue] = useState('');
  const [concentracaoRequired, setConcentracaoRequired] = useState(false);

  const [bolsaValue, setBolsaValue] = useState(false);





  const [apresentacaoId, setApresentacaoId] = useState<number | null>(null);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { idMedicamento } = useParams();



  const handleAdd = async () => {

    // if (!marcaValue || !laboratorioValue || apresentacaoValue === "") {
    //   setMarcaRequired(!marcaValue?.id);
    //   setLaboratorioRequired(!laboratorioValue?.id);
    //   setApresentacaoRequired(!apresentacaoValue);
    //   return
    // }

    // const data = {
    //   idMedicamento: Number(idMedicamento),
    //   idMarca: marcaValue?.id,
    //   idLaboratorio: laboratorioValue?.id,
    //   qtdApresentacao: apresentacaoValue,
    //   bolsa: bolsaValue,
    // }
    // console.log(data)

    // await httpRequest.post(`/apresentacao${apresentacaoId ? `/${apresentacaoId}` : ''}`, data)
    //   .then(async response => {
    //     const resData = await httpRequest.get(`/apresentacao?idMedicamento=${idMedicamento}`);
    //     Swal.fire({
    //       title: `Salvo com Sucesso!`,
    //       icon: 'success'
    //     });
    //     setDiluicoes(resData.data);
    //     handleCancel();
    //   })
    //   .catch(error => {
    //     Swal.fire({
    //       title: "Erro!",
    //       text: `${error}`,
    //       icon: "error"
    //     });
    //   });
  }

  const handleEdit = (apresentacao: Apresentacao) => {
    // setApresentacaoId(apresentacao.id);
    // setApresentacaoValue(apresentacao.marca);
    // setLaboratorioValue(apresentacao.laboratorio);
    // setConcentracaoValue(apresentacao.qtd_apresentacao);
    // setBolsaValue(apresentacao.bolsa);
    // setShowForm(true);
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

            Swal.fire({
              title: "Deletado!",
              text: `Apresentação removida.`,
              icon: "success"
            });
            const resData = await httpRequest.get(`/apresentacao?idMedicamento=${idMedicamento}`);
            setDiluicoes(resData.data);
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

    setApresentacaoValue(null);
    setInputApresentacaoValue('');
    setApresentacaoRequired(false);

    setAcessoValue(null);
    setInputAcessoValue('');
    setAcessoRequired(false);

    setConcentracaoValue('');

    setBolsaValue(false);

    setApresentacaoId(null);
  }

  const handleViaChange = (event: any, value: any) => {
    setViaValue(value);
    setViaRequired(!value);
  }

  const handleAcessoChange = (event: any, value: any) => {
    setAcessoValue(value);
    setAcessoRequired(!value);
  }

  const handleApresentacaoChange = (event: any, values: any) => {
    console.log(event.target.value);
    console.log(values)
    setApresentacaoValue(values);
    setApresentacaoRequired(!values);
  }

  const handleConcentracaoChange = (event: any) => {
    setConcentracaoValue(event.target.value);
    setConcentracaoRequired(!event.target.value);
  }

  const handleCalculateConcentracao = () => {
    Swal.fire({
      title: "Calcular Concentração",
      html: `
        <p>Soluto</p>
        <input style="font-size: 1.2rem;" type="number"/><br/>
        <p>Diluente</p>
        <input style="font-size: 1.2rem;" type="number"/>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `Calcular`,
      cancelButtonText: `Cancelar`,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        const [resMedicamento, resDiluicoes, resApresentacao, resAcessos, resVias] = await Promise.all([
          httpRequest.get(`/medicamento/${idMedicamento}`),
          httpRequest.get(`/diluicao?idMedicamento=${idMedicamento}`),
          httpRequest.get(`/apresentacao?idMedicamento=${idMedicamento}`),
          httpRequest.get(`/acesso/all`),
          httpRequest.get(`/via/all`)
        ])

        setMedicamento(resMedicamento.data)
        setDiluicoes(resDiluicoes.data);
        setApresentacoes(resApresentacao.data);
        setAcessos(resAcessos.data);
        setVias(resVias.data);

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
            }}>Diluições</Typography>
          </Grid>
          <Grid xs={2}>
            <Button onClick={handleShowForm} variant="contained" sx={{ p: 2, fontSize: 15 }} startIcon={<AddIcon />}>Adicionar</Button>
          </Grid>
        </Grid>
        <Typography variant="h4" sx={{
          fontWeight: 400
        }} >Medicamento {medicamento.nome}</Typography>
        <Button onClick={() => navigate(-1)} variant="text" sx={{ fontSize: 20 }} startIcon={< ArrowBackIcon />}>Voltar</Button>
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
                }} >Adicionar diluição</Typography>
              </Grid>

              <Grid container xs={12}>
                <Grid xs={12}>
                  <Grid xs={12}>
                    <Autocomplete
                      value={apresentacaoValue}
                      onChange={handleApresentacaoChange}
                      inputValue={inputApresentacaoValue}
                      onInputChange={(event, newInputValue) => {
                        setInputApresentacaoValue(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={apresentacoes}
                      getOptionLabel={(option: Apresentacao) => (`${option?.marca?.nome} - ${option?.laboratorio?.nome} - ${option?.qtd_apresentacao}${option?.bolsa ? '- Bolsa' : ''}`)}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          label="Apresentação"
                          variant="outlined"
                          required={apresentacaoRequired}
                          error={apresentacaoRequired}
                          helperText={apresentacaoRequired ? 'Campo Obrigatório' : ''}
                        />

                      }
                    />
                  </Grid>
                </Grid>

                <Grid xs={12} md={6}>
                  <Grid xs={12}>
                    <Autocomplete
                      value={viaValue}
                      onChange={handleViaChange}
                      inputValue={inputViaValue}
                      onInputChange={(event, newInputValue) => {
                        setInputViaValue(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={vias}
                      getOptionLabel={(option) => option.nome}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) =>
                        <TextField {...params} label="Via de Administração"
                          variant="outlined"
                          required={viaRequired}
                          error={viaRequired}
                          helperText={viaRequired ? 'Campo Obrigatório' : ''}
                        />}
                    />
                  </Grid>
                  <Grid xs={12} sx={{ mt: 2 }}>
                    <TextField
                      id="outlined-basic"
                      value={concentracaoValue}
                      onChange={handleConcentracaoChange}
                      fullWidth
                      label="Concentração"
                      variant="outlined"
                      required={concentracaoRequired}
                      error={concentracaoRequired}
                      helperText={concentracaoRequired ? 'Campo Obrigatório' : ''}
                      InputProps={{
                        endAdornment: (
                          <>
                            mg/UI
                            <InputAdornment position="end">
                              <IconButton onClick={handleCalculateConcentracao}>
                                <CalculateIcon titleAccess='Calcular Concentração' color="primary" fontSize="large" aria-label="Calcular Concentração" />
                              </IconButton>
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />

                  </Grid>
                </Grid>

                <Grid xs={12} md={6}>
                  <Grid xs={12}>
                    <Autocomplete
                      value={acessoValue}
                      onChange={handleAcessoChange}
                      inputValue={inputAcessoValue}
                      onInputChange={(event, newInputValue) => {
                        setInputAcessoValue(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={acessos}
                      getOptionLabel={(option) => option.nome}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) =>
                        <TextField {...params} label="Acesso"
                          variant="outlined"
                          required={acessoRequired}
                          error={acessoRequired}
                          helperText={acessoRequired ? 'Campo Obrigatório' : ''}
                        />}
                    />
                  </Grid>
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
            {diluicoes.length ? diluicoes.map((apresentacao, index) => (
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
                <Typography variant='button' fontSize={16} color="#fff">Não foram encontradas diluições registradas</Typography>
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

export default DiluicaoFormPage;
