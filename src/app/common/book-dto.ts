export interface BookDto {
  bookTitle: string;
  isbnCode: string;
  category: string;
  format: string; //eBook or audioBook
  author: string;
  language: string;
  publisher: string;
  publishDate: string;
  purchaseDate: string;
  coverPic: string;
  bookFile: string;
  price: string;
  desc: string;
  keywords: string;
  initialScore: string;
  creator: string;
  isActive: string;
}

export interface Book {
  _id: string;
  bookTitle: string;
  isbnCode: string;
  category: string;
  format: string;
  author: string;
  language: string;
  publisher: string;
  publishDate: Date;
  purchaseDate: Date;
  price: number;
  coverPic: string;
  bookFile: string;
  desc: string;
  keywords: string;
  isActive: boolean;
  createDate: Date;
  creator: string;
  readTimes: number;
  readDuration: number;
  initialScore: number;
  popularScore: number;
  comments: [string];
  readHistory: [string];
}

export interface SearchBookDto {
  format: string;
  category: string;
  bookTitle: string;
  author: string;
  publishYear: string;
}

export interface BookComment {
  _id: string;
  book: string;
  readerName: string;
  title: string;
  comment: string;
  createTime: Date;
}

export interface BookWishList {
  _id: string;
  bookTitle: string;
  readerID: string;
  language: string;
  createTime: Date;
  status: string;
}

export interface BookReadRecord {
  _id: string;
  book: string;
  readerID: string;
  startTime: Date;
  duration: number;
}

export interface BookCommentDto {
  bookID: string;
  readerName: string;
  title: string;
  comment: string;
}

export interface CreateBookWishDto {
  bookTitle: string;
  readerID: string;
  language: string;
}

export interface UpdateWishStatusDto {
  WishID: string;
  status: string;
}

export interface ReadRecordDto {
  bookID: string;
  readerID: string;
  startTime: Date;
  currentPage: number;
  duration: number;
}