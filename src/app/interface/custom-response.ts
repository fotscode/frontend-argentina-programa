import { Profile } from "./profile";

export interface CustomResponse{
  timeStamp:Date;
  statusCode:number;
  status:string;
  reason:string;
  message:string;
  developerMessage:string;
  data: { profiles?: Profile[],profile?:Profile};
}
