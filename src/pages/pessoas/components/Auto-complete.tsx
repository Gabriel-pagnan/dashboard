import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from '../../../shared/hooks';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';

type TAutoCompleteOptions = {
    id: number;
    label: string;
}
interface IAutoCompleteCidadeProps {
    isExternalLoading: boolean
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({isExternalLoading = false}) => {
  const {fieldName, registerField, defaultValue, error, clearError} = useField('cityId');
  const {debounce} = useDebounce();

  const [search, setSearch] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<TAutoCompleteOptions[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  useEffect(()=> {
    registerField({
      name: fieldName, 
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(1, search) 
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            toast.error(result.message);
            return;
          }else{          
            setOptions(result.data.map(cidade => ({id: cidade.id, label: cidade.name})));
          }
        });
    });
  }, [search]);

  const autoCompleteSelectedOption = useMemo(() => {
    if(!selectedId) return null;
    
    const selectedOption = options.find(opcao => opcao.id === selectedId);
    if(!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  return(
    <Autocomplete 
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Cidade não cadastrada.'
      loadingText='Carregando...' 
      disablePortal 
      options={options}
      loading={isloading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError(); }}
      popupIcon={(isExternalLoading || isloading) ? <CircularProgress size={28}/> : undefined}
      renderInput={(params) => (
        <TextField 
          {...params}
          label='Cidade'
          variant='filled'
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};