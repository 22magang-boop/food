/**
 * Data Synchronization Utility
 * Handles syncing data between Admin and Landing Page via localStorage
 */

export const DataSyncKeys = {
  CARTS: 'cartsData',
  CUSTOMERS: 'customersData',
  BUSINESS_PROFILE: 'businessProfile',
  ORDERS: 'ordersData',
  NOTIFICATIONS: 'notificationsData',
} as const;

// Types
export interface Cart {
  id: string;
  name: string;
  location: string;
  status: string;
  rent: string;
  price: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  join: string;
  status: string;
}

export interface BusinessProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  description: string;
}

// Save functions
export const saveCartsToStorage = (carts: Cart[]): void => {
  try {
    localStorage.setItem(DataSyncKeys.CARTS, JSON.stringify(carts));
  } catch (error) {
    console.error('Error saving carts to localStorage:', error);
  }
};

export const saveCustomersToStorage = (customers: Customer[]): void => {
  try {
    localStorage.setItem(DataSyncKeys.CUSTOMERS, JSON.stringify(customers));
  } catch (error) {
    console.error('Error saving customers to localStorage:', error);
  }
};

export const saveBusinessProfileToStorage = (profile: BusinessProfile): void => {
  try {
    localStorage.setItem(DataSyncKeys.BUSINESS_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving business profile to localStorage:', error);
  }
};

// Load functions
export const loadCartsFromStorage = (): Cart[] | null => {
  try {
    const data = localStorage.getItem(DataSyncKeys.CARTS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading carts from localStorage:', error);
    return null;
  }
};

export const loadCustomersFromStorage = (): Customer[] | null => {
  try {
    const data = localStorage.getItem(DataSyncKeys.CUSTOMERS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading customers from localStorage:', error);
    return null;
  }
};

export const loadBusinessProfileFromStorage = (): BusinessProfile | null => {
  try {
    const data = localStorage.getItem(DataSyncKeys.BUSINESS_PROFILE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading business profile from localStorage:', error);
    return null;
  }
};

// Check if data exists
export const hasCartsData = (): boolean => {
  return localStorage.getItem(DataSyncKeys.CARTS) !== null;
};

export const hasCustomersData = (): boolean => {
  return localStorage.getItem(DataSyncKeys.CUSTOMERS) !== null;
};

export const hasBusinessProfileData = (): boolean => {
  return localStorage.getItem(DataSyncKeys.BUSINESS_PROFILE) !== null;
};

// Clear functions
export const clearAllSyncData = (): void => {
  try {
    Object.values(DataSyncKeys).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing sync data from localStorage:', error);
  }
};
