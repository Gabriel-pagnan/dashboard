import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, DetalhePessoas, LitagemPessoas } from '../pages';
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
        label: 'Cadastro',
        icon: 'person_add',
        path: '/detalhe/novo'
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
      <Route path="/pessoas/detalhe/:id" element={<DetalhePessoas />}/>
      <Route path="/detalhe/novo" element={<DetalhePessoas />}/>

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};