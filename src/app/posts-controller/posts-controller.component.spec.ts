import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { PostsControllerComponent } from './posts-controller.component';
import { PostService } from '../services/post.service';

import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy } from '@angular/core';

import * as jsonData from '../../assets/data.json';

describe('PostsControllerComponent', () => {
  let component: PostsControllerComponent;
  let fixture: ComponentFixture<PostsControllerComponent>;
  let fakePostService: jasmine.SpyObj<PostService>;

  beforeEach(async () => {

    fakePostService = jasmine.createSpyObj<PostService>(
      'PostService',
      {
        getPostList: of(Array.from(jsonData))
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ PostsControllerComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {
          provide: PostService,
          useValue: fakePostService
        }
      ]
    })
    .overrideComponent(PostsControllerComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the posts list in fake service (test: Subscribe)', () => {
    fakePostService.getPostList().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
    });
  });

  it('should get the posts list in fake service (test: PROMISE)', async() => {
    const data = await fakePostService.getPostList().toPromise();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should get the post list in component', async() => {
    const data = await component.getPostsObservable().toPromise();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should create posts container', () => {
    expect(fixture.nativeElement.querySelector('[data-test="posts-container"]')).toBeTruthy();
  });

  it('should create 3 posts', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-test="post"]')?.length).toBe(3);
  });

  it('post title', () => {
    expect(fixture.nativeElement.querySelector('[data-test="post-title"]')).toBeTruthy();
  });

  it('post tags', () => {
    expect(fixture.nativeElement.querySelector('[data-test="post-tags"]')).toBeTruthy();
  });

  it('post text', () => {
    expect(fixture.nativeElement.querySelector('[data-test="post-text"]')).toBeTruthy();
  });
});
