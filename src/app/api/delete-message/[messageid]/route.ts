import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";

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
        const updatedUser = await UserModel.updateOne(
            { _id: _user._id },
            { $pull: { messages: { _id: messageId } } }
        );
        if (updatedUser.modifiedCount === 0) {
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
