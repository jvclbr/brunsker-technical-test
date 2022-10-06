import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import {
  Observable,
  ReplaySubject,
  take
} from 'rxjs';
import {
  APIResponseDTO,
  APIArrayResponseDTO,
  APIFeedbackResponseDTO
} from '../DTO';

const {
  API_URL,
} = environment;

export abstract class BaseService<T> {

  protected abstract readonly apiPath:string;
  protected abstract readonly mainPath:string;
  protected readonly API_URL = API_URL;
  private datasource: ReplaySubject<T[]> = new ReplaySubject<T[]>();

  constructor(
    protected readonly httpClient: HttpClient,
    protected readonly router: Router
  ){}

  public getAll(): Observable<APIArrayResponseDTO<T[]>>{
    const APIResponse = new ReplaySubject<APIArrayResponseDTO<T[]>>();

    this.httpClient.get<APIArrayResponseDTO<T[]>>(`${API_URL}/${this.apiPath}`)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          this.setDatasource(res.data.content);
          APIResponse.next(res);
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    });

    return APIResponse.asObservable();
  }

  public getAllForUser(): Observable<APIArrayResponseDTO<T[]>>{
    const APIResponse = new ReplaySubject<APIArrayResponseDTO<T[]>>();

    this.httpClient.get<APIArrayResponseDTO<T[]>>(`${API_URL}/${this.apiPath}/user`)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          this.setDatasource(res.data.content);
          APIResponse.next(res);
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    });

    return APIResponse.asObservable();
  }

  public getById(dataId: number): Observable<APIResponseDTO<T>>{
    const APIResponse = new ReplaySubject<APIResponseDTO<T>>();

    this.httpClient.get<APIResponseDTO<T>>(`${API_URL}/${this.apiPath}/${dataId}`)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          APIResponse.next(res);
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    });

    return APIResponse.asObservable();
  }

  public create(newData: T): Observable<APIResponseDTO<T>>{
    const APIResponse = new ReplaySubject<APIResponseDTO<T>>();

    this.httpClient.post<APIResponseDTO<T>>(`${API_URL}/${this.apiPath}`, newData)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          this.getAll();
          APIResponse.next(res);
          if(this.mainPath){
            this.router.navigate([`/${this.mainPath}`]);
          }
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    });

    return APIResponse.asObservable();
  }

  public update(dataToUpdate: T, dataId: number){
    const APIResponse = new ReplaySubject<APIResponseDTO<APIFeedbackResponseDTO>>();

    this.httpClient.put<APIResponseDTO<APIFeedbackResponseDTO>>(`${API_URL}/${this.apiPath}/${dataId}`, dataToUpdate)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          this.getAll();
          APIResponse.next(res);
          if(this.mainPath){
            this.router.navigate([`/${this.mainPath}`]);
          }
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    });

    return APIResponse.asObservable();
  }

  public deactivate(dataId: number): Observable<APIResponseDTO<APIFeedbackResponseDTO>>{
    const APIResponse = new ReplaySubject<APIResponseDTO<APIFeedbackResponseDTO>>();

    this.httpClient.put<APIResponseDTO<APIFeedbackResponseDTO>>(`${API_URL}/${this.apiPath}/deactivate/${dataId}`, null)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          this.getAll();
          APIResponse.next(res);
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    });

    return APIResponse.asObservable();
  }

  public activate(dataId: number): Observable<APIResponseDTO<APIFeedbackResponseDTO>>{
    const APIResponse = new ReplaySubject<APIResponseDTO<APIFeedbackResponseDTO>>();

    this.httpClient.put<APIResponseDTO<APIFeedbackResponseDTO>>(`${API_URL}/${this.apiPath}/activate/${dataId}`, null)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          this.getAll();
          APIResponse.next(res);
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    });

    return APIResponse.asObservable();
  }

  public delete(dataId: number): Observable<APIResponseDTO<APIFeedbackResponseDTO>>{
    const APIResponse = new ReplaySubject<APIResponseDTO<APIFeedbackResponseDTO>>();

    this.httpClient.delete<APIResponseDTO<APIFeedbackResponseDTO>>(`${API_URL}/${this.apiPath}/${dataId}`)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          this.getAll();
          APIResponse.next(res);
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    });

    return APIResponse.asObservable();
  }

  private setDatasource(newDatasource: T[]): void{
    this.datasource.next(newDatasource);
  }

  protected getDatasource(): Observable<T[]>{
    return this.datasource.asObservable();
  }
}
