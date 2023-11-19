import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import httpRequest from '../../service/httpRequest'
import { Box, Button, CircularProgress, InputAdornment, Container, IconButton, Typography, TextField, Autocomplete, Modal } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalculateIcon from '@mui/icons-material/Calculate';

type Props = {};

type Diluicao = {
  id: number,
  id_apresentacao: number,
  id_via: number,
  id_acesso: number,
  id_unidade_medida: number,
  reconstituicao: string,
  diluicao: string,
  concentracao: string,
  estabilidade: string,
  tempo_adm: string,
  observacao: string,
  data_criacao: string,
  acesso: Acesso,
  apresentacao: Apresentacao,
  via: Via,
  unidadeMedida: Unidade
}

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

type Unidade = {
  id: number | null,
  nome: string
}

const DiluicaoFormPage = (props: Props) => {

  const navigate = useNavigate();

  const [diluicoes, setDiluicoes] = useState(Array<Diluicao>);
  const [apresentacoes, setApresentacoes] = useState(Array<any>);
  const [acessos, setAcessos] = useState(Array<any>);
  const [vias, setVias] = useState(Array<any>);
  const [unidades, setUnidades] = useState(Array<any>);

  const [medicamento, setMedicamento] = useState<Medicamento>({ id: null, nome: "" })
  const [modalOpen, setModalOpen] = useState(false)
  const [resultadoCalculo, setResultadoCalculo] = useState('');

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

  const [unidadeValue, setUnidadeValue] = useState<Unidade | null>(null);
  const [inputUnidadeValue, setInputUnidadeValue] = useState('');
  const [unidadeRequired, setUnidadeRequired] = useState(false);


  const [concentracaoValue, setConcentracaoValue] = useState('');
  const [concentracaoRequired, setConcentracaoRequired] = useState(false);

  const [tmpAdministracaoValue, setTmpAdministracaoValue] = useState('');
  const [tmpAdministracaoRequired, setTmpAdministracaoRequired] = useState(false);

  const [estabilidadeValue, setEstabilidadeValue] = useState('');
  const [estabilidadeRequired, setEstabilidadeRequired] = useState(false);

  const [reconstituicaoValue, setReconstituicaoValue] = useState('');
  const [reconstituicaoRequired, setReconstituicaoRequired] = useState(false);

  const [diluicaoValue, setDiluicaoValue] = useState('');
  const [diluicaoRequired, setDiluicaoRequired] = useState(false);

  const [observacaoValue, setObservacaoValue] = useState('');

  const [diluicaoId, setDiluicaoId] = useState<number | null>(null);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { idMedicamento } = useParams();


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const handleAdd = async () => {

    if (!apresentacaoValue ||
      !viaValue ||
      !acessoValue ||
      !unidadeValue ||
      concentracaoValue === "" ||
      tmpAdministracaoValue === "" ||
      estabilidadeValue === "" ||
      reconstituicaoValue === "" ||
      diluicaoValue === "") {

      setApresentacaoRequired(!apresentacaoValue?.id);
      setViaRequired(!viaValue?.id);
      setAcessoRequired(!acessoValue?.id);
      setUnidadeRequired(!unidadeValue?.id);
      setConcentracaoRequired(!concentracaoValue);
      setTmpAdministracaoRequired(!tmpAdministracaoValue);
      setEstabilidadeRequired(!estabilidadeValue);
      setReconstituicaoRequired(!reconstituicaoValue);
      setDiluicaoRequired(!diluicaoValue);
      return
    }

    const data = {
      idApresentacao: apresentacaoValue?.id,
      idVia: viaValue?.id,
      idAcesso: acessoValue?.id,
      idUnidade: unidadeValue?.id,
      concentracao: concentracaoValue,
      tempoAdm: tmpAdministracaoValue,
      estabilidade: estabilidadeValue,
      reconstituicao: reconstituicaoValue,
      diluicao: diluicaoValue,
      observacao: observacaoValue,
    }
    console.log(data)

    await httpRequest.post(`/diluicao${diluicaoId ? `/${diluicaoId}` : ''}`, data)
      .then(async response => {
        const resData = await httpRequest.get(`/diluicao?idMedicamento=${idMedicamento}`);
        Swal.fire({
          title: `Salvo com Sucesso!`,
          icon: 'success'
        });
        setDiluicoes(resData.data);
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

  const handleCancel = () => {
    setShowForm(false);

    setApresentacaoValue(null);
    setInputApresentacaoValue('');
    setApresentacaoRequired(false);

    setViaValue(null);
    setInputViaValue('');
    setViaRequired(false);

    setAcessoValue(null);
    setInputAcessoValue('');
    setAcessoRequired(false);

    setConcentracaoValue('');
    setConcentracaoRequired(false);

    setUnidadeValue(null);
    setInputUnidadeValue('');
    setUnidadeRequired(false);

    setTmpAdministracaoValue('');
    setTmpAdministracaoRequired(false);

    setEstabilidadeValue('');
    setEstabilidadeRequired(false);

    setReconstituicaoValue('');
    setReconstituicaoRequired(false);

    setDiluicaoValue('');
    setDiluicaoRequired(false);

    setObservacaoValue('');

    setDiluicaoId(null);
  }

  const handleEdit = (diluicao: Diluicao) => {
    setDiluicaoId(diluicao.id);
    setApresentacaoValue(diluicao.apresentacao);
    setViaValue(diluicao.via);
    setAcessoValue(diluicao.acesso);
    setUnidadeValue(diluicao.unidadeMedida);
    setConcentracaoValue(diluicao.concentracao);
    setTmpAdministracaoValue(diluicao.tempo_adm);
    setEstabilidadeValue(diluicao.estabilidade);
    setReconstituicaoValue(diluicao.reconstituicao);
    setDiluicaoValue(diluicao.diluicao);
    setObservacaoValue(diluicao.observacao)
    setShowForm(true);
  }

  const handleDelete = (diluicao: Diluicao) => {
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
        await httpRequest.delete(`/diluicao/${diluicao.id}`)
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
              text: `Diluição removida.`,
              icon: "success"
            });
            const resData = await httpRequest.get(`/diluicao?idMedicamento=${idMedicamento}`);
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

  const handleViaChange = (event: any, value: any) => {
    setViaValue(value);
    setViaRequired(!value);
  }

  const handleAcessoChange = (event: any, value: any) => {
    setAcessoValue(value);
    setAcessoRequired(!value);
  }

  const handleUnidadeChange = (event: any, value: any) => {
    setUnidadeValue(value);
    setUnidadeRequired(!value);
  }

  const handleApresentacaoChange = (event: any, values: any) => {
    setApresentacaoValue(values);
    setApresentacaoRequired(!values);
  }

  const handleConcentracaoChange = (event: any) => {
    setConcentracaoValue(event.target.value);
    setConcentracaoRequired(!event.target.value);
  }

  const handleTmpAdministracaoChange = (event: any) => {
    setTmpAdministracaoValue(event.target.value);
    setTmpAdministracaoRequired(!event.target.value);
  }

  const handleEstabilidadeChange = (event: any) => {
    setEstabilidadeValue(event.target.value);
    setEstabilidadeRequired(!event.target.value);
  }

  const handleReconstituicaoChange = (event: any) => {
    setReconstituicaoValue(event.target.value);
    setReconstituicaoRequired(!event.target.value);
  }

  const handleDiluicaoChange = (event: any) => {
    setDiluicaoValue(event.target.value);
    setDiluicaoRequired(!event.target.value);
  }

  const handleObservacaoChange = (event: any) => {
    setObservacaoValue(event.target.value);
  }

  const handleCalculateConcentracao = () => {
    const soluto = (document.getElementById('qtdSoluto') as HTMLInputElement)?.value;
    const reconstituicao = (document.getElementById('qtdReconstituicao') as HTMLInputElement)?.value;
    const diluicao = (document.getElementById('qtdDiluicao') as HTMLInputElement)?.value;

    if (reconstituicao) {
      const resRec = Number(soluto) / Number(reconstituicao);
      const resDil = resRec / Number(diluicao);
      setResultadoCalculo(resDil.toString());
      setConcentracaoValue(resDil.toString());
      setConcentracaoRequired(!resDil.toString());
    } else {
      const resDil = Number(soluto) / Number(diluicao);
      setResultadoCalculo(resDil.toString());
      setConcentracaoValue(resDil.toString());
      setConcentracaoRequired(!resDil.toString());
    }

  }

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1rem', color: '#fff', fontWeight: 500 }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: '#1976d2',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1)
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const [resMedicamento, resDiluicoes, resApresentacao, resAcessos, resVias, resUnidades] = await Promise.all([
          httpRequest.get(`/medicamento/${idMedicamento}`),
          httpRequest.get(`/diluicao?idMedicamento=${idMedicamento}`),
          httpRequest.get(`/apresentacao?idMedicamento=${idMedicamento}`),
          httpRequest.get(`/acesso/all`),
          httpRequest.get(`/via/all`),
          httpRequest.get(`/unidade/all`),
        ])

        setMedicamento(resMedicamento.data)
        setDiluicoes(resDiluicoes.data);
        setApresentacoes(resApresentacao.data);
        setAcessos(resAcessos.data);
        setVias(resVias.data);
        setUnidades(resUnidades.data);

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
                }} >{diluicaoId ? 'Editar diluição' : 'Adicionar diluição'}</Typography>
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
                  <Grid xs={12} md={3}>
                    <Grid xs={4}>
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
                            <InputAdornment position="end">
                              <IconButton onClick={() => setModalOpen(true)}>
                                <CalculateIcon titleAccess='Calcular Concentração' color="primary" fontSize="large" aria-label="Calcular Concentração" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid xs={12} md={3}>
                    <Grid xs={12}>
                      <Autocomplete
                        value={unidadeValue}
                        onChange={handleUnidadeChange}
                        inputValue={inputUnidadeValue}
                        onInputChange={(event, newInputValue) => {
                          setInputUnidadeValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={unidades}
                        getOptionLabel={(option) => option.nome}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) =>
                          <TextField {...params} label="Unidade da Concentração"
                            variant="outlined"
                            required={unidadeRequired}
                            error={unidadeRequired}
                            helperText={unidadeRequired ? 'Campo Obrigatório' : ''}
                          />}
                      />
                    </Grid>
                  </Grid>

                  <Grid xs={12} md={3}>
                    <TextField
                      id="outlined-basic"
                      value={tmpAdministracaoValue}
                      onChange={handleTmpAdministracaoChange}
                      fullWidth
                      label="Tempo de Administração"
                      variant="outlined"
                      required={tmpAdministracaoRequired}
                      error={tmpAdministracaoRequired}
                      helperText={tmpAdministracaoRequired ? 'Campo Obrigatório' : ''}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      id="outlined-basic"
                      value={estabilidadeValue}
                      onChange={handleEstabilidadeChange}
                      fullWidth
                      label="Estabilidade"
                      variant="outlined"
                      required={estabilidadeRequired}
                      error={estabilidadeRequired}
                      helperText={estabilidadeRequired ? 'Campo Obrigatório' : ''}
                    />
                  </Grid>
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Reconstituição"
                    fullWidth
                    multiline
                    maxRows={4}
                    rows={4}
                    value={reconstituicaoValue}
                    onChange={handleReconstituicaoChange}
                    required={reconstituicaoRequired}
                    error={reconstituicaoRequired}
                    helperText={reconstituicaoRequired ? 'Campo Obrigatório' : ''}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Diluição"
                    fullWidth
                    multiline
                    maxRows={4}
                    rows={4}
                    value={diluicaoValue}
                    onChange={handleDiluicaoChange}
                    required={diluicaoRequired}
                    error={diluicaoRequired}
                    helperText={diluicaoRequired ? 'Campo Obrigatório' : ''}
                  />
                </Grid>

                <Grid xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Observação"
                    fullWidth
                    multiline
                    rows={3}
                    maxRows={3}
                    value={observacaoValue}
                    onChange={handleObservacaoChange}
                  />
                </Grid>

                <Grid container xs={12}>
                  <Grid xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleCancel} color='inherit' variant="contained" sx={{ p: 2, fontSize: 15, marginRight: 2 }} startIcon={<CloseIcon />}>Cancelar</Button>
                    <Button onClick={handleAdd} variant="contained" sx={{ p: 2, fontSize: 15 }} startIcon={<SaveIcon />}>Salvar</Button>
                  </Grid>
                </Grid>


              </Grid>
            </Grid>
          </Box>
        </Container>
      }



      <Container maxWidth="lg">
        <Box sx={{
          mt: 6,
        }}>


          {diluicoes.length ? diluicoes.map((diluicao, index) => (
            <Box key={index}>
              <Accordion expanded={expanded === `panel${diluicao.id}`} onChange={handleChange(`panel${diluicao.id}`)}>
                <AccordionSummary aria-controls={`panel${diluicao.id}-content`} id={`panel${diluicao.id}-header`}>
                  <Typography color="#fff" variant='button' sx={{ fontSize: '1rem' }}>
                    {`${diluicao.apresentacao.marca.nome} - ${diluicao.apresentacao.laboratorio.nome} - ${diluicao.apresentacao.qtd_apresentacao}${diluicao.apresentacao.bolsa ? '- Bolsa - ' : ' - '}${diluicao.via.nome} - ${diluicao.acesso.nome}`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container xs={12}>
                    <Grid xs={4}>
                      <Typography component="span" variant='button'>{`Concentração: `}</Typography>
                      <Typography component="span">{`${diluicao.concentracao}${diluicao.unidadeMedida.nome}`}</Typography>
                    </Grid>
                    <Grid xs={4}>
                      <Typography component="span" variant='button'>{`Estabilidade: `}</Typography>
                      <Typography component="span">{`${diluicao.estabilidade}`}</Typography>
                    </Grid>
                    <Grid xs={4}>
                      <Typography component="span" variant='button'>{`Tempo de Administração: `}</Typography>
                      <Typography component="span">{`${diluicao.tempo_adm}`}</Typography>
                    </Grid>
                    <Grid xs={12} sx={{ mt: 2 }}>
                      <Typography component="span" variant='button'>{`Reconstituição: `}</Typography>
                      <Typography component="span">{`${diluicao.reconstituicao}`}</Typography>
                    </Grid>
                    <Grid xs={12} sx={{ mt: 2 }}>
                      <Typography component="span" variant='button'>{`Diluição: `}</Typography>
                      <Typography component="span">{`${diluicao.diluicao}`}</Typography>
                    </Grid>
                    <Grid xs={12} sx={{ mt: 2 }}>
                      <Typography component="span" variant='button'>{`Observação: `}</Typography>
                      <Typography component="span">{`${diluicao.observacao}`}</Typography>
                    </Grid>
                  </Grid>
                  <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={() => { handleEdit(diluicao) }} variant="contained" sx={{ fontSize: 16, marginRight: 2 }} startIcon={<EditIcon />}>Editar</Button>
                    <Button onClick={() => { handleDelete(diluicao) }} color='error' variant="contained" sx={{ fontSize: 16 }} startIcon={<DeleteIcon />}>Deletar</Button>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>
          )) : <Grid container sx={{ backgroundColor: "#1976d2", p: 1, borderRadius: 3, alignItems: "center" }}>
            <Grid xs={10}>
              <Typography variant='button' fontSize={16} color="#fff">Não foram encontradas diluições registradas</Typography>
            </Grid>
          </Grid>}
        </Box>

        <Grid container sx={{ mt: 5, justifyContent: "center" }}>
        </Grid>
      </Container>

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setResultadoCalculo('') }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container xs={12} spacing={2}>
            <Grid xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Calcular concentração
              </Typography>
            </Grid>
            <Grid xs={12}>
              <TextField id="qtdSoluto" fullWidth label="Quantidade Soluto" variant="outlined" InputProps={{
                endAdornment: ('mg|UI')
              }} />
            </Grid>
            <Grid xs={12}>
              <Typography id="ajudaReconstituicao" variant="caption" component="p" sx={{ fontWeight: 500, fontSize: 13, mb: 1 }}>
                Se 'Pronto para uso' deixar compo em branco.
              </Typography>
              <TextField id="qtdReconstituicao" fullWidth label="Quantidade Diluente Reconstituição" variant="outlined" InputProps={{
                endAdornment: ('ml')
              }} />
            </Grid>
            <Grid xs={12}>
              <Typography id="ajudaReconstituicao" variant="caption" component="p" sx={{ fontWeight: 500, fontSize: 13, mb: 1 }}>
                Se 'Pronto para uso' deixar compo em branco.
              </Typography>
              <TextField id="qtdDiluicao" fullWidth label="Quantidade Diluente Diluição" variant="outlined" InputProps={{
                endAdornment: ('ml')
              }} />
            </Grid>

            {resultadoCalculo && <Grid xs={12} sx={{ display: 'flex', backgroundColor: "#1976d2", borderRadius: 3, justifyContent: 'center', alignItems: "center" }}>
              <Grid xs={10}>
                <Typography variant='button' fontSize={18} color="#fff">{`Resultado: ${resultadoCalculo}(mg|UI)/ml`}</Typography>
              </Grid>
            </Grid>}

            <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleCalculateConcentracao} variant="contained" sx={{ p: 1, fontSize: 15 }} startIcon={<CalculateIcon />}>Calcular</Button>
            </Grid>
            <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={() => { setModalOpen(false); setResultadoCalculo('') }} color='inherit' variant="contained" sx={{ p: 1, fontSize: 15, marginRight: 2 }} startIcon={<CloseIcon />}>Cancelar</Button>
            </Grid>
          </Grid>

        </Box>
      </Modal>

    </Container >

  );
};

export default DiluicaoFormPage;
