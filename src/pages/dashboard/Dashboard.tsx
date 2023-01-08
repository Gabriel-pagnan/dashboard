import { BarraFeramentas } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const Dashboard = () =>{
  return(
    <LayoutBase 
      title='Página inicial'
      barraFerramentas={(
        <BarraFeramentas 
          showInputSearch
        />
      )}>
        Testando
    </LayoutBase>
  );
};