import { Api } from '../axios-config';

export interface IDetailUser {
    id: number,
    email: string,
    name: string,
    senha: string
}

const create = async (dados: Omit<IDetailUser, 'id'>):Promise<number | Error> =>{
  try {
    const { data } = await Api.post<IDetailUser>('/user', dados);
        
    if(data) {
      return data.id;
    }
    return new Error('Erro ao criar o usuário.');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao criar o usuário.');
  }
};


export const UsersService = {
  create,
};