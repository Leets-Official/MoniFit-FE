export type CategoryType = 'food' | 'shop' | 'hospital' | 'home' | 'etc';

// 개별 지출 내역의 구조
export interface ExpenseItem {
  id: string;      
  amount: number;  
}

// 하나의 카테고리 아이템이 가질 전체 데이터 구조
export interface CategoryData {
  type: CategoryType;
  totalAmount: number;    
  items: ExpenseItem[];   
}