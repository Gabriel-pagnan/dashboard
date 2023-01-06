import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () =>{
  const { toggleDrawerOpen, setDrawerOption } = useDrawerContext();
  useEffect(()=> {
    setDrawerOption([
      {
        label: 'Home',
        icon: 'home',
        path: '/home'
      },
    ]);
  }, []);

  return(
    <Routes>
      <Route path="/home" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Enviar</Button>}/>

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};