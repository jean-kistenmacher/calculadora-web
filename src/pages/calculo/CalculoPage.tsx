import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AxiosError } from 'axios';
import httpRequest from '../../service/httpRequest'
import { Box, Button, CircularProgress, Container, IconButton, Pagination, Typography, Stack, TextField, InputAdornment, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import CalculateIcon from '@mui/icons-material/Calculate';

type Props = {};

type Medicamento = {
  id: number,
  nome: string
}

type Via = {
  id: number,
  nome: string
}

type Acesso = {
  id: number,
  nome: string
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

const CalculoPage = (props: Props) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [medicamentos, setMedicamentos] = useState(Array<any>);
  const [medicamentoValue, setMedicamentoValue] = useState<Medicamento | null>(null);
  const [inputMedicamentoValue, setInputMedicamentoValue] = useState('');
  const [medicamentoRequired, setMedicamentoRequired] = useState(false);

  const [vias, setVias] = useState(Array<any>);
  const [viaValue, setViaValue] = useState<Via | null>(null);
  const [inputViaValue, setInputViaValue] = useState('');
  const [viaRequired, setViaRequired] = useState(false);

  const [acessos, setAcessos] = useState(Array<any>);
  const [acessoValue, setAcessoValue] = useState<Acesso | null>(null);
  const [inputAcessoValue, setInputAcessoValue] = useState('');
  const [acessoRequired, setAcessoRequired] = useState(false);

  const [apresentacoes, setApresentacoes] = useState(Array<any>);
  const [apresentacaoValue, setApresentacaoValue] = useState<Apresentacao | null>(null);
  const [inputApresentacaoValue, setInputApresentacaoValue] = useState('');
  const [apresentacaoRequired, setApresentacaoRequired] = useState(false);

  const [doseValue, setDoseValue] = useState('');
  const [doseRequired, setDoseRequired] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resMedicamentos, resAcessos, resVias] = await Promise.all([
          httpRequest.get(`/medicamento/all`),
          httpRequest.get(`/acesso/all`),
          httpRequest.get(`/via/all`),
        ])

        setMedicamentos(resMedicamentos.data)
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
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleMedicamentoChange = async (event: any, value: any) => {
    setMedicamentoValue(value);
    setMedicamentoRequired(!value);

    if (value) {
      const [resApresentacao] = await Promise.all([
        httpRequest.get(`/apresentacao?idMedicamento=${value.id}`)
      ])
      setApresentacoes(resApresentacao.data);
    } else {
      setApresentacoes([]);
    }

  }

  const handleViaChange = (event: any, value: any) => {
    setViaValue(value);
    setViaRequired(!value);
  }

  const handleAcessoChange = (event: any, value: any) => {
    setAcessoValue(value);
    setAcessoRequired(!value);
  }

  const handleDoseChange = (event: any) => {
    setDoseValue(event.target.value);
    setDoseRequired(!event.target.value);
  }

  const handleApresentacaoChange = (event: any, value: any) => {
    setApresentacaoValue(value);
    setApresentacaoRequired(!value);
  }

  const handleCalcularDiluicao = () => {
    alert('Calculando')
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
            }}>Calcular Diluição</Typography>
          </Grid>
        </Grid>
      </Box>

      <Container maxWidth="lg">
        {false && <Box sx={{ mt: 8, mb: 4, flexDirection: 'row' }}>
          <Grid container xs={12} sx={{ backgroundColor: "#b6cee3", p: 4, borderRadius: 2, alignItems: "center" }}>
            <Typography variant='button' fontSize={26} sx={{ fontWeight: 700 }}>Resultado:</Typography>
            <Grid container xs={12} sx={{ backgroundColor: "#1976d2", p: 2, borderRadius: 2, alignItems: "center", justifyContent: 'center' }}>
              <Typography component='span' sx={{ mr: 1 }} fontSize={18} color="#fff">{`Aspirar`}</Typography>
              <Typography component='span' sx={{ mr: 1, fontWeight: 700 }} fontSize={18} color="#fff">{`Resultadoml`}</Typography>
              <Typography component='span' sx={{ mr: 1 }} fontSize={18} color="#fff">{`de solução para atingir os`}</Typography>
              <Typography component='span' sx={{ mr: 1, fontWeight: 700 }} fontSize={18} color="#fff">{`Dosemg`}</Typography>
              <Typography component='span' fontSize={18} color="#fff">{`da dose Prescrita`}</Typography>
            </Grid>

            <Grid container xs={12} sx={{ mt: 4 }}>
              <Grid xs={6}>
                <Typography component="span" sx={{ fontSize: 18 }} variant='button'>{`Dose: `}</Typography>
                <Typography component="span" sx={{ fontSize: 18 }}>{`12 Horas TA`}</Typography>
              </Grid>
              <Grid xs={6}>
                <Typography component="span" variant='button' sx={{ fontSize: 18 }}>{`Tempo de Administração: `}</Typography>
                <Typography component="span" sx={{ fontSize: 18 }}>{`30 minutos`}</Typography>
              </Grid>
              <Grid xs={12} sx={{ mt: 2 }}>
                <Typography component="span" variant='button' sx={{ fontSize: 18 }}>{`Reconstituição: `}</Typography>
                <Typography component="span" sx={{ fontSize: 18 }}>{`IV direto: 3 mL AD | IV infusão: 3 mL AD | Volume final de 3,4mL`}</Typography>
              </Grid>
              <Grid xs={12} sx={{ mt: 2 }}>
                <Typography component="span" variant='button' sx={{ fontSize: 18 }}>{`Diluição: `}</Typography>
                <Typography component="span" sx={{ fontSize: 18 }}>{`Aspirar 1 frasco + 17mL SF 0,9% = 25mg/mL`}</Typography>
              </Grid>
              <Grid xs={12} sx={{ mt: 2 }}>
                <Typography component="span" variant='button' sx={{ fontSize: 18 }}>{`Observação: `}</Typography>
                <Typography component="span" sx={{ fontSize: 18 }}>{`IRRITANTE Menos estável em SG Administrar separadamente de aminoglicosídeos(amicacina e gentamicina).`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>}

        <Box sx={{ mt: 4, mb: 4, flexDirection: 'column' }}>
          <Grid container xs={12} spacing={3}>
            <Grid xs={8}>
              <Autocomplete
                value={medicamentoValue}
                onChange={handleMedicamentoChange}
                inputValue={inputMedicamentoValue}
                onInputChange={(event, newInputValue) => {
                  setInputMedicamentoValue(newInputValue);
                }}
                id="controllable-medicamento"
                options={medicamentos}
                getOptionLabel={(option) => option.nome}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Medicamentos"
                    variant="outlined"
                    required={medicamentoRequired}
                    error={medicamentoRequired}
                    helperText={medicamentoRequired ? 'Campo Obrigatório' : ''}
                  />

                }
              />
            </Grid>
          </Grid>
          <Grid container xs={12} spacing={3}>
            <Grid xs={8}>
              <Autocomplete
                value={apresentacaoValue}
                onChange={handleApresentacaoChange}
                inputValue={inputApresentacaoValue}
                onInputChange={(event, newInputValue) => {
                  setInputApresentacaoValue(newInputValue);
                }}
                id="controllable-apresentacao"
                options={apresentacoes}
                getOptionLabel={(option: Apresentacao) => (`${option?.marca?.nome} - ${option?.laboratorio?.nome} - ${option?.qtd_apresentacao}${option?.bolsa ? '- Bolsa' : ''}`)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label={medicamentoValue ? 'Apresentações' : 'Selecione um Medicamento'}
                    variant="outlined"
                    required={apresentacaoRequired}
                    error={apresentacaoRequired}
                    helperText={apresentacaoRequired ? 'Campo Obrigatório' : ''}
                  />

                }
              />
            </Grid>
          </Grid>
          <Grid container xs={12} spacing={3}>
            <Grid xs={4}>
              <Autocomplete
                value={viaValue}
                onChange={handleViaChange}
                inputValue={inputViaValue}
                onInputChange={(event, newInputValue) => {
                  setInputViaValue(newInputValue);
                }}
                id="controllable-via"
                options={vias}
                getOptionLabel={(option) => option.nome}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Vias de Administração"
                    variant="outlined"
                    required={viaRequired}
                    error={viaRequired}
                    helperText={viaRequired ? 'Campo Obrigatório' : ''}
                  />
                }
              />
            </Grid>
            <Grid xs={4}>
              <Autocomplete
                value={acessoValue}
                onChange={handleAcessoChange}
                inputValue={inputAcessoValue}
                onInputChange={(event, newInputValue) => {
                  setInputAcessoValue(newInputValue);
                }}
                id="controllable-acesso"
                options={acessos}
                getOptionLabel={(option) => option.nome}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Acessos"
                    variant="outlined"
                    required={acessoRequired}
                    error={acessoRequired}
                    helperText={acessoRequired ? 'Campo Obrigatório' : ''}
                  />

                }
              />
            </Grid>
          </Grid>
          <Grid container xs={12} spacing={3} sx={{ mt: 3 }}>
            <Grid xs={4}>
              <TextField
                id="outlined-basic"
                value={doseValue}
                onChange={handleDoseChange}
                fullWidth
                label="Dose"
                variant="outlined"
                required={doseRequired}
                error={doseRequired}
                helperText={doseRequired ? 'Campo Obrigatório' : ''}
                InputProps={{
                  endAdornment: (<>mg|UI</>)
                }}
              />
            </Grid>
            <Grid xs={4}>
              <Button onClick={handleCalcularDiluicao} variant="contained" sx={{ p: 2, fontSize: 15 }} startIcon={<CalculateIcon />}>Calcular</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Container >
  );
};

export default CalculoPage;
