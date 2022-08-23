import { Education } from '../education'

export interface EducationResponse {
  timeStamp: Date
  statusCode: number
  status: string
  reason: string
  message: string
  developerMessage: string
  data: { educations?: Education[]; education?: Education }
}
