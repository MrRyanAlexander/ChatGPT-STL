
import { handleApiError, createValidationError } from '@/utils/errorUtils';

export class StorageService {
  private static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static setItem<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.isStorageAvailable()) {
          reject(createValidationError('Local storage is not available'));
          return;
        }

        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
        resolve();
      } catch (error) {
        reject(handleApiError(error));
      }
    });
  }

  static getItem<T>(key: string, defaultValue?: T): Promise<T | null> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.isStorageAvailable()) {
          resolve(defaultValue || null);
          return;
        }

        const item = localStorage.getItem(key);
        if (item === null) {
          resolve(defaultValue || null);
          return;
        }

        const parsedItem = JSON.parse(item);
        resolve(parsedItem);
      } catch (error) {
        console.error(`Error parsing stored item for key "${key}":`, error);
        resolve(defaultValue || null);
      }
    });
  }

  static removeItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.isStorageAvailable()) {
          resolve();
          return;
        }

        localStorage.removeItem(key);
        resolve();
      } catch (error) {
        reject(handleApiError(error));
      }
    });
  }

  static clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.isStorageAvailable()) {
          resolve();
          return;
        }

        localStorage.clear();
        resolve();
      } catch (error) {
        reject(handleApiError(error));
      }
    });
  }

  static getAllKeys(): string[] {
    if (!this.isStorageAvailable()) {
      return [];
    }

    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }
}
