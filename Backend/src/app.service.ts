import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  APIPing(): string {
    return 'API Online'
  }
  
}
