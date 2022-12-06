import { Injectable } from '@nestjs/common';
import { QueryParametersDTO } from '../../../../global-model/query-parameters.dto';
import { BlogModel } from '../../../super-admin/infrastructure/entity/blog.model';
import { BlogSchema } from '../../../super-admin/infrastructure/entity/blog.schema';
import { giveSkipNumber } from '../../../../helper.functions';

@Injectable()
export class BlogsRepository {
  async getBlogs(query: QueryParametersDTO): Promise<BlogModel[]> {
    return BlogSchema.find(
      { name: { $regex: query.searchNameTerm, $options: 'i' } },
      { _id: false, __v: false },
    )
      .sort({ [query.sortBy]: query.sortDirection === 'asc' ? 1 : -1 })
      .skip(giveSkipNumber(query.pageNumber, query.pageSize))
      .limit(query.pageSize)
      .lean();
  }

  async getTotalCount(searchNameTerm: string): Promise<number> {
    return BlogSchema.countDocuments({
      name: { $regex: searchNameTerm, $options: 'i' },
    });
  }

  async getBlogById(id: string): Promise<BlogModel | null> {
    return BlogSchema.findOne({ id: id }, { _id: false, __v: false });
  }
}
