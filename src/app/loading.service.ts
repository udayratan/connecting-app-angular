import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoadingService {

  constructor() { }
    loadingOccurred = new EventEmitter<Error>();
    handleLoading(loading: any) {
        const loadingS = new Error(loading);
        this.loadingOccurred.emit(loadingS);
    }

}
