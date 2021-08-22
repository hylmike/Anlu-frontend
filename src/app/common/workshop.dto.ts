export interface Workshop {
  _id: string;
  topic: string;
  place: string;
  organizer: string;
  subscriber: string[];
  startTime: Date;
  duration: number;
  poster: string;
  creator: string;
  createTime: Date;
  remark: string;
}

export interface Subscriber {
  _id: string;
  workshop: string;
  readerID: string;
  SubscribeTime: Date;
}

export interface RegisterWorkshopDto {
  topic: string;
  place: string;
  organizer: string;
  startTime: string;
  duration: string;
  poster: string;
  creator: string;
  remark: string;
}

export interface UpdateWorkshopDto {
  place: string;
  organizer: string;
  startTime: string;
  duration: string;
  poster: string;
  remark: string;
}

export interface SubWorkshopDto {
  workshop: string;
  readerID: string;
}

export interface UnsubWorkshopDto {
  subID: string;
}