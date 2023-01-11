import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService, IListingPeaple } from '../../shared/services/api/pessoas/PessoasService';

export const LitagemPessoas: React.FC = () =>{
  const [searchParams, setSearchParms] = useSearchParams();
  const {debounce} = useDebounce(3000);

  const [rows,setRows] = useState<IListingPeaple[]>([]);
  const [fullCount,setFullCount] = useState(0);
  const [isLoading,setIsLoading] = useState(true);

  const search = useMemo(()=>{
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(()=>{
    setIsLoading(true);
    debounce(() => {
      PessoasService.getAll(1, search)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
            return;
          }else{
            console.log(result);
            
            setRows(result.data);
            setFullCount(result.fullCount);
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

      <TableContainer component={Paper} variant='outlined' sx={{m: 1, width: 'auto'}}>
        <Table >
          <TableHead >
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row =>(
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutBase>
  );
};