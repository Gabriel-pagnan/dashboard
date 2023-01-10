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

const getById = async ():Promise<any> =>{};

const create = async ():Promise<any> =>{};

const updateById = async ():Promise<any> =>{};

const deleteById = async ():Promise<any> =>{};


export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};