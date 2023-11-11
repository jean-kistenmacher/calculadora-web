import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InstallationPage from "../pages/installation/InstallationPage";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/calcular",
    element: <InstallationPage />,
    state: "calcular",
    sidebarProps: {
      displayText: "Calcular Diluição",
      icon: <CalculateOutlinedIcon />
    }
  },
  {
    path: "/cadastro",
    element: <DashboardPageLayout />,
    state: "cadastro",
    sidebarProps: {
      displayText: "Cadastros",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "cadastro.index"
      },
      {
        path: "/cadastro/farmaco",
        element: <DefaultPage />,
        state: "cadastro.farmaco",
        sidebarProps: {
          displayText: "Fármaco"
        },
      },
      {
        path: "/cadastro/marca",
        element: <AnalyticsPage />,
        state: "cadastro.marca",
        sidebarProps: {
          displayText: "Marca"
        }
      },
      {
        path: "/cadastro/laboratorio",
        element: <SaasPage />,
        state: "cadastro.laboratorio",
        sidebarProps: {
          displayText: "Laboratório"
        }
      },
      {
        path: "/cadastro/via",
        element: <DefaultPage />,
        state: "cadastro.via",
        sidebarProps: {
          displayText: "Via Administração"
        },
      },
      {
        path: "/cadastro/acesso",
        element: <DefaultPage />,
        state: "cadastro.acesso",
        sidebarProps: {
          displayText: "Acessos"
        },
      },
      {
        path: "/cadastro/medicamento",
        element: <DefaultPage />,
        state: "cadastro.medicamento",
        sidebarProps: {
          displayText: "Medicamento"
        },
      },
      {
        path: "/cadastro/diluicao",
        element: <DefaultPage />,
        state: "cadastro.diluicao",
        sidebarProps: {
          displayText: "Diluição"
        },
      },
    ]
  },
  {
    path: "/sair",
    element: <ChangelogPage />,
    state: "sair",
    sidebarProps: {
      displayText: "Sair",
      icon: <LogoutOutlinedIcon />
    }
  }
];

export default appRoutes;
