import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PostService } from '../services/post.service';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-posts-controller',
  templateUrl: './posts-controller.component.html',
  styleUrls: ['./posts-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsControllerComponent implements OnInit {

  constructor( private postService: PostService ) { }

  ngOnInit(): void { }

  getPostsObservable(): Observable<Array<Post>> {
    return this.postService.getPostList();
  }
}
