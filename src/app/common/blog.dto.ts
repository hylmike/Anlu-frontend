export interface Blog {
  _id: string;
  topic: string;
  category: string;
  creator: string;
  content: string;
  createTime: Date;
  keywords: string;
}

export interface BlogDto {
  topic: string;
  category: string;
  creator: string;
  content: string;
  keywords: string;
}