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
import { useEffect, useState } from "react";

const projectFormSchema = z.object({
  projectname: z
    .string()
    .min(2, {
      message: "Project Name cant not be empty.",
    })
    .max(30, {
      message: "Project must not be longer than 30 characters.",
    }),
  customername: z.string({
    required_error: "Please select an email to display.",
  }),
  addressline1: z.string().max(160).min(4),
  addressline2: z.string().max(160).min(4),
  city: z.string().max(160).min(4),
  state: z.string().max(160).min(4),
  zip: z.string().max(160).min(4),
  contract: z.string().max(160).min(4),
  projectvalue: z
    .string()
    .min(4, {
      message: "Please select a proper amount.",
    })
    .max(12),
  estimatedenddate: z.date(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export function ProjectForm() {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: "onChange",
  });
  const [customerData, setCustomerData] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect( () => {
      fetch('/api/builder/customer/1')
      .then((res) => res.json())
      .then((data) => {
        console.log("response <<<<<<<<<<>>>"+JSON.stringify(data.customers))
        setCustomerData(data.customers);
      })
  }, [])

  function onSubmit(data: ProjectFormValues) {
    //alert("inside sumit"+JSON.stringify(data));
    console.log("inside the form data>>>"+JSON.stringify(data));
   setIsLoading(true);
   console.log("inside the form data>>>"+JSON.stringify(data));
   
   fetch('/api/project', {
     method: 'POST',
     body: JSON.stringify(data)
   })
   .then((res) => res.json())
   .then((data) => {
     alert(data.message);
     setIsLoading(false);
   }).catch ((error) => {
     setError(error);
     setIsLoading(false);
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
      <div>
      {isLoading ? <p>Loading...</p> : null}
    
    </div>
    
    
    
    
    
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-flow-row-dense grid-cols-6 gap-4 pt-2">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="projectname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of the Project" {...field} />
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
              name="customername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {
                        customerData.map((cst) => {
                          
                          return (
                           /// <option key={cst.id} value={cst.id}> {cst.customer_name}</option>
                          
                          <SelectItem key={cst.id} value={cst.id}>
                           {cst.value}
                         </SelectItem>
                          )
                        })
                      }
                     
                  
                    
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Please select the customer for this project.
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
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="contract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a Update the Contract information, enter a brief description of the project, including the scope of work and any relevant details."
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
              name="projectvalue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projected Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="9,999,999.00"
                      className="border-input"
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
              name="estimatedenddate"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-3">
                  <FormLabel>Estimated End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <Button type="submit" className="py-4">
            Create Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
