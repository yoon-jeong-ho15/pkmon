import { useEffect, useRef } from "react";
import { useGameStore } from "../store/useGameStore";

/**
 * encounterEnabled 상태 변화를 추적하여 playTime을 자동으로 업데이트하는 훅
 * encounterEnabled가 true인 동안의 시간을 측정하여 false로 바뀔 때 playTime에 추가
 */
export function usePlayTimeTracker() {
  const { encounterEnabled, updatePlayTime } = useGameStore();
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (encounterEnabled) {
      // encounterEnabled가 true가 되면 타이머 시작
      startTimeRef.current = Date.now();
    } else if (startTimeRef.current !== null) {
      // encounterEnabled가 false가 되면 경과 시간을 playTime에 추가
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000); // 분 단위
      updatePlayTime(elapsed);
      startTimeRef.current = null;
    }
  }, [encounterEnabled, updatePlayTime]);
}
