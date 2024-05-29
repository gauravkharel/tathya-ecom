"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import { useMutation } from '@tanstack/react-query'
import { Button } from "@/components/ui/Button"
import {
    Form
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { ProductType, ProductValidator } from "@/lib/validators/product"
import { Textarea } from "@/components/ui/Textarea"
import Dropzone, { useDropzone } from 'react-dropzone'
import Combobox from "@/components/ui/Combobox"
import FormInput from "@/components/form/FormInput"

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
] as const

const genderList = [
    { label: "Man", value: 1 },
    { label: "Women", value: 2 },
    { label: "Kids", value: 3 },
    { label: "Unisex", value: 4 }
]

type FormData = z.infer<typeof ProductValidator>

export function AddProductForm() {
    const { toast } = useToast()
    const form = useForm<ProductType>({
        resolver: zodResolver(ProductValidator),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            genderId: 0,
            brand: ""
        },
    })

    const onSubmit = async (values: ProductType) => {
        console.log("This is submitted")
        const { name, description, price, brand, genderId } = values
        console.log(values)
        // try {
        //     const response = await axios.post("/product",
        //         JSON.stringify({ name, description, productImageUrl, price, brand, gender }),
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer `
        //             }
        //         },
        //     )

        toast({
            title: `${name}: is added`,
            description: "You are redirected to Product Lists."
        })
        form.reset()


        // } catch (err) {
        //     console.log(err)
        //     toast({
        //         // @ts-ignore
        //         title: err.name + ': ' + err.code
        //         // @ts-ignore
        //         description: err.message,
        //         variant: 'destructive'
        //     })
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormInput
                    control={form.control}
                    name="name"
                    label="Product Name"
                    placeholder="Enter the name"
                >
                    <Input type="name" />
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
                    //@ts-ignore
                    options={brandList}
                    placeholder="Select brand"
                    description="This is the brand that will be used in the dashboard."
                />

                <Combobox
                    control={form.control}
                    name="genderId"
                    label="Gender"
                    //@ts-ignore
                    options={genderList}
                    placeholder="Select for whom"
                    description="This is the brand that will be used in the dashboard."
                />

                {/* 
                <FormField
                    control={form.control}
                    name='images'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload product photos</FormLabel>
                            <FormControl>
                                <Dropzone {...getInputProps}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <Button type="submit">Add Product</Button>
            </form>
        </Form>
    )
}


