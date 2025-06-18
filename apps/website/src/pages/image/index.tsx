import type { AnnotatorRef, ImageSample } from '@labelu/image-annotator-react';
import { Annotator as ImageAnnotator, ShortcutKeyOperationManualTooltip } from '@labelu/image-annotator-react';
import type { Annotator } from '@labelu/image';
import { useCallback, useMemo, useRef, useState } from 'react';
import message from 'antd/es/message';

import { add } from '@/components/FancyInput';
import { FancyAttributeList } from '@/components/CustomFancy/ListAttribute.fancy';
import { FancyCategoryAttribute } from '@/components/CustomFancy/CategoryAttribute.fancy';

add('list-attribute', FancyAttributeList);
add('category-attribute', FancyCategoryAttribute);

const presetSamples = [
  {
    url: import.meta.env.BASE_URL + 'point.jpg',
    name: 'point',
    id: 'point',
    meta: {
      width: 1280,
      height: 800,
      rotate: 0,
    },
    data: {
      line: [
        {
          id: 's51ogmrkbvr',
          type: 'line',
          points: [
            {
              id: 'dyg8sya4qsk',
              x: 273.4273504273504,
              y: 77.58974358974359,
            },
            {
              id: '0nyaisky1y9',
              x: 329.71794871794873,
              y: 53.24786324786325,
            },
            {
              id: 'y2pmopu36k',
              x: 372.3162393162393,
              y: 86.71794871794873,
            },
            {
              id: 'rk8j0sxbfg',
              x: 372.3162393162393,
              y: 86.71794871794873,
            },
            {
              id: 'wr6smfy4so',
              x: 408.8290598290599,
              y: 56.2905982905983,
            },
            {
              id: 'fsy7x7pxw09',
              x: 410.35042735042737,
              y: 54.769230769230774,
            },
          ],
          label: 'lane',
          order: 7,
        },
        {
          id: 'wfwzrvxwfcl',
          type: 'line',
          points: [
            {
              id: 'vl89ool2igl',
              x: 548.7948717948718,
              y: 48.68376068376069,
            },
            {
              id: 'fadz0ba6x0s',
              x: 498.5897435897436,
              y: 89.76068376068378,
            },
            {
              id: 'gs7trfc31ac',
              x: 600.5213675213676,
              y: 88.23931623931625,
            },
          ],
          label: 'lane',
          order: 8,
        },
      ],
      point: [
        {
          order: 4,
          id: 'bqw0d7x500a',
          label: 'eye',
          x: 845.4615384615386,
          y: 181.04273504273505,
        },
        {
          order: 5,
          id: '52mlv4l5cfm',
          label: 'eye',
          x: 860.6752136752137,
          y: 325.5726495726496,
        },
        {
          order: 6,
          id: 'iyubk5d99h',
          label: 'eye',
          x: 757.2222222222223,
          y: 448.8034188034188,
        },
      ],
      rect: [
        {
          id: 'i0e0tf5mubk',
          x: 174.53846153846155,
          y: 108.01709401709402,
          label: '标注框',
          width: 541.6068376068376,
          height: 275.3675213675214,
          order: 1,
        },
        {
          id: '1beazgwaima',
          x: 743.5299145299145,
          y: 505.09401709401715,
          label: '标注框',
          width: 150.61538461538464,
          height: 91.28205128205128,
          order: 2,
        },
        {
          id: '24vl3akomqk',
          x: 116.72649572649571,
          y: 506.61538461538464,
          label: '标注框',
          width: 124.75213675213676,
          height: 115.62393162393164,
          order: 3,
        },
      ],
      polygon: [
        {
          id: 'h4ppmjtu4n8',
          type: 'line',
          points: [
            {
              id: 'y88u2g6tqmf',
              x: 752.6581196581197,
              y: 214.51282051282053,
            },
            {
              id: '9lgbdgfh51f',
              x: 795.2564102564103,
              y: 325.5726495726496,
            },
            {
              id: 'ty7xxywkels',
              x: 822.6410256410257,
              y: 234.29059829059833,
            },
            {
              id: 'd3ib6f7hfhr',
              x: 752.6581196581197,
              y: 216.03418803418805,
            },
            {
              id: 'xc9bj4iu6e8',
              x: 743.5299145299145,
              y: 342.3076923076923,
            },
          ],
          label: 'balloon',
          order: 9,
        },
        {
          id: 'vw06u1dvl2f',
          type: 'line',
          points: [
            {
              id: 'ckxylo1s7nm',
              x: 758.7435897435898,
              y: 50.20512820512821,
            },
            {
              id: '5d3o4j7wzpc',
              x: 813.5128205128206,
              y: 76.06837606837608,
            },
            {
              id: 'x285pc8zdm',
              x: 777,
              y: 101.93162393162395,
            },
            {
              id: 'fncqli1nqzm',
              x: 740.4871794871796,
              y: 69.98290598290599,
            },
            {
              id: 'udzosg8fxao',
              x: 754.1794871794872,
              y: 138.44444444444446,
            },
            {
              id: 'ygzjmzejs5f',
              x: 757.2222222222223,
              y: 53.24786324786325,
            },
          ],
          label: 'balloon',
          order: 10,
        },
      ],
      cuboid: [
        {
          id: 'mcub9r00vj',
          direction: 'front',
          front: {
            tl: {
              x: 399.70085470085473,
              y: 464.01709401709405,
            },
            tr: {
              x: 494.02564102564105,
              y: 464.01709401709405,
            },
            br: {
              x: 494.02564102564105,
              y: 527.9145299145299,
            },
            bl: {
              x: 399.70085470085473,
              y: 527.9145299145299,
            },
          },
          back: {
            tl: {
              x: 413.3931623931624,
              y: 454.8888888888889,
            },
            tr: {
              x: 507.71794871794873,
              y: 454.8888888888889,
            },
            br: {
              x: 507.71794871794873,
              y: 518.7863247863248,
            },
            bl: {
              x: 413.3931623931624,
              y: 518.7863247863248,
            },
          },
          label: 'car',
          order: 11,
        },
        {
          id: 'agnblthja5s',
          direction: 'front',
          front: {
            tl: {
              x: 603.5641025641027,
              y: 572.0341880341881,
            },
            tr: {
              x: 723.7521367521368,
              y: 572.0341880341881,
            },
            br: {
              x: 723.7521367521368,
              y: 576.5982905982906,
            },
            bl: {
              x: 603.5641025641027,
              y: 576.5982905982906,
            },
          },
          back: {
            tl: {
              x: 555.6543709701605,
              y: 535.5213675213676,
            },
            tr: {
              x: 675.8424051581947,
              y: 535.5213675213676,
            },
            br: {
              x: 675.8424051581947,
              y: 540.0854700854701,
            },
            bl: {
              x: 555.6543709701605,
              y: 540.0854700854701,
            },
          },
          label: 'car',
          order: 12,
        },
        {
          id: 'ron4skoqbd',
          direction: 'front',
          front: {
            tl: {
              x: 617.2564102564103,
              y: 664.8376068376069,
            },
            tr: {
              x: 801.3418803418804,
              y: 664.8376068376069,
            },
            br: {
              x: 801.3418803418804,
              y: 677.0085470085471,
            },
            bl: {
              x: 617.2564102564103,
              y: 677.0085470085471,
            },
          },
          back: {
            tl: {
              x: 317.54700854700855,
              y: 587.2478632478633,
            },
            tr: {
              x: 501.63247863247864,
              y: 587.2478632478633,
            },
            br: {
              x: 501.63247863247864,
              y: 599.4188034188035,
            },
            bl: {
              x: 317.54700854700855,
              y: 599.4188034188035,
            },
          },
          label: 'car',
          order: 13,
        },
      ],
      text: [],
      tag: [],
    },
  },
  {
    url: 'https://picsum.photos/300/150',
    name: 'point',
    id: 'point',
    meta: {
      // width: 1280,
      // height: 800,
      rotate: 45,
    },
    data: {
      line: [],
      point: [],
      rect: [],
      polygon: [],
      cuboid: [],
      text: [],
      tag: [],
    },
  },
];

const defaultConfig = {
  backgroundColor: '#f3f5f8',
  disableCursor: true,
  rect: {
    minWidth: 1,
    minHeight: 1,
    outOfImage: false,
    labels: [{ color: '#00ff1e', key: '标注框', value: '标注框' }],
  },

  point: { maxPointAmount: 100, labels: [{ color: '#1899fb', key: '眼睛', value: 'eye' }] },
  line: {
    lineType: 'line',
    minPointAmount: 2,
    maxPointAmount: 100,
    edgeAdsorptive: false,
    labels: [{ color: '#ff0000', key: '车道线', value: 'lane' }],
  },
  polygon: {
    lineType: 'line',
    minPointAmount: 2,
    maxPointAmount: 100,
    edgeAdsorptive: false,
    labels: [{ color: '#8400ff', key: '热气球', value: 'balloon' }],
  },
  cuboid: {
    labels: [{ color: '#ff6d2e', key: '汽车', value: 'car' }],
  },
};

export default function ImagePage() {
  const annotatorRef = useRef<AnnotatorRef>(null);
  const [config, _setConfig] = useState(defaultConfig);
  const [currentSample, _updateSample] = useState(presetSamples[0]);
  const [_result, setResult] = useState<any>({});

  const onError = useCallback((err: any) => {
    message.error(err.message);
  }, []);

  const onLoad = useCallback((engine: Annotator) => {
    const updateSampleData = () => {
      console.log('事件侦听');
      setResult(() => ({
        ...annotatorRef.current?.getAnnotations(),
      }));
    };
    engine.on('add', updateSampleData);

    engine.on('change', updateSampleData);

    engine.on('labelChange', updateSampleData);
  }, []);

  const currentSampleIndex = useRef<number>(0);

  const changeSampleApi = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
      // setTimeout(reject, 1000);
    });
  };
  const checkoutSample = async () => {
    console.log(annotatorRef.current?.getAnnotations());
    await changeSampleApi();
    currentSampleIndex.current = currentSampleIndex.current == 0 ? 1 : 0;
    annotatorRef.current.changeSample(presetSamples[currentSampleIndex.current]);
  };

  const requestEdit = useCallback(() => {
    return false;
  }, []);

  return (
    <>
      <button
        onClick={() => {
          console.log(annotatorRef.current?.getAnnotations());
        }}
      >
        get result
      </button>
      <button
        onClick={() => {
          checkoutSample();
        }}
      >
        change sample
      </button>
      <ShortcutKeyOperationManualTooltip>
        {/* <ShortcutKeyOperationManualTooltip
        customItems={({ isMacOS, KbdCpn, MouseRightClickCpn }) => {
          return [
            {
              label: '字段标注',
              key: 'field annotation',
              hotkeys: [
                {
                  name: '快捷键1',
                  content:
                    isMacOS === 'MacOS' ? (
                      <>
                        <KbdCpn>⌘</KbdCpn> + <KbdCpn>Z</KbdCpn>
                      </>
                    ) : (
                      <>
                        <KbdCpn>Ctrl</KbdCpn> + <KbdCpn>Z</KbdCpn> + <MouseRightClickCpn />
                      </>
                    ),
                },
              ],
            },
          ];
        }}
      > */}
        <b style={{ textAlign: 'center' }}>操作手册</b>
      </ShortcutKeyOperationManualTooltip>
      <ImageAnnotator
        // toolbarRight={toolbarRight}
        // samples={presetSamples}
        requestEdit={requestEdit}
        primaryColor={'#0d53de'}
        // hiddenToolbar
        hiddenSidebar
        attributePanelFooterRender={({ handleClear }) => (
          <>
            <button
              onClick={() => {
                handleClear();
              }}
            >
              clear
            </button>
            <button>标注完成</button>
          </>
        )}
        ref={annotatorRef}
        offsetTop={148}
        editingSample={currentSample}
        config={config}
        onLoad={onLoad}
        onError={onError}
      />
    </>
  );
}
