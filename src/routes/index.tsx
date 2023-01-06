import Button from '@mui/material/Button';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () =>{
  const { toggleDrawerOpen } = useDrawerContext();
  return(
    <Routes>
      <Route path="/home" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Enviar</Button>}/>

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};