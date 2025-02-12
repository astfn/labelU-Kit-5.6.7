import type { AnnotatorRef } from '@labelu/image-annotator-react';
import { Annotator as ImageAnnotator } from '@labelu/image-annotator-react';
import type { Annotator } from '@labelu/image';
import { useCallback, useRef, useState } from 'react';
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
  rect: {
    minWidth: 1,
    minHeight: 1,
    outOfImage: false,
    labels: [{ color: '#00ff1e', key: '标注框', value: '标注框' }],
  },
  // point: { maxPointAmount: 100, labels: [{ color: '#1899fb', key: '眼睛', value: 'eye' }] },
  // line: {
  //   lineType: 'line',
  //   minPointAmount: 2,
  //   maxPointAmount: 100,
  //   edgeAdsorptive: false,
  //   labels: [{ color: '#ff0000', key: '车道线', value: 'lane' }],
  // },
  // polygon: {
  //   lineType: 'line',
  //   minPointAmount: 2,
  //   maxPointAmount: 100,
  //   edgeAdsorptive: false,
  //   labels: [{ color: '#8400ff', key: '热气球', value: 'balloon' }],
  // },
  // cuboid: {
  //   labels: [{ color: '#ff6d2e', key: '汽车', value: 'car' }],
  // },
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

  return (
    <>
      <button
        onClick={() => {
          console.log(annotatorRef.current?.getAnnotations());
        }}
      >
        get result
      </button>
      <ImageAnnotator
        // toolbarRight={toolbarRight}
        primaryColor={'#0d53de'}
        samples={presetSamples}
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
