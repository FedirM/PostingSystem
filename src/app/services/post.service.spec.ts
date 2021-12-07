import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostService } from './post.service';
import { Post } from '../interfaces/post';

import * as jsonData from '../../assets/data.json';

describe('PostService', () => {
  let service: PostService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PostService ]
    });

    service = TestBed.inject(PostService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test mock data via http', () => {
    let actualData: Array<Post> | unknown;

    service.init().subscribe(data => {
      actualData = data;
    });

    const request = controller.expectOne({method: "GET"});
    request.flush(jsonData);
    controller.verify();

    expect(actualData).toEqual(jsonData);
  });

});
