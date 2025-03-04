import styled from 'styled-components';

import { useTool } from '@/context/tool.context';

import { ReactComponent as AmplifyIcon } from './assets/amplify-icon.svg';
import { ReactComponent as ReduceIcon } from './assets/reduce-icon.svg';
import { ReactComponent as ARotateIcon } from './assets/a-rotate-icon.svg';
import { ReactComponent as CRotateIcon } from './assets/c-rotate-icon.svg';
import { useRotateHotkeys } from './useRotateHotkeys';

const FooterBar = styled.div`
  padding: 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-color: #f0f0f0;

  .labelu-svg-icon {
    font-size: 1.25rem;
    color: #333333;
  }
`;

const Right = styled.div`
  padding: 12px 24px;
  border-radius: 8px;
  /* background: rgba(0, 0, 0, 0.15); */
  display: flex;
  gap: 1rem;
`;

const BarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    color: var(--color-primary);

    .labelu-svg-icon {
      color: var(--color-primary);
    }
  }
`;

export default function Footer() {
  const { engine, config } = useTool();
  // @ts-ignore

  const { handleRotate } = useRotateHotkeys({ engine });
  return (
    <FooterBar style={{ backgroundColor: config?.backgroundColor || 'unset' }}>
      <Right>
        <BarItem onClick={() => handleRotate(false)}>
          <CRotateIcon className="labelu-svg-icon" />
        </BarItem>
        <BarItem onClick={() => handleRotate(true)}>
          <ARotateIcon className="labelu-svg-icon" />
        </BarItem>
        <BarItem onClick={() => engine.rotateAccording2Multiples(1.2)}>
          <AmplifyIcon />
        </BarItem>
        <BarItem onClick={() => engine.rotateAccording2Multiples(0.8)}>
          <ReduceIcon />
        </BarItem>
        {/* <BarItem
          onClick={() => {
            engine?.fit();
          }}
        >
          <FitContainerIcon className="labelu-svg-icon" />
          {t('fitContainer')}
        </BarItem>
        <BarItem
          onClick={() => {
            engine?.resetScale();
          }}
        >
          <ScaleResetIcon className="labelu-svg-icon" />
          {t('rawScale')}
        </BarItem> */}
      </Right>
    </FooterBar>
  );
}
