"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Message } from "@/model/User";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { apiResponse } from "@/types/apiResponse";
import { X } from "lucide-react";

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
    const now = new Date();
    const formattedDate = format(now, 'MMM d, yyyy h:mm a'); 
    const { toast } = useToast();
    const HandleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<apiResponse>(`/api/delete-message/${message._id}`);
            toast({
                title: response.data.message,
            })
            onMessageDelete(message._id as string);
        } catch (error) {
            console.log(error, "Error deleteing message")
            toast({
                title: "Error deleting message",
                description: "Failed to delete messsage",
                variant: 'destructive'
            })

        }
    }

    return (
        <div>
            <Card className="card-bordered">
                <CardHeader>
                    <CardTitle>{message.content}</CardTitle>
                    <div className="flex justify-between items-center">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline"><X className="w-5 h-5" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete message.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={HandleDeleteConfirm}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div>
                        {formattedDate}
                    </div>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
            </Card>

        </div>
    )
}

export default MessageCard
