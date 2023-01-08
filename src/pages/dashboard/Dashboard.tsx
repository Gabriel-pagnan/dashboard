import { FerramentaDetalhe, FerramentaListagem } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const Dashboard = () =>{
  return(
    <LayoutBase 
      title='Página inicial'
      barraFerramentas={(
        // <FerramentaListagem 
        //   showInputSearch
        // />
        <FerramentaDetalhe showSaveBackButton/>
      )}>
        Testando
    </LayoutBase>
  );
};