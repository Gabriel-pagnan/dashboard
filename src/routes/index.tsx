import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, LitagemPessoas } from '../pages';
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
        label: 'Pessoas',
        icon: 'person_search',
        path: '/pessoas'
      },
    ]);
  }, []);

  return(
    <Routes>
      <Route path="/home" element={<Dashboard />}/>
      <Route path="/pessoas" element={<LitagemPessoas />}/>
      {/* <Route path="/pessoas/detalhe/:id" element={<Dashboard />}/> */}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};