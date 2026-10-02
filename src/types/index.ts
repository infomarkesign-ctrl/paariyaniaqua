export type ProductCategory = 'meat' | 'fish' | 'eggs';

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  short_description: string;
  long_description: string;
  packaging_options: string[];
  unit_label: string;
  base_price: number;
  image_url: string;
  gallery_urls: string[];
  is_featured: boolean;
  sub_type: string;
  sort_order: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  packaging: string;
  quantity: number;
}

export interface EnquiryFormData {
  product_id?: string | null;
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

export interface OrderFormData {
  business_name: string;
  contact_person: string;
  phone: string;
  email: string;
  delivery_address: string;
  gstin: string;
  delivery_instructions: string;
  agreed_terms: boolean;
}
