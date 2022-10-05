import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { ViaCepDTO, ViaCepSchema } from '../DTO';

@Injectable()
export class ViaCepService {

    private viaCEP(): AxiosInstance{

        const axiosInstance = axios.create({
            baseURL: `https://viacep.com.br/ws/`,
            timeout: 5000
        })

        return axiosInstance
    }

    public async searchAddress(cep: string): Promise<ViaCepDTO>{
        try{
            const Response = await this.searchAddressAPICall(cep);
            return Response
        }
        catch(err: any){
            if(err instanceof HttpException){
                throw err
            }

            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    private async searchAddressAPICall(cep: string): Promise<ViaCepDTO>{
        const response = await this.viaCEP().get<ViaCepDTO>(`${cep}/json`).then(res => {
           return ViaCepSchema.parse(res.data)
        }).catch((err: any) => {
            if(err instanceof AxiosError){
                if(err.response.status === HttpStatus.TOO_MANY_REQUESTS){
                    throw new HttpException('Falha ao pesquisar o CEP informado', err.response.status)
                }
    
                throw new HttpException(err.response.data, err.response.status)
            }

            throw new HttpException(err, HttpStatus.UNPROCESSABLE_ENTITY);
        })

        return response
    }
}