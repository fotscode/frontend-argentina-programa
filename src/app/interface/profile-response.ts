import { Profile } from "./profile";

export interface ProfileResponse{
  timeStamp:Date;
  statusCode:number;
  status:string;
  reason:string;
  message:string;
  developerMessage:string;
  data: { profiles?: Profile[],profile?:Profile};
}
