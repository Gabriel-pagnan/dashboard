import { useNavigate } from 'react-router-dom';
import { FerramentaDetalhe} from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const Dashboard = () =>{
  const navigate = useNavigate();
  return(
    <LayoutBase 
      title='Página inicial'
      barraFerramentas={(
        <FerramentaDetalhe showBackButton={false} showDeleteButton={false} showSaveButton={false} handleClickNew={() => navigate('/pessoas/detalhe/novo')}/>
      )}>
        Testando
    </LayoutBase>
  );
};