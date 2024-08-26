"use client"

import { createContext, useContext, useState } from "react"

export type FilterType ={
    categories?: string[] | void
    brands?: string[]
}

interface FilterContextValue {
    filters: FilterType,
    handleFilterChange: (filters: FilterType) => void
    setFilters: (filters: FilterType) => void
}

const defaultFilterValue: FilterContextValue = {
   filters:{},
   handleFilterChange: () => {},
   setFilters: () => {},
}

export const FilterContext = createContext<FilterContextValue>(defaultFilterValue)

export const useProductFilter = () => useContext(FilterContext);
    
export const FilterProvider = ({children}: {children: React.ReactNode}) => {
    const [filters, setFilters] = useState<FilterType>({})
    
    const handleFilterChange = (newFilters: FilterType) => {
        setFilters(prevFilters => {
            const updatedFilters: FilterType = { ...prevFilters };

            for (const key in newFilters) {
                if (Object.prototype.hasOwnProperty.call(newFilters, key)) {
                    const filterKey = key as keyof FilterType;
                    const newValues = newFilters[filterKey];
                    
                    if (newValues) {
                        updatedFilters[filterKey] = Array.from(new Set([
                            ...(prevFilters[filterKey] || []),
                            ...newValues
                        ]));
                    }
                }
            }

            return updatedFilters;
        });
      }
  
    const value ={
        filters,
        setFilters,
        handleFilterChange
    }

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}