"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import build from "next/dist/build";
import { Input } from "@/components/ui/input";

const projectSettingsFormSchema = z.object({
  type: z.enum(["fixed", "cost", "none"], {
    required_error: "You need to select a notification type.",
  }),
  framework: z.enum(["buildpayz", "fairtrading", "other"], {
    required_error: "You need to select a notification type.",
  }),
  milestone_completion: z.string().optional(),
  variance_auto_acceptance: z.boolean().default(false).optional(),
  mandatory_variance_payment_lag: z.boolean().default(false).optional(),
  failed_transfer_auto_retry: z.boolean().default(false).optional(),
  customer_email: z.boolean(),
  customer_phone: z.boolean(),
  builder_email: z.boolean(),
  builder_phone: z.boolean(),
  custemer_bsb: z.number().optional(),
  customer_account_number: z.number().optional(),
  builder_bsb: z.number().optional(),
  builder_account_number: z.number().optional(),
  last_transfer_date: z.date().optional(),
});

type ProjectSettingsFormValues = z.infer<typeof projectSettingsFormSchema>;

// Maz - this can come from your database or API.
const defaultValues: Partial<ProjectSettingsFormValues> = {
  milestone_completion: "5 Days",
  variance_auto_acceptance: false,
  mandatory_variance_payment_lag: true,
  failed_transfer_auto_retry: true,
};

export function ProjectSettingsForm() {
  const form = useForm<ProjectSettingsFormValues>({
    resolver: zodResolver(projectSettingsFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProjectSettingsFormValues) {
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
        <div className="grid grid-flow-row-dense grid-cols-3 gap-4 pt-2  space-x-10">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg">Contract Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-2"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="fixed" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Fixed Amount
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="cost" />
                      </FormControl>
                      <FormLabel className="font-normal">Cost Plus</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="framework"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg">Contract Framework</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-2 "
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="buildpayz" />
                      </FormControl>
                      <FormLabel className="font-normal">BuildPayz</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="fairtrading" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Fair Trading
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal">Other</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex-row space-y-4">
            <FormField
              control={form.control}
              name="milestone_completion"
              render={({ field }) => (
                <FormItem className="items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Milestone completion
                    </FormLabel>
                    <FormDescription>(raise dispute in)</FormDescription>
                  </div>
                  <FormControl>
                    <Input placeholder="Name of Customer" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="variance_auto_acceptance"
              render={({ field }) => (
                <FormItem className="items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Variance Auto Acceptance
                    </FormLabel>
                    <FormDescription></FormDescription>
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mandatory_variance_payment_lag"
              render={({ field }) => (
                <FormItem className="items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Mandatory Variance Payment Lag
                    </FormLabel>
                    <FormDescription></FormDescription>
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="failed_transfer_auto_retry"
              render={({ field }) => (
                <FormItem className="items-center justify-between ">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Failed Transfer Auto Retry
                    </FormLabel>
                    <FormDescription></FormDescription>
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-5 space-y-0">
                <FormItem>
                  <FormLabel className="text-base">
                    Customer Contact Details
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Customer Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="Enter Customer Phone Number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormItem>
                  <FormLabel className="text-base">
                    Builder Contact Details
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Builder Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="Enter Builder Phone Number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              </FormItem>
            )}
          />
        </div>
        <div className="rounded-lg border p-4">
          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-5 space-y-0">
                <FormItem>
                  <FormLabel className="text-base">
                    Customer Bank Details
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="BSB" {...field} />
                  </FormControl>
                  <FormControl>
                    <Input placeholder="Account Number" {...field} />
                  </FormControl>
                </FormItem>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormItem>
                  <FormLabel className="text-base">
                    Builder Bank Details
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="BSB" {...field} />
                  </FormControl>
                  <FormControl>
                    <Input placeholder="Account Number" {...field} />
                  </FormControl>
                </FormItem>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update Project Settings</Button>
      </form>
    </Form>
  );
}
