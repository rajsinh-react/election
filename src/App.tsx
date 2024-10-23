
import { Sign_in } from './page/sign_in'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import { DatailPage } from './page/DetailPage/datailPage';
import { EditVoter } from './page/searchPage/editVoter';
import { Search } from './page/searchPage/search';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sign_in />,
  
    },
    {
      path:'/details',
      element:<DatailPage />
    },
    {
      path: '/search',
      element: <Search />,
    },
    {
      path: '/voterinfo/:id',
      element: <EditVoter />,
    },
  ]);

  return (
    <>

<RouterProvider router={router} />
    </>
  )
}

export default App

