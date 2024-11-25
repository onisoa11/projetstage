import Login from './login/login'
import Registre from './login/registre'
import  {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import DefaultLayout from './Layouts/DefaultLayout';
import GeustLayout from './Layouts/GeustLayout';
import Verifier from './Components/verification';
import Menu from './Components/menu';
import Calcul from './Components/calcul';
import MenuList from './Components/MenuList';
import AddStudent from './Components/AddStutend';
import Recherche from './Components/Recherche';
import Consulter from './Components/Consulter';





const router = createBrowserRouter([
  {
    path:'/',
    element:<DefaultLayout/>,
    children:[
      {
        path:'/verifier',
        element:<AddStudent/>
      },
      {
        path:'/menu',
        element:<Menu/>
      },
      {
        path:'/calcul',
        element:<Calcul/>
      },
      {
        path:'/liste',
        element:<MenuList/>
      },
      {
        path:'/consulter',
        element:<Consulter/>
      },


    ]
  },
  {
    path:'/',
    element:<GeustLayout/>,
    children:[
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/registre',
        element:<Registre/>
      },
    ]
  },

  
])
function App() {
  

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
