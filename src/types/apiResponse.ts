import { Message } from "@/model/User";

//typescript
export interface apiResponse{
    success:boolean;
    message:string;
    isAcceptingMessages?:boolean;
    messages?:Array<Message>
}