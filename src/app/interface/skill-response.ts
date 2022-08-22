import { Skill } from "./skill";

export interface SkillResponse{
  timeStamp:Date;
  statusCode:number;
  status:string;
  reason:string;
  message:string;
  developerMessage:string;
  data: { skills?: Skill[],skill?:Skill};
}
