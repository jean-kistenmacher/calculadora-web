import CadastroPageLayout from "../pages/cadastro/CadastroPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import CadastroIndex from "../pages/cadastro/CadastroIndex";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

import FarmacoPage from "../pages/FarmacoPage";
import MarcaPage from "../pages/MarcaPage";
import LaboratorioPage from "../pages/LaboratorioPage";
import ViaPage from "../pages/ViaPage";
import AcessoPage from "../pages/AcessoPage";
import MedicamentoPage from "../pages/MedicamentoPage";
import DiluicaoPage from "../pages/DiluicaoPage";
import CalculoPage from "../pages/CalculoPage";



const appRoutes: RouteType[] = [
  {
    index: true,
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
        path: "/cadastro/farmaco",
        element: <FarmacoPage />,
        state: "cadastro.farmaco",
        sidebarProps: {
          displayText: "Fármaco"
        },
      },
      {
        path: "/cadastro/marca",
        element: <MarcaPage />,
        state: "cadastro.marca",
        sidebarProps: {
          displayText: "Marca"
        }
      },
      {
        path: "/cadastro/laboratorio",
        element: <LaboratorioPage />,
        state: "cadastro.laboratorio",
        sidebarProps: {
          displayText: "Laboratório"
        }
      },
      {
        path: "/cadastro/via",
        element: <ViaPage />,
        state: "cadastro.via",
        sidebarProps: {
          displayText: "Via de Administração"
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
        path: "/cadastro/medicamento",
        element: <MedicamentoPage />,
        state: "cadastro.medicamento",
        sidebarProps: {
          displayText: "Medicamento"
        },
      },
      {
        path: "/cadastro/diluicao",
        element: <DiluicaoPage />,
        state: "cadastro.diluicao",
        sidebarProps: {
          displayText: "Diluição"
        },
      },
    ]
  },
  {
    path: "/sair",
    element: <HomePage />,
    state: "sair",
    sidebarProps: {
      displayText: "Sair",
      icon: <LogoutOutlinedIcon />
    }
  }
];

export default appRoutes;
