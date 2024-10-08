"use client"
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function Page() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-600 text-white ">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            PureFeedback - Where your identity remains a secret.
          </p>
        </section>

        <Carousel
        plugins={[Autoplay({ delay: 4000 })]}
       opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-lg md:max-w-xl mt-2"
    >
      <CarouselContent className="-mt-1  h-[165px] ">
        {messages.map((message,index)=> (
          <CarouselItem key={index} className="pt-2 md:basis-1/2">
          <div className="p-1">
            <Card>
              <CardHeader>
              <CardTitle className='text-lg'>{message.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
            </Card>
          </div>
        </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

      </main>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white ">
        © 2023 PureFeedback. All rights reserved.
      </footer>
    </>
  )
}

export default Page
