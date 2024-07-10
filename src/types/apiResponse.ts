import { Message } from "@/model/User";

//typescript
export interface apiResponse{
    success:boolean;
    message:string;
    isAcceptedingMessage?:boolean;
    messages?:Array<Message>
}