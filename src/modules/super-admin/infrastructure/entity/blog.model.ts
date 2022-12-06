export class BlogModel {
  constructor(
    public id: string,
    public userId: string,
    public name: string,
    public description: string,
    public websiteUrl: string,
    public createdAt: string,
  ) {}
}
