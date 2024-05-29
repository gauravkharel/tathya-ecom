import { useController, Control } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Command";
import { CheckIcon } from "lucide-react";

interface Option {
  label: string;
  value: number | string;
}

interface ComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  description?: string;
  options: Option[];
  placeholder?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  control,
  name,
  label,
  description,
  options,
  placeholder = "Select an option"
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !field.value && "text-muted-foreground"
              )}
              {...field}
            >
              {field.value
                ? options.find(
                    (option) => option.value === field.value
                  )?.label
                : placeholder}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              className="h-9"
            />
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {Array.isArray(options) && options.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    field.onChange(option.value);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      option.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};

export default Combobox;
