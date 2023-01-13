import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FerramentaDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const DetalhePessoas: React.FC = () =>{
  const {id = 'novo'} = useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () =>{
    toast.success('Cadastro salvo.');
  };
  const handleDelete = () =>{
    toast.success('Cadastro deletado.');
  };
  return(
    <LayoutBase 
      title={(id !== 'novo') ? 'Editar cadastro' : 'Cadastrar' }
      barraFerramentas={
        <FerramentaDetalhe 
          showNewButton={id !== 'novo'}
          showDeleteButton={id !== 'novo'}
          showBackButton
          showSaveBackButton
          showSaveButton
          
          handleClickBack={() => navigate(id !== 'novo' ? '/pessoas' : '/home')}
          handleClickNew={() => navigate('/pessoas/detalhe/novo')}
          handleClickDelete={handleDelete}
          handleClickSave={handleSave}
          handleClickSaveBack={handleSave}
        />
      }>
      <p>dasda {id}</p>
    </LayoutBase>
  );
};