import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, LitagemCidade } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () =>{
  const { setDrawerOption } = useDrawerContext();
  useEffect(()=> {
    setDrawerOption([
      {
        label: 'Home',
        icon: 'home',
        path: '/home'
      },
      {
        label: 'Cidades',
        icon: 'apartment',
        path: '/cidades'
      },
    ]);
  }, []);

  return(
    <Routes>
      <Route path="/home" element={<Dashboard />}/>
      <Route path="/cidades" element={<LitagemCidade />}/>
      {/* <Route path="/cidades/detalhe/:id" element={<Dashboard />}/> */}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};