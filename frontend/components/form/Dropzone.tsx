import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { ChangeEventHandler, FC } from "react";

export const DropzoneField: FC<{ name: string; multiple?: boolean }> = ({
    name,
    multiple,
    ...rest
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            render={({ field: { onChange } }) => (
                <Dropzone
                    multiple={multiple}
                    onChange={(e) =>
                        onChange(
                            multiple
                                ? e.target.files
                                : e.target.files?.[0] ?? null
                        )
                    }
                    {...rest}
                />
            )}
            name={name}
            control={control}
            defaultValue=""
        />
    );
};

const Dropzone: FC<{
    multiple?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ multiple, onChange, ...rest }) => {
    const { getRootProps, getInputProps } = useDropzone({
        multiple,
        ...rest,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps({ onChange })} />
        </div>
    );
};