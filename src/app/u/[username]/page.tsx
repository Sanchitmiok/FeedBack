'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { CardHeader, CardContent, Card, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { Textarea } from "@/components/ui/textarea"
import { useParams } from "next/navigation";
import { string } from "zod";
import { messageSchema } from "@/Schemas/messageSchema";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { apiResponse } from "@/types/apiResponse";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Link from "next/link";
const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";
const specialChar = '||';
const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};





function page() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const { completion, isLoading: isSuggestLoading, error } = useCompletion({
    api: '/api/suggest-message',
    initialCompletion: initialMessageString
  });
  console.log(completion)
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema)
  })
  const messageContent = form.watch('content');
  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  }
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setisLoading(true);
    try {
      const response = await axios.post<apiResponse>('/api/send-message', {
        username,
        ...data
      });
      console.log(response.data.message)
      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    } finally {
      setisLoading(false);
    }
  }

  const fetchSuggestedMessage = async () => {
    try {

    } catch (error) {
      console.error('Error fetching messages: ', error)
    }
  }
  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your anonymous message here"
                    className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (<Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>) : (
              <Button type="submit" disabled={isLoading || !messageContent}>Submit</Button>
            )}
          </div>
        </form>
      </Form>
      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button onClick={fetchSuggestedMessage} className="my-4"
            disabled={isSuggestLoading}>Suggest messages</Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Message</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4" >
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6"/>
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>

    </div>
  )
}

export default page
