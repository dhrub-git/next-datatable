"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useState } from "react";

const customerFormSchema = z.object({
  customername: z
    .string()
    .min(2, {
      message: "Customer Name cant not be empty.",
    })
    .max(30, {
      message: "Customer not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  addressline1: z.string().max(160).min(4),
  addressline2: z.string().max(160).min(4),
  city: z.string().max(160).min(4),
  state: z.string().max(160).min(3),
  zip: z.string().max(160).min(4),
  customerId: z.number().optional(),
  builderId: z.number().optional(),
  statusId: z.number().optional(),


});

type CustomerFormValues = z.infer<typeof customerFormSchema>;
interface CustomerFormProps {
  initialValues?: Partial<CustomerFormValues>;
}

export function CustomerForm({ initialValues }: CustomerFormProps) {
  console.log("itial values >>>"+JSON.stringify(initialValues));
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });

 const [error, setError] = useState(false);

  function onSubmit(data: CustomerFormValues) {

    console.log("inside the form data>>>"+JSON.stringify(data));
   
    if ( data.builderId==null) {
      console.log("inside the if condition");
      data.builderId=1
      data.statusId=1
    }
    console.log("inside the form data 2>>>"+JSON.stringify(data));
   
    fetch('/api/customer', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
   
    }).catch ((error) => {
      alert(error);
      //setError(error);

    })
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    
    <Form {...form}>



      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-flow-row-dense grid-cols-6 gap-4 pt-2">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="customername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of Customer" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

           
          
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of Customer" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can manage verified email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="addressline1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Address Line 1"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="addressline2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Address Line 2"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="City"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="State"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="0000-9999"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
        <Button type="submit" className="py-4">
            {initialValues ? "Update Customer" : "Create Customer"}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
}
