import { IPaginationConfig } from "./auth.interfaces"




export class ResponseApi {
  public status:string=''
  public result: any
  public message: string=''
  public pagingDetails! : IPaginationConfig
  public statusCode : string=''
  static result: any

}
