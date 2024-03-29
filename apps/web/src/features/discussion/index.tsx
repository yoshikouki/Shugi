import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useWebSocket } from "../websocket/use-websocket";

const formSchema = z.object({
  discussionTheme: z.string().min(1),
});

export default function Discussion() {
  const [isDiscussing, setIsDiscussing] = useState(false);
  const ws = useWebSocket();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discussionTheme: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isDiscussing) {
      setIsDiscussing(false);
    } else {
      setIsDiscussing(true);
      ws?.send(JSON.stringify(values));
    }
    console.log(values);
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="discussionTheme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What to discuss?</FormLabel>
                <FormControl>
                  <Textarea placeholder="What to discuss?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isDiscussing ? <Pause /> : <Play />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
