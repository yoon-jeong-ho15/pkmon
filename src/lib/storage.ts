/**
 * Storage 추상화 인터페이스
 * localStorage와 chrome.storage를 동일한 인터페이스로 사용
 */
export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

/**
 * LocalStorage 어댑터
 */
export class LocalStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    try {
      console.log("[LocalStorageAdapter] getItem called:", key);
      return localStorage.getItem(key);
    } catch (error) {
      console.error("LocalStorage getItem error:", error);
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      console.log("[LocalStorageAdapter] setItem called:", key);
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("LocalStorage setItem error:", error);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("LocalStorage removeItem error:", error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("LocalStorage clear error:", error);
    }
  }
}

/**
 * In-Memory 어댑터 (테스트용)
 */
export class InMemoryStorageAdapter implements StorageAdapter {
  private storage: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.storage.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

/**
 * 기본 스토리지 인스턴스
 * 테스트 환경에서는 InMemoryStorageAdapter로 교체 가능
 */
export let storage: StorageAdapter = new LocalStorageAdapter();

/**
 * 스토리지 어댑터 교체 (테스트용)
 */
export function setStorageAdapter(adapter: StorageAdapter): void {
  storage = adapter;
}
