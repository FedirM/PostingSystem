import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Post } from '../interfaces/post';

import * as jsonData from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  getPostList(): Observable<Array<Post>> {
    return of(Array.from(jsonData));
  }
}
