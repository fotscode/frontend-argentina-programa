import { Experience } from "./experience";

export interface ExperienceResponse{
  timeStamp:Date;
  statusCode:number;
  status:string;
  reason:string;
  message:string;
  developerMessage:string;
  data: { experiences?: Experience[],experience?:Experience};
}
