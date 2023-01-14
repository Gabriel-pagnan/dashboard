import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FerramentaDetalhe } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

interface IFormData {
  email: string;
  cityId: number;
  fullName: string;
}

export const DetalhePessoas: React.FC = () =>{
  const {id = 'novo'} = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const formRef = useRef<FormHandles>(null);

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
            formRef.current?.setData(result);
          }
        });
    }
  }, []);

  const handleSave = (dados: IFormData) =>{
    setIsLoading(true);

    if(id === 'novo') {
      PessoasService.create(dados)
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error) {
            toast.error(result.message);
          }else{
            toast.success('Cadastro salvo.');
          }
        });
    }else {
      PessoasService.updateById(Number(id), {id: Number(id), ...dados})
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error) {
            toast.error(result.message);
          }else{
            toast.success('Atualizado com sucesso.');
          }
        });
    }
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
          handleClickSave={() => formRef.current?.submitForm()}
          handleClickSaveBack={() => formRef.current?.submitForm()}
        />
      }>
      
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder='Nome Completo' name='fullName' />
        <VTextField placeholder='E-mail' name='email' />
        <VTextField placeholder='ID da cidade' name='cityId' />
      </Form>
    </LayoutBase>
  );
};