import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { PostService } from '../services/post.service';
import { Post } from '../interfaces/post';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { TagFromControl } from '../helpers/tag-from-control';

import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-posts-controller',
  templateUrl: './posts-controller.component.html',
  styleUrls: ['./posts-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsControllerComponent implements OnInit {

  createForm: FormGroup;

  postList$: Observable<Array<Post>>;
  private filters: Array<string>;

  tagList = new Array('bug', 'issue', 'comment');
  tagsFormControl = new FormControl([...this.tagList]);

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.postList$ = this.postService.init();
    this.filters = [...this.tagList];
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      tags: new TagFromControl('', [Validators.required]),
      text: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.tagsFormControl.valueChanges.subscribe(value => {
      this.filters = value;
      this.updateList();
    });
  }

  deletePost( post: Post ): void {
    this.postService.deletePost(post);
    this.updateList();
  }

  editPost( post: Post ): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '550px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result ){
        let dialogData = <Post> result;
        this.postService.updatePost(result);
        this.updateTagList(dialogData.tags);
        this.updateList();
      }
    });
  }

  clearCreateForm(): void {
    this.createForm.reset();
  }

  createNewPost(): void {
    let post = this.createForm.getRawValue();
    let list = this.postService.getPostListData();
    post.tags = post.tags.replace(/[\s,]+$/, '').split(', ');
    post.id = 1 + Math.max(...list.map(el => Number(el.id)));

    this.postService.createPost(post);
    this.updateTagList(post.tags);
    this.updateList();
    this.createForm.reset();
  }

  private updateList(): void {
    this.postService.filterPostLIst(this.filters).subscribe(d => {
      this.postList$ = of(d);
    });
  }

  private updateTagList( tags: Array<string> ): void {
    let newTags = tags.filter(el => !this.tagList.includes(el));
    if(newTags.length > 0) {
      this.tagList.push(...newTags);
    }
    this.tagsFormControl.setValue([...this.tagList]);
  }


}
