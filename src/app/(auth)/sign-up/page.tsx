"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiResponse } from "@/types/apiResponse";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/Schemas/signUpSchema";
import { useEffect, useState } from "react";

export default function page() {
    const [username, setusername] = useState("");
    const [isCheckingUsername, setisCheckingUsername] = useState(false);
    const [usernameMessage, setusernameMessage] = useState("");
    const [isSubmitting, setisSubmitting] = useState(false);
    const [debouncedUsername, setdebouncedUsername] = useState("");
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setdebouncedUsername(username);
            return () => {
                clearTimeout(timeOut);
            };
        });
    }, [username]);

    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        const checkUsernameUniqness = async () => {
            if (debouncedUsername) {
                setisCheckingUsername(true);
                setusernameMessage("");
                try {
                    const response = await axios.get<apiResponse>(
                        `/api/check-username-unique?username=${debouncedUsername}`
                    );
                    console.log(response.data);
                    setusernameMessage(response.data.message);
                } catch (error) {
                    const axiosError = error as AxiosError<apiResponse>;
                    setusernameMessage(
                        axiosError.response?.data.message ?? "Error checking username"
                    );
                } finally {
                    setisCheckingUsername(false);
                }
            }
        };

        checkUsernameUniqness();
    }, [debouncedUsername]);

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setisSubmitting(true);
        try {
            const response = await axios.post("/api/signUp", data);
            toast({
                title: "Success",
                description: response.data.message,
            });

            router.replace(`/verify/${username}`);
            setisSubmitting(false);
        } catch (error) {
            console.error("Error during sign up ", error);
            const axiosError = error as AxiosError<apiResponse>;

            let errorMessage = axiosError.response?.data.message;
            toast({
                title: "Failed",
                description: errorMessage,
                variant: "destructive",
            });
            setisSubmitting(false);
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Join True Feedback
                    </h1>
                    <p className="mb-4">Sign up to start your anonymous adventure</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="username"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setusername(e.target.value);
                                            console.log(e.target);
                                        }}
                                    />
                                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                                    {!isCheckingUsername && usernameMessage && (
                                        <p
                                            className={`text-sm ${usernameMessage === "Username is unique"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                                }`}
                                        >
                                            {usernameMessage}
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} name="email" placeholder="username" />
                                    <p className="text-muted text-gray-400 text-sm">
                                        We will send you a verification code
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        {...field}
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                    />
                                    <p className="text-muted text-gray-400 text-sm">
                                        We will send you a verification code
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Sign up"
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Already a member?{" "}
                        <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
