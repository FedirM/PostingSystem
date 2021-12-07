import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { PostsControllerComponent } from './posts-controller.component';
import { PostService } from '../services/post.service';

import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';

import * as jsonData from '../../assets/data.json';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const materialImports = [
  MatDividerModule,
  MatSelectModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
];

describe('PostsControllerComponent', () => {
  let component: PostsControllerComponent;
  let fixture: ComponentFixture<PostsControllerComponent>;
  let fakePostService: jasmine.SpyObj<PostService>;

  beforeEach(async () => {

    fakePostService = jasmine.createSpyObj<PostService>(
      'PostService',
      {
        init: of(Array.from(jsonData))
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ PostsControllerComponent ],
      imports: [
        HttpClientTestingModule,
        ...materialImports,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {
          provide: PostService,
          useValue: fakePostService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
    fakePostService.init().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
    });
  });

  it('should get the posts list in fake service (test: PROMISE)', async() => {
    const data = await fakePostService.init().toPromise();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should get the post list in component', async() => {
    const data = await component.postList$.toPromise();
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
