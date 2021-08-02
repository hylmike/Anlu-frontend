export class RegisterBook {
  bookTitle!: string;
  isbnCode: string;
  categry!: string;
  author!: string;
  language!: string;
  style!: string;     //eBook or audioBook
  publisher: string;
  publishDate: Date;
  purchaseDate: Date;
  price: number;
  coverPic: string;
  bookFile: string;
  description: string;
  keyword: string;
}

export interface Book {
  _id: string;
  bookTitle: string;
  isbnCode: string;
  category: string;
  bookType: string;
  author: string;
  language: string;
  publisher: string;
  publishDate: Date;
  purchaseDate: Date;
  price: number;
  coverPic: string;
  bookFile: string;
  desc: string;
  keyword: string;
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