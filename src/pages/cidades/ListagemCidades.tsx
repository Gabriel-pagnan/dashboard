import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper, LinearProgress, Pagination, IconButton, Icon } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FerramentaListagem } from '../../shared/components';
import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';
import { LayoutBase } from '../../shared/layouts';
import { CidadesService, IListingCity } from '../../shared/services/api/cidades/CidadesService';

export const LitagemCidades: React.FC = () =>{
  const [searchParams, setSearchParms] = useSearchParams();
  const {debounce} = useDebounce(3000);

  const [rows,setRows] = useState<IListingCity[]>([]);
  const [fullCount,setFullCount] = useState(0);
  const [isLoading,setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  const search = useMemo(()=>{
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(()=>{
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  useEffect(()=>{
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(page, search)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            toast.error(result.message);
            return;
          }else{          
            setRows(result.data);
            setFullCount(result.fullCount);
          }
        });
    });

  }, [search, page]);

  const handleDelete = (id: number) => {
    if(confirm('Deseja apagar este registro?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if(result instanceof Error){
            toast.error(result.message);
          }else{
            toast.success('Registro apagado');
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id)
            ]);
          }
        });
    }
  };

  return(
    <LayoutBase title="Listagem de cidades" barraFerramentas={
      <FerramentaListagem 
        textNewButton='Novo'
        clickNewButton={() => navigate('/cidades/detalhe/novo')}
        showInputSearch
        textInput={search}
        changeTextSearch={text => setSearchParms({search: text, page: '1'}, {replace: true})}
      />
    }>
      <TableContainer component={Paper} variant='outlined' sx={{m: 2, width: 'auto'}}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>UF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row =>(
              <TableRow key={row.id}>
                <TableCell width={250}>
                  <IconButton size='small' color='error' onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size='small' color='primary' onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell width={250}>{row.name}</TableCell>
                <TableCell>{row.uf}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {fullCount === 0 && !isLoading &&(
            <caption>
              {Environment.LISTAGEM_VAZIA}
            </caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate'/>
                </TableCell>
              </TableRow>
            )}
            {(fullCount > 0 && fullCount > Environment.LIMITE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination 
                    page={page}
                    count={Math.ceil(fullCount / Environment.LIMITE_LINHAS)} 
                    color='primary'
                    onChange={(_, newPage) => setSearchParms({search, page: newPage.toString()}, {replace: true})}/>
                </TableCell>
              </TableRow>
            )}

          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBase>
  );
};