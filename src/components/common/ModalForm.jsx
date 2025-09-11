import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function ModalForm({
  title = "Form",
  description,
  fields = [], // [{ id, label, type, placeholder, required }]
  onSubmit,
  submitText = "Submit",
  secondaryButton,
  className,
  isOpen,
  onClose,
  ...props
}) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={cn("flex w-[400px]", className)} {...props}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {fields.map((field) => (
                <div key={field.id} className="grid gap-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  {field.type === "select" ? (
                    <Select
                      value={formData[field.id]}
                      onValueChange={(val) =>
                        setFormData((prev) => ({ ...prev, [field.id]: val }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={field.placeholder || "Select..."}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.id]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {submitText}
                </Button>
                {secondaryButton && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={secondaryButton.onClick}
                  >
                    {secondaryButton.text}
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-4 text-center text-sm">
              <Button type="button" className="underline" onClick={onClose}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
