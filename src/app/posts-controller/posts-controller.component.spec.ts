import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsControllerComponent } from './posts-controller.component';

describe('PostsControllerComponent', () => {
  let component: PostsControllerComponent;
  let fixture: ComponentFixture<PostsControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsControllerComponent ]
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
});
