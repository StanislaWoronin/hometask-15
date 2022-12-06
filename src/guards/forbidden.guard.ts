import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { BloggerBlogRepository } from '../modules/blogger/infrastructure/blogs.repository';

export class ForbiddenGuard implements CanActivate {
  constructor(protected blogsRepository: BloggerBlogRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const blog = await this.blogsRepository.getBlogById(req.param.blogId);

    if (!blog) {
      throw new NotFoundException();
    }

    if (blog.userId !== req.user.id) {
      throw new ForbiddenException();
    }

    return true;
  }
}
