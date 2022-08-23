import { Project } from "../project";

export interface ProjectResponse{
  timeStamp:Date;
  statusCode:number;
  status:string;
  reason:string;
  message:string;
  developerMessage:string;
  data: { projects?: Project[],project?:Project};
}
