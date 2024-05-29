import { Control, useController } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/Form";

interface FormFieldProps {
    control: Control<any>;
    name: string;
    label: string;
    description?: string;
    placeholder?: string;
    children: string | JSX.Element | JSX.Element[];
}


 const FormInput: React.FC<FormFieldProps> = ({
    control,
    name,
    label,
    description,
    placeholder = "Select an option",
    children,
}) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl {...field}>
                        {children}
                    </FormControl>
                    <FormMessage />
                    {description && <FormDescription>{description}</FormDescription>}
                    {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
            )}
        />
    )
}

export default FormInput