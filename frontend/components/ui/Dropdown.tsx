"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { Control, useController } from "react-hook-form"

interface Option{
    label:string,
    value: number
}

interface ComboboxProps {
    control: Control<any>;
    name: string;
    label: string;
    description?: string;
    options: Option[];
    placeholder?: string;
  }

const Dropdown: React.FC<ComboboxProps> = ({
    control,
    name,
    label,
    description,
    options,
    placeholder = "Select an option"
}) => {
    const {
        field,
        fieldState: {error},
        
    } = useController({
        name,
        control
    })
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(2)
return (
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-[200px] justify-between"
        {...field}
      >
        {field.value
           ? options.find(
            (option) => option.value === field.value
          )?.label
        : placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Search framework..." />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              //@ts-ignore
              value={option.value}
              onSelect={(currentValue) => {
                //@ts-ignore
                setValue(currentValue === value ? "" : currentValue)
                setOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === option.value ? "opacity-100" : "opacity-0"
                )}
              />
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
)
}

export default Dropdown
