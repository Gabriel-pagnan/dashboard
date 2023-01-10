import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IListingPeaple {
    id: number,
    email: string,
    fullName: string,
    cityId: number,
}
interface IDetailPeaple {
    id: number,
    email: string,
    fullName: string,
    cityId: number,
}

type TPeapleFullCount = {
    data: IListingPeaple[],
    fullCount: number
} 

const getAll = async (page = 1, filter: ''):Promise<TPeapleFullCount | Error> =>{
  try {
    const urlRelative = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_lINHAS}&fullName_like=${filter}`;
    const { data, headers } = await Api.get(urlRelative);

    if(data) {
      return {
        data,
        fullCount: Number(headers['x-total-count'] || Environment.LIMITE_lINHAS),
      };
    }
    return new Error('Erro ao listar os registro');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao listar os registro');
  }
};

const getById = async (id: number):Promise<IDetailPeaple | Error> =>{
  try {
    const urlRelative = `/pessoas/${id}`;
    const { data } = await Api.get(urlRelative);
    
    if(data) {
      return data;
    }
    return new Error('Erro ao consultar o registro');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao consultar o registro');
  }
};

const create = async (dados: Omit<IDetailPeaple, 'id'>):Promise<number | Error> =>{
  try {
    const { data } = await Api.post<IDetailPeaple>('/pessoas', dados);
        
    if(data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao criar o registro');
  }
};

const updateById = async (id: number, dados: IDetailPeaple):Promise<void | Error> =>{
  try {
    await Api.put(`/pessoas/${id}`, dados);
    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number):Promise<void | Error> =>{
  try {
    await Api.delete(`/pessoas/${id}`);
    return new Error('Erro ao deletar o registro');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao deletar o registro');
  }
};


export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};