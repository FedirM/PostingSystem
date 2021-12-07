import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Post } from '../interfaces/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //@ts-ignore
  private _postList$: BehaviorSubject<Array<Post>>;

  constructor( private http: HttpClient ) {}

  init(): Observable<Array<Post>> {
    return this.getPostList().pipe(
      tap(data => this._postList$ = new BehaviorSubject(data))
    );
  }

  private getPostList(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${environment.apiURL}/assets/data.json`);
  }

  getPostListData(): Array<Post> {
    return this._postList$.value;
  }

  filterPostLIst( filters: Array<string> ): Observable<Array<Post>> {
    let resList = [];
    for(let post of this.getPostListData()){
      if( this.arrayIntersection(filters, post.tags).length > 0) {
        resList.push(post);
      }
    }
    return of([...resList]);
  }

  deletePost( p: Post ): void {
    this._postList$.next(
      this._postList$.value.filter(el => ( el.id !== p.id ))
    );
  }

  updatePost( p: Post ): void {
    let arr = this._postList$.value;
    let indx = arr.findIndex(el => el.id === p.id);
    arr[indx] = p;
    this._postList$.next([...arr]);
  }

  createPost( p: Post ): void {
    this._postList$.next(
      [...this._postList$.value, p]
    );
  }

  
  // HELPERS

  private arrayIntersection( arr1: Array<any>, arr2: Array<any> ): Array<any> {
    return arr1.filter(el => arr2.includes(el));
  }
}
