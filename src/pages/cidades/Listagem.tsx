import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentaListagem } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const LitagemCidade: React.FC = () =>{
  const [searchParams, setSearchParms] = useSearchParams();

  const search = useMemo(()=>{
    return searchParams.get('search') || '';
  }, [searchParams]);

  return(
    <LayoutBase title="Listagem de cidades" barraFerramentas={
      <FerramentaListagem 
        textNewButton='Nova'
        showInputSearch
        textInput={search}
        changeTextSearch={text => setSearchParms({search: text}, {replace: true})}
      />
    }>
    </LayoutBase>
  );
};