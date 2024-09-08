import React from 'react';
import { Category, useGetCategory } from '@/api/category';
import { buildCategoryTree } from '@/lib/utils';
import Link from 'next/link';
import { NavigationMenu } from '../ui/NavigationMenu';
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu';
import { GetProductsQueryParams, useGetProducts } from '@/api/products';
import { FilterType, useProductFilter } from '@/providers/FilterProvider';

type FilterComponentProps = {
    onFilterChange: ({ categories, brands }: GetProductsQueryParams) => void;
};

const NestedMenu = () => {
    const { data: category, isLoading, isError } = useGetCategory();
    const { filters, handleFilterChange, setFilters } = useProductFilter()
    const handleChange = (categoryName: string) => {
        const updatedFilters = {
            ...filters,
            categories: [categoryName],
        };
        setFilters(updatedFilters);
        handleFilterChange(updatedFilters);
    };
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading categories</div>;

    const CategoryTree: React.FC<{ category: Category }> = ({ category }) => {
        if (category.children && category.children.length > 0) {
            return (
                <li key={category.id} className='flex flex-row'>
                    <NavigationMenu>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger asChild className='p-1  font-medium'>
                                <button type="button" onClick={() => handleChange(category.name)} className="cursor-pointer flex hover:text-gray-600 transition-colors">
                                    {category.name}
                                </button>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="w-64 px-10 py-4 gap-2 text-medium text-gray-600 transition-colors">
                                {category.children.map((child: Category) => (
                                    <CategoryTree key={child.id} category={child} />
                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenu>
                </li>
            );
        } else {
            return (
                <li key={category.id}>
                    <Link href={'/products'} type="button" onClick={() => handleChange(category.name)} className="cursor-pointer flex hover:text-black text-medium">
                        {category.name}
                    </Link>
                </li>
            );
        }
    };

    //@ts-ignore
    const categoryTree = buildCategoryTree(category);

    return (
        <div className="pt-4 container text-lg border-b border-zinc-200 max-w-7xl h-full mx-auto sm:flex items-start justify-start gap-3 hidden">
            <ul className='flex flex-row gap-4'>
                <Link href={'/products'} className=''>All</Link>
                {categoryTree.map((category: Category) => (
                    <CategoryTree key={category.id} category={category} />
                ))}
            </ul>
        </div>


    );
};

export default NestedMenu;
