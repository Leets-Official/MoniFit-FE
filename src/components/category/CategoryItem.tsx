import FoodIcon from '@/assets/icons/colored/colored_food.svg'
// import HospitalIcon from '@/assets/icons/colored/colored_hospital.svg'
// import ShopIcon from '@/assets/icons/colored/colored_shop.svg'
// import HomeIcon from '@/assets/icons/colored/colored_home.svg'
// import StarIcon from '@/assets/icons/colored/colored_star.svg'
import VerticalIndicator from '../common/icons/VerticalIndicator';
import ChevronRightIcon from '@/assets/icons/general/chevron-right.svg';
import ExpenseDetail from './ExpenseDetail';

const CategoryItem = () => {
  return (
    <div className="flex gap-4 w-full px-4">
      {/* 1. 보라색 선: 높이가 자동으로 늘어남 */}
      <div className="self-stretch">
          <VerticalIndicator />
      </div>

      <div className="flex-1">
        {/* 2. 요약 영역 */}
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center gap-[7px]">
            <img src={FoodIcon} alt="icon" />
            <span className="text-gray-10 font-medium text-[15px]">식비</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-10 font-medium text-[14px]">135,000원</span>
            <img src={ChevronRightIcon} alt="icon" />
          </div>
        </div>

        {/* 3. 상세 내역 영역 */}
        <div>
            <ExpenseDetail />
        </div>
      </div>
    </div>
  );
};
export default CategoryItem;