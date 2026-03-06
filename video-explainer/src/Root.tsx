import React from 'react';
import {Composition} from 'remotion';
import {PcpExplainer} from './PcpExplainer';
import {FPS, WIDTH, HEIGHT, TOTAL_DURATION_FRAMES} from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PcpExplainer"
        component={PcpExplainer}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
