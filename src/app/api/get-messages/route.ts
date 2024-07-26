import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import {User} from "next-auth";
import {getServerSession} from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET(request:Request){
    await dbConnect();
    const session = await getServerSession(authOptions);

    const _user:User = session?.user;

    //check if user exist or not
    if(!session || !_user){
        return Response.json(
            {
              success: false,
              message: "Not authenticated",
            },
            {
              status: 401
            }
          );
    }

    const userId = new mongoose.Types.ObjectId(_user._id);
    try {
        const user = await UserModel.aggregate([
            {
                $match : {_id : userId}
            },
            {
                $unwind : '$messages'
            },
            {
                $sort : {'messages.createdAt':-1}
            },
            {
                $group : {
                    _id : '$_id',
                    messages : {$push : '$messages'}
                }
            }
        ]).exec();

        if(!user || user.length === 0){
            return Response.json(
                {
                  success: false,
                  message: "User not found",
                },
                {
                  status: 404
                }
              );
        }

        return Response.json(
            {
              message:user[0].messages,
            },
            {
              status: 200
            }
          );
        
    } catch (error) {
        console.log("Error while fetching messages : ",error);
        return Response.json(
            {
              success: false,
              message: "Error while fetching messages (internal error)",
            },
            {
              status: 500
            }
          );
    }
    
}
