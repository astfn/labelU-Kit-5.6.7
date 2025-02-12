import { Annotator } from '@labelu/image';
import { useCallback, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export interface IUseRotateHotkeysPayload {
  engine: Annotator;
}

export function useRotateHotkeys(payload: IUseRotateHotkeysPayload) {
  const { engine } = payload;

  const handleRotate = useCallback(
    (clockwise?: boolean) => {
      const lastRotate = engine?.backgroundRenderer?.rotate || 0;
      engine.rotate(clockwise ? lastRotate + 90 : lastRotate - 90);
    },
    [engine],
  );

  const [isRPressed, setIsRPressed] = useState(false);
  const [isAPressed, setIsAPressed] = useState(false);

  // 监听 a 键的按下和释放
  useHotkeys('a', () => setIsAPressed(true), { keydown: true, keyup: false, preventDefault: true }, []);

  useHotkeys('a', () => setIsAPressed(false), { keydown: false, keyup: true, preventDefault: true }, []);

  // 监听 r 键的按下和释放
  useHotkeys('r', () => setIsRPressed(true), { keydown: true, keyup: false, preventDefault: true }, []);

  useHotkeys('r', () => setIsRPressed(false), { keydown: false, keyup: true, preventDefault: true }, []);

  // 检查 a 和 r 是否同时按下
  useHotkeys(
    'a,r',
    () => {
      if (isRPressed && isAPressed) {
        handleRotate(false); // 逆时针旋转
      }
    },
    { preventDefault: true },
    [handleRotate, isRPressed, isAPressed],
  );

  // 保留只按下 r 时顺时针旋转的快捷键
  useHotkeys(
    'r',
    () => {
      if (!isAPressed) {
        handleRotate(true); // 顺时针旋转
      }
    },
    { preventDefault: true },
    [handleRotate, isAPressed],
  );

  return { handleRotate };
}
