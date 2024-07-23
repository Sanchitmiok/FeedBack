import dbConnect from "@/lib/dbConnect";

import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserIsVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserIsVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 90000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "UserEmail already exist",
          },
          { status: 500 }
        );
      } else {
        const hasedPassword = await bcrypt.hash(password, 10);

        existingUserByEmail.password = hasedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        existingUserByEmail.verifyCodeExpiry = expiryDate;

        await existingUserByEmail.save();
      }
    } else {
      //if user email is not found that means we have to create new user 

      //password encryption
      const hasedPass = await bcrypt.hash(password, 10);

      //set expiry date
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hasedPass,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessage: true,
        isVerified: false,
        messages: [],
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (emailResponse.success) {

      return Response.json(
        {
          success: true,
          message: "User verified succesfully",
        },
        { status: 200}
      );
      
    } else {

      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
