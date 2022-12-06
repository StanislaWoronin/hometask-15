import { UserViewModel } from '../modules/super-admin/api/dto/userView.model';
import { BlogViewModel } from '../modules/public/blogs/api/dto/blogView.model';
import { PostViewModel } from '../modules/public/posts/api/dto/postsView.model';
import { CommentViewModel } from '../modules/public/comments/api/dto/commentView.model';

export class ContentPageModel {
  constructor(
    public pagesCount: number,
    public page: number,
    public pageSize: number,
    public totalCount: number,
    public items:
      | BlogViewModel[]
      | PostViewModel[]
      | UserViewModel[]
      | CommentViewModel[],
  ) {}
}
