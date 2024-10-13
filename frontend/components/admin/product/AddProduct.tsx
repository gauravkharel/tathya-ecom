"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/Textarea";
import Combobox from "@/components/ui/Combobox";
import FormInput from "@/components/form/FormInput";
import { ProductFormData, ProductSchema } from "@/lib/validators/product.validator";
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
interface FileWithPreview extends File {
    preview: string;
}

const brandList = [
    { label: "Tathya Orginals", value: "Tathya Orginals" },
    { label: "Brocrade", value: "Brocrade" },
    { label: "Huba", value: "Huba" },
    { label: "Mak", value: "Mak" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Russian", value: "Russian" },
    { label: "Japanese", value: "Japanese" },
    { label: "Korean", value: "Korean" },
    { label: "Chinese", value: "Chinese" },
]

export function AddProductForm() {
    const { toast } = useToast();
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const form = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema)
    });


    const onDrop = useCallback((acceptedFiles: File[]) => {
        const filesWithPreview = acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );
        setFiles(filesWithPreview);
        form.setValue('images', filesWithPreview.map(file => file.name));
    }, [form]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxFiles: 5,
        maxSize: 5 * 1024 * 1024 // 5MB
    });

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const onSubmit = async (values: ProductFormData) => {
        try {

            toast({
                title: `${values.name} has been added`,
                description: "You will be redirected to Product Lists."
            });

            form.reset();
            setFiles([]);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : "There was a problem adding the product.",
                variant: 'destructive'
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                    control={form.control}
                    name='images'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload product photos</FormLabel>
                            <FormControl>
                                <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Drop the files here ...</p>
                                    ) : (
                                        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                                    )}
                                </div>
                            </FormControl>
                            {files.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {files.map((file) => (
                                        <div key={file.name} className="relative">
                                            <Image
                                                width={200}
                                                height={200}
                                                src={file.preview}
                                                alt={file.name}
                                                className="object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFiles(files.filter(f => f.name !== file.name));
                                                    form.setValue('images', files.filter(f => f.name !== file.name).map(f => f.name));
                                                }}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormInput
                    control={form.control}
                    name="name"
                    label="Product Name"
                    placeholder="Enter the name"
                >
                    <Input type="text" />
                </FormInput>

                <FormInput
                    control={form.control}
                    name="description"
                    label="Product Description"
                >
                    <Textarea
                        placeholder="Write the product detail here"
                        className="resize-none"
                    />
                </FormInput>

                <FormInput
                    control={form.control}
                    name="price"
                    label="Price (Npr)"
                    placeholder="Enter the price"
                >
                    <Input type="number" />
                </FormInput>

                <Combobox
                    control={form.control}
                    name="brand"
                    label="Brand"
                    options={brandList}
                    placeholder="Select brand"
                    description="This is the brand that will be used in the dashboard."
                />
                <Button type="submit">Add Product</Button>
            </form>
        </Form>
    );
}