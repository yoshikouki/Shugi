import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  openApiKey: z.string().refine((value) => /^sk-\w+$/.test(value), {
    message: "Invalid API key format. Please use the sk-**** format.",
  }),
  discussionTheme: z.string().min(1),
});

export default function Discussion() {
  const [isDiscussing, setIsDiscussing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openApiKey: "",
      discussionTheme: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isDiscussing) {
      setIsDiscussing(false);
    } else {
      setIsDiscussing(true);
    }
    console.log(values);
  };

  useEffect(() => {
    fetch("http://localhost:3000/").then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="openApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Key />
                  OpenAI API Key
                </FormLabel>
                <FormControl>
                  <Input placeholder="sk-***" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
