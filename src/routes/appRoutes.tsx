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
    state: "cadastroB",
    sidebarProps: {
      displayText: "Cadastros Básicos",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <CadastroIndex />,
        state: "cadastroB.index"
      },
      {
        path: "/cadastro/medicamento",
        element: <MedicamentoPage />,
        state: "cadastroB.medicamento",
        sidebarProps: {
          displayText: "Medicamentos"
        },
      },
      {
        path: "/cadastro/marca",
        element: <MarcaPage />,
        state: "cadastroB.marca",
        sidebarProps: {
          displayText: "Marcas"
        }
      },
      {
        path: "/cadastro/laboratorio",
        element: <LaboratorioPage />,
        state: "cadastroB.laboratorio",
        sidebarProps: {
          displayText: "Laboratórios"
        }
      },
      {
        path: "/cadastro/via",
        element: <ViaPage />,
        state: "cadastroB.via",
        sidebarProps: {
          displayText: "Vias de Administração"
        },
      },
      {
        path: "/cadastro/acesso",
        element: <AcessoPage />,
        state: "cadastroB.acesso",
        sidebarProps: {
          displayText: "Acessos"
        },
      },
      {
        path: "/cadastro/unidade",
        element: <UnidadePage />,
        state: "cadastroB.unidade",
        sidebarProps: {
          displayText: "Unidades de Concentração"
        },
      }
    ]
  },
  {
    path: "/cadastro",
    element: <CadastroPageLayout />,
    state: "cadastroA",
    sidebarProps: {
      displayText: "Cadastros Avançados",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <CadastroIndex />,
        state: "cadastroA.index"
      },
      {
        path: "/cadastro/apresentacao",
        element: <ApresentacaoPage />,
        state: "cadastroA.apresentacao",
        sidebarProps: {
          displayText: "Apresentações"
        },
      },
      {
        path: "/cadastro/diluicao",
        element: <DiluicaoPage />,
        state: "cadastroA.diluicao",
        sidebarProps: {
          displayText: "Diluições"
        },
      },
      {
        path: "/cadastro/apresentacao/:idMedicamento",
        element: <ApresentacaoForm />,
        state: "cadastroA.apresentacao"
      },
      {
        path: "/cadastro/diluicao/:idMedicamento",
        element: <DiluicaoForm />,
        state: "cadastroA.diluicao"
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
