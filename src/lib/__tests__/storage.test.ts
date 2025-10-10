import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryStorageAdapter } from "../storage";

describe("storage.ts - 추상화 계층 테스트", () => {
  let storage: InMemoryStorageAdapter;

  beforeEach(() => {
    storage = new InMemoryStorageAdapter();
  });

  describe("InMemoryStorageAdapter", () => {
    it("setItem/getItem 기본 동작", () => {
      storage.setItem("test-key", "test-value");
      expect(storage.getItem("test-key")).toBe("test-value");
    });

    it("존재하지 않는 키는 null 반환", () => {
      expect(storage.getItem("non-existent")).toBeNull();
    });

    it("removeItem으로 삭제", () => {
      storage.setItem("key", "value");
      expect(storage.getItem("key")).toBe("value");

      storage.removeItem("key");
      expect(storage.getItem("key")).toBeNull();
    });

    it("clear로 전체 삭제", () => {
      storage.setItem("key1", "value1");
      storage.setItem("key2", "value2");
      storage.setItem("key3", "value3");

      storage.clear();

      expect(storage.getItem("key1")).toBeNull();
      expect(storage.getItem("key2")).toBeNull();
      expect(storage.getItem("key3")).toBeNull();
    });

    it("같은 키에 덮어쓰기", () => {
      storage.setItem("key", "old-value");
      storage.setItem("key", "new-value");

      expect(storage.getItem("key")).toBe("new-value");
    });

    it("JSON 데이터 저장/불러오기", () => {
      const data = {
        username: "테스트유저",
        level: 5,
        items: ["포션", "몬스터볼"],
      };

      storage.setItem("game-data", JSON.stringify(data));
      const retrieved = JSON.parse(storage.getItem("game-data")!);

      expect(retrieved).toEqual(data);
      expect(retrieved.username).toBe("테스트유저");
      expect(retrieved.items).toHaveLength(2);
    });
  });
});
