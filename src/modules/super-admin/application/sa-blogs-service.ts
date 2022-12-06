import { QueryParametersDTO } from '../../../global-model/query-parameters.dto';
import { ContentPageModel } from '../../../global-model/contentPage.model';
import { paginationContentPage } from '../../../helper.functions';
import { SaBlogsRepository } from '../infrastructure/sa-blogs.repository';
import { BindBlogDTO } from '../api/dto/bind-blog.dto';
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaBlogsService {
  constructor(protected saBlogsRepository: SaBlogsRepository) {}

  async getBlogs(query: QueryParametersDTO): Promise<ContentPageModel | null> {
    const blogs = await this.saBlogsRepository.getBlogs(query);

    if (!blogs) {
      return null;
    }

    const totalCount = await this.saBlogsRepository.getTotalCount(
      query.searchNameTerm,
    );

    return paginationContentPage(
      query.pageNumber,
      query.pageSize,
      blogs,
      totalCount,
    );
  }

  async bindBlog(params: BindBlogDTO) {
    return this.saBlogsRepository.bindBlog(params);
  }
}
