import { Outlet, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import { AuthContextProvider } from './context/AuthContext';
import Globalstyle from './style/GlobalStyles';
import AllProduct from './pages/AllProduct';


//Outlet 상위경로에서 하위경로 요소 구성
function App() {
  return (
    <>
      <AuthContextProvider>
        <Globalstyle />
        <Nav />
        <Routes>
          <Route path='/' element={AllProduct} />
        </Routes>

        <AllProduct />
        <Outlet />
      </AuthContextProvider>

    </>
  );
}

export default App;
