import styled from 'styled-components';
import { useTranslation } from '@labelu/i18n';

import { useTool } from '@/context/tool.context';

import { ReactComponent as ScaleResetIcon } from './assets/scale-reset.svg';
import { ReactComponent as FitContainerIcon } from './assets/fit-container.svg';
import { ReactComponent as ARotateIcon } from './assets/a-rotate-icon.svg';
import { ReactComponent as CRotateIcon } from './assets/c-rotate-icon.svg';
import { useRotateHotkeys } from './useRotateHotkeys';

const FooterBar = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(235, 236, 240, 1);
  padding: 0 16px;
  font-size: 14px;
  user-select: none;

  .labelu-svg-icon {
    font-size: 1.25rem;
    color: #666;
  }
`;

const Right = styled.div`
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
  const { engine } = useTool();
  // @ts-ignore
  const { t } = useTranslation();

  const { handleRotate } = useRotateHotkeys({ engine });
  return (
    <FooterBar>
      <Right>
        <BarItem onClick={() => handleRotate(true)}>
          <ARotateIcon className="labelu-svg-icon" />
          {t('rotate')}
        </BarItem>
        <BarItem onClick={() => handleRotate(false)}>
          <CRotateIcon className="labelu-svg-icon" />
          {t('rotate')}
        </BarItem>
        <BarItem
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
        </BarItem>
      </Right>
    </FooterBar>
  );
}
