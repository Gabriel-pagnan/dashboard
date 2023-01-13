import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FerramentaDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const DetalhePessoas: React.FC = () =>{
  const {id = 'novo'} = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');


  useEffect(() => {
    if(id !== 'novo') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            toast.error(result.message);
            navigate('/pessoas');
          }else{
            setName(result.fullName);
            
          }
        });
    }
  }, []);

  const handleSave = () =>{
    toast.success('Cadastro salvo.');
  };

  const handleDelete = (id: number) => {
    if(confirm('Deseja apagar este registro?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            toast.error(result.message);
          }else{
            toast.success('Registro deletado.');
            navigate('/pessoas');
          }
        });
    }
  };

  return(
    <LayoutBase 
      title={(id !== 'novo') ? `${name}` : 'Cadastrar' }
      barraFerramentas={
        <FerramentaDetalhe 
          showNewButton={id !== 'novo'}
          showDeleteButton={id !== 'novo'}
          showBackButton
          showSaveBackButton
          showSaveButton
          
          handleClickBack={() => navigate(id !== 'novo' ? '/pessoas' : '/home')}
          handleClickNew={() => navigate('/pessoas/detalhe/novo')}
          handleClickDelete={() => handleDelete(Number(id))}
          handleClickSave={handleSave}
          handleClickSaveBack={handleSave}
        />
      }>
      {isLoading &&(
        <CircularProgress variant='indeterminate'/>
      )}
      <p>dasda {id}</p>
    </LayoutBase>
  );
};