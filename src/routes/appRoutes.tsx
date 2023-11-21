import CadastroPageLayout from "../pages/cadastro/CadastroPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import CadastroIndex from "../pages/cadastro/CadastroIndex";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

import MedicamentoPage from "../pages/medicamento/MedicamentoPage";
import MarcaPage from "../pages/marca/MarcaPage";
import LaboratorioPage from "../pages/laboratorio/LaboratorioPage";
import ViaPage from "../pages/via/ViaPage";
import AcessoPage from "../pages/acesso/AcessoPage";
import ApresentacaoPage from "../pages/apresentacao/ApresentacaoPage";
import ApresentacaoForm from "../pages/apresentacao/ApresentacaoForm"
import DiluicaoPage from "../pages/diluicao/DiluicaoPage";
import DiluicaoForm from "../pages/diluicao/DiluicaoForm";
import CalculoPage from "../pages/calculo/CalculoPage";
import UnidadePage from "../pages/unidade/UnidadePage";



const appRoutes: RouteType[] = [
  {
    index: true,
    path: "/",
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/calcular",
    element: <CalculoPage />,
    state: "calcular",
    sidebarProps: {
      displayText: "Calcular Diluição",
      icon: <CalculateOutlinedIcon />
    }
  },
  {
    path: "/cadastro",
    element: <CadastroPageLayout />,
    state: "cadastro",
    sidebarProps: {
      displayText: "Cadastros",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <CadastroIndex />,
        state: "cadastro.index"
      },
      {
        path: "/cadastro/medicamento",
        element: <MedicamentoPage />,
        state: "cadastro.medicamento",
        sidebarProps: {
          displayText: "Medicamentos"
        },
      },
      {
        path: "/cadastro/marca",
        element: <MarcaPage />,
        state: "cadastro.marca",
        sidebarProps: {
          displayText: "Marcas"
        }
      },
      {
        path: "/cadastro/laboratorio",
        element: <LaboratorioPage />,
        state: "cadastro.laboratorio",
        sidebarProps: {
          displayText: "Laboratórios"
        }
      },
      {
        path: "/cadastro/via",
        element: <ViaPage />,
        state: "cadastro.via",
        sidebarProps: {
          displayText: "Vias de Administração"
        },
      },
      {
        path: "/cadastro/acesso",
        element: <AcessoPage />,
        state: "cadastro.acesso",
        sidebarProps: {
          displayText: "Acessos"
        },
      },
      {
        path: "/cadastro/unidade",
        element: <UnidadePage />,
        state: "cadastro.unidade",
        sidebarProps: {
          displayText: "Unidades de Concentração"
        },
      },
      {
        path: "/cadastro/apresentacao",
        element: <ApresentacaoPage />,
        state: "cadastro.apresentacao",
        sidebarProps: {
          displayText: "Apresentacões"
        },
      },
      {
        path: "/cadastro/diluicao",
        element: <DiluicaoPage />,
        state: "cadastro.diluicao",
        sidebarProps: {
          displayText: "Diluições"
        },
      },
      {
        path: "/cadastro/apresentacao/:idMedicamento",
        element: <ApresentacaoForm />,
        state: "cadastro.apresentacao"
      },
      {
        path: "/cadastro/diluicao/:idMedicamento",
        element: <DiluicaoForm />,
        state: "cadastro.diluicao"
      }
    ]
  },
  // {
  //   path: "/sair",
  //   element: <HomePage />,
  //   state: "sair",
  //   sidebarProps: {
  //     displayText: "Sair",
  //     icon: <LogoutOutlinedIcon />
  //   }
  // }
];

export default appRoutes;
