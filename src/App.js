import { Outlet, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import { AuthContextProvider } from './context/AuthContext';
import Globalstyle from './style/GlobalStyles';
import AllProduct from './pages/AllProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TopBtn from './components/TopBtn';

const queryClient = new QueryClient();
//Outlet 상위경로에서 하위경로 요소 구성
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Globalstyle />
          <Nav />
          <Routes>
            <Route path='/' element={<AllProduct />} />
          </Routes>
          <TopBtn/>

          {/* <AllProduct /> */}
          
          <Outlet />
        </AuthContextProvider>
      </QueryClientProvider>

    </>
  );
}

export default App;
