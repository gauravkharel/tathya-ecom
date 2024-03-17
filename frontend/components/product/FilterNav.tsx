import { FC } from 'react'
import FilterInput from './FilterOption'
interface FilterNavProps {
  
}

const FilterNav: FC<FilterNavProps> = ({}) => {
  return <div>
    <FilterInput />
    <FilterInput />
    <FilterInput />
    <FilterInput />
    <FilterInput />
  </div>
}

export default FilterNav