import React from 'react';
import { Category, useGetCategory } from '@/api/category';
import { buildCategoryTree } from '@/lib/utils';

const NestedMenu = () => {
    const { data: categories, isLoading, isError } = useGetCategory();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading categories</div>;

    const CategoryTree: React.FC<{ category: Category }> = ({ category }) => (
            <li key={category.id} className='flex '>
                <span className="cursor-pointer hover:text-blue-600 transition-colors">
                    {category.name}
                </span>
                {category.children && category.children.length > 0 && (
                    <ul className=" pl-4 mt-2 font-medium new">
                        {category.children.map((child: Category) => (
                            <CategoryTree key={child.id} category={child} />
                        ))}
                    </ul>
                )}
            </li>
    );

    //@ts-ignore
    const categoryTree = buildCategoryTree(categories);
    return (
        <div className="pt-4 container text-lg border-b border-zinc-200 max-w-7xl h-full mx-auto sm:flex items-start justify-start gap-3 ">
            <ul className="flex text-xl gap-6" >
                {categoryTree.map((category: Category) => (
                    <CategoryTree key={category.id} category={category} />
                ))}
            </ul>
        </div>
    );
};

export default NestedMenu;