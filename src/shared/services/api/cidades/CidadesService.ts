import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListingCity {
    id: number,
    name: string,
    uf: string,
}
export interface IDetailCity {
    id: number,
    name: string,
    uf: string,
}

type TCityFullCount = {
    data: IListingCity[],
    fullCount: number
} 

const getAll = async (page = 1, filter: any):Promise<TCityFullCount | Error> =>{
  try {
    const urlRelative = `/cidades?_page=${page}&_limit=${Environment.LIMITE_LINHAS}&name_like=${filter}`;
    const { data, headers } = await Api.get(urlRelative);

    if(data) {
      return {
        data,
        fullCount: Number(headers['x-total-count'] || Environment.LIMITE_LINHAS),
      };
    }
    return new Error('Erro ao listar os registro');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao listar os registro');
  }
};

const getById = async (id: number):Promise<IDetailCity | Error> =>{
  try {
    const urlRelative = `/cidades/${id}`;
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

const create = async (dados: Omit<IDetailCity, 'id'>):Promise<number | Error> =>{
  try {
    const { data } = await Api.post<IDetailCity>('/cidades', dados);
        
    if(data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao criar o registro');
  }
};

const updateById = async (id: number, dados: IDetailCity):Promise<void | Error> =>{
  try {
    await Api.put(`/cidades/${id}`, dados);
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number):Promise<void | Error> =>{
  try {
    await Api.delete(`/cidades/${id}`);
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao deletar o registro');
  }
};


export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};