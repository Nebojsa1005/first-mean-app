import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<{posts: Post[], message: string}>('http://localhost:3000/api/posts')
    .subscribe(data => {
      this.posts = data.posts
      this.postsUpdated.next([...this.posts])
    })
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content, id: null};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
