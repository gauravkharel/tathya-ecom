import { FC } from 'react'

interface CategoryProps {

}

const Category: FC<CategoryProps> = ({ }) => {
  return (
    <div className='sticky h-10'>
      <div>Browse by category</div>
      <div> list of category</div>
    </div>
  )
}

export default Category