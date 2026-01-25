import { useState } from 'react';
import FoodIcon from '@/assets/icons/colored/colored_food.svg';
import HospitalIcon from '@/assets/icons/colored/colored_hospital.svg';
import ShopIcon from '@/assets/icons/colored/colored_shoping.svg';
import HomeIcon from '@/assets/icons/colored/colored-home.svg';
import StarIcon from '@/assets/icons/colored/colored-star.svg';
import VerticalIndicator from '../common/icons/VerticalIndicator';
import ChevronRightIcon from '@/assets/icons/general/chevron-right.svg';
import ExpenseDetail from './ExpenseDetail';
import type { CategoryData } from './types';

interface CategoryItemProps {
  data: CategoryData;
}

const categoryIcons: Record<string, string> = {
  food: FoodIcon,
  hospital: HospitalIcon,
  shop: ShopIcon,
  home: HomeIcon,
  etc: StarIcon,
};

const categoryNames: Record<string, string> = {
  food: '식비',
  hospital: '의료',
  shop: '쇼핑',
  home: '생활',
  etc: '기타',
};

const CategoryItem = ({ data }: CategoryItemProps) => {
    const {type, items: initialitems} = data;
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState(initialitems);
    const toggleAccordion = () => setIsOpen(!isOpen);
    const totalAmount = items.reduce((acc, cur) => acc + cur.amount, 0);
    const handleAddItem = (amount: number) => {
        const newItem = {
            id: Date.now().toString(),
            amount,
        };
        setItems([...items, newItem]);
    };
    const handleDeleteItem = (id: string) => { 
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };
    const handleUpdateItem = (id: string, newAmount: number) => {
        setItems((prev) => prev.map(item => item.id === id ? { ...item, amount: newAmount } : item));
    };
    const currentIcon = categoryIcons[type] || StarIcon;
    const currentName = categoryNames[type] || '기타';
  return (
    <div className="flex gap-4 w-full px-4">
      <div className="self-stretch flex items-start">
        <div className='h-full w-[5px]'>
          <VerticalIndicator />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center py-5 cursor-pointer" onClick={toggleAccordion}>
          <div className="flex items-center gap-[7px]">
            <img src={currentIcon} alt="icon" />
            <span className="text-gray-10 font-medium text-[15px]">{currentName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-10 font-medium text-[14px]">{totalAmount.toLocaleString()}원</span>
            <img src={ChevronRightIcon} alt="icon" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
        {isOpen && (
        <div>
          <ExpenseDetail 
          items={items} 
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
          onUpdateItem={handleUpdateItem} />
        </div>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;