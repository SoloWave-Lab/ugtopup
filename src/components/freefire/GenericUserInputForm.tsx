import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormField as CustomFormField } from "@/types/product";

interface GenericUserInputFormProps {
  onDataChange: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  fields: CustomFormField[];
}

export const GenericUserInputForm = ({ onDataChange, initialData, fields }: GenericUserInputFormProps) => {
  // Build dynamic schema from fields
  const schemaShape: Record<string, z.ZodType<any>> = {};
  fields.forEach(field => {
    if (field.required) {
      schemaShape[field.name] = field.validation || z.string().min(1, `${field.label} is required`);
    } else {
      schemaShape[field.name] = z.string().optional();
    }
  });

  const formSchema = z.object(schemaShape);
  type FormData = z.infer<typeof formSchema>;

  const defaultValues: Record<string, string> = {};
  fields.forEach(field => {
    defaultValues[field.name] = (initialData?.[field.name] as string) || "";
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as FormData,
    mode: "onChange",
  });

  // Watch and notify parent of changes
  form.watch((data) => {
    if (form.formState.isValid) {
      onDataChange(data as Record<string, any>);
    }
  });

  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Enter Details</h2>
      
      <Form {...form}>
        <form className="space-y-4 sm:space-y-5">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-foreground font-medium">
                    {field.label} {field.required && <span className="text-primary">*</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={field.placeholder}
                      type={field.type}
                      className="h-12 text-base bg-input border-border focus:border-primary focus:ring-primary"
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </div>
  );
};
