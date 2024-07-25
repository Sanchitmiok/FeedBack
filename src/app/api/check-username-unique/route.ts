import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { z } from "zod";
import { usernameValidation } from "@/Schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParams);

    console.log(result); //TODO: just for knowledge

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid query parameter",
        },
        {
          status: 400,
        }
      );
    }

    const { username } = result.data;
    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 200,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
