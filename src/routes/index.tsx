import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, DetalhePessoas, LitagemPessoas, DetalheCidades, LitagemCidades } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () =>{
  const { setDrawerOption } = useDrawerContext();
  useEffect(()=> {
    setDrawerOption([
      {
        label: 'Dashboard',
        icon: 'dashboard',
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

      <Route path="/cidades" element={<LitagemCidades />}/>
      <Route path="/cidades/detalhe/:id" element={<DetalheCidades />}/>

      <Route path="/pessoas" element={<LitagemPessoas />}/>
      <Route path="/pessoas/detalhe/:id" element={<DetalhePessoas />}/>
      <Route path="/detalhe/novo" element={<DetalhePessoas />}/>

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};