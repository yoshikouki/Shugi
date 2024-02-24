import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useWebSocket } from "../websocket/use-websocket";

const formSchema = z.object({
  openApiKey: z.string().refine((value) => /^sk-\w+$/.test(value), {
    message: "Invalid API key format. Please use the sk-**** format.",
  }),
});

export default function Config() {
  const ws = useWebSocket();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openApiKey: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    ws?.send(JSON.stringify(values));
  };

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
                  <Input
                    placeholder="sk-***"
                    type="password"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
