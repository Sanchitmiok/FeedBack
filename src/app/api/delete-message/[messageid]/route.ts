import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Message } from "@/model/User";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

export async function DELETE(
    request: Request,
    { params }: { params: { messageId: string } }
) {
    const messageId = params.messageId;
    await dbConnect();
    const session = await getServerSession(authOptions);

    const _user: User = session?.user;

    //check if user exist or not
    if (!session || !_user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated",
            },
            {
                status: 401,
            }
        );
    }
    try {

        // Always convert user._id and messageId to ObjectId
        const userId = new Types.ObjectId(_user._id as string);
        const msgId = new Types.ObjectId(messageId);

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { messages: { _id: msgId } } },
            { new: true }
        );
        // updatedUser null ho sakta hai agar user nahi mila
        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }
        // Check if message was actually deleted
        const messageStillExists = updatedUser.messages.some(
            (msg: any) => msg._id.toString() === messageId
        );
        if (messageStillExists) {
            // If the message still exists, it means it was not deleted

            return Response.json(
                {
                    success: false,
                    message: "Message not found or already deleted",
                },
                {
                    status: 404,
                }
            );
        }
        // console.log("Message deleted succesfully")

        return Response.json(
            {
                success: true,
                message: "Message deleted successfully",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("Error while deleting messages : ", error);
        return Response.json(
            {
                success: false,
                message: "Error while deleting messages (internal error)",
            },
            {
                status: 500,
            }
        );
    }
}
      
