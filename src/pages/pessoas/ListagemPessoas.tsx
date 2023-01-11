import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const LitagemPessoas: React.FC = () =>{
  const [searchParams, setSearchParms] = useSearchParams();
  const {debounce} = useDebounce(3000);

  const search = useMemo(()=>{
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(()=>{

    debounce(() => {

      PessoasService.getAll(1, search)
        .then((result) => {
          if(result instanceof Error) {
            alert(result.message);
            return;
          }else{
            console.log(result.data[0]);
          }
        });
    });

  }, [search]);

  return(
    <LayoutBase title="Listagem de pessoas" barraFerramentas={
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