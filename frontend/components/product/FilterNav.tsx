import React, { useState, useEffect, useMemo } from 'react';
import { Category, useGetCategory } from '@/api/category';
import { buildCategoryTree } from '@/lib/utils';
import { useProductFilter } from '@/providers/FilterProvider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Checkbox } from "@/components/ui/Checkbox";

const FilterNav = () => {
  const { data: category, isLoading, isError } = useGetCategory();
  const { filters, handleFilterChange, setFilters } = useProductFilter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.categories || []);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategories(filters.categories || []);
  }, [filters.categories]);

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    let updatedCategories: string[];
    if (checked) {
      updatedCategories = [...selectedCategories, categoryName];
    } else {
      updatedCategories = selectedCategories.filter(cat => cat !== categoryName);
    }
    setSelectedCategories(updatedCategories);

    const updatedFilters = {
      ...filters,
      categories: updatedCategories,
    };
    setFilters(updatedFilters);
    handleFilterChange(updatedFilters);
  };

  const handleAccordionChange = (value: string[]) => {
    setExpandedCategories(value);
  };

  const getCategoryPath = (category: Category, categories: Category[]): string[] => {
    for (const cat of categories) {
      if (cat.id === category.id) return  [cat.id.toString()];;
      if (cat.children) {
        const path = getCategoryPath(category, cat.children);
        if (path.length) return  [cat.id.toString(), ...path]
      }
    }
    return [];
  };

  const getExpandedCategories = useMemo(() => {
    if (!category) return [];
    const expanded = new Set<string>();
    selectedCategories.forEach(selectedCat => {
      const flatCategories = category.flatMap(cat => [cat, ...(cat.children || [])]);
      const selectedCategory = flatCategories.find(cat => cat.name === selectedCat);
      if (selectedCategory) {
        const path = getCategoryPath(selectedCategory, category);
        path.forEach(id => expanded.add(`category-${id}`));
      }
    });
    return Array.from(expanded);
  }, [category, selectedCategories]);

  useEffect(() => {
    setExpandedCategories(prevExpanded => {
      const newExpanded = getExpandedCategories;
      return [...new Set([...prevExpanded, ...newExpanded])];
    });
  }, [getExpandedCategories]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categories</div>;

  const CategoryTree: React.FC<{ category: Category, depth: number }> = ({ category, depth }) => {
    const hasChildren = category.children && category.children.length > 0;
  
    return (
      <AccordionItem value={`category-${category.id}`} className={`pl-${depth * 4}`}>
        {hasChildren ? (
          <AccordionTrigger className="py-1 hover:no-underline">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                onClick={(e) => e.stopPropagation()}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          </AccordionTrigger>
        ) : (
          <div className="py-1 pl-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          </div>
        )}
        {hasChildren && (
          <AccordionContent>
            {category?.children?.map((child: Category) => (
              <CategoryTree key={child.id} category={child} depth={depth + 1} />
            ))}
          </AccordionContent>
        )}
      </AccordionItem>
    );
  };
  
  //@ts-ignore
  const categoryTree = buildCategoryTree(category);

  return (
    <div className="pt-4 container text-lg border-b border-zinc-200 max-w-7xl h-full mx-auto sm:flex items-start justify-start gap-3 hidden">
      <Accordion 
        type="multiple" 
        className="w-full" 
        value={expandedCategories} 
        onValueChange={handleAccordionChange}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="category-all"
            checked={selectedCategories.length === 0}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedCategories([]);
                setFilters({ ...filters, categories: [] });
                handleFilterChange({ ...filters, categories: [] });
              }
            }}
          />
          <label
            htmlFor="category-all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            All Categories
          </label>
        </div>
        {categoryTree.map((category: Category) => (
          <CategoryTree key={category.id} category={category} depth={0} />
        ))}
      </Accordion>
    </div>
  );
};

export default FilterNav;