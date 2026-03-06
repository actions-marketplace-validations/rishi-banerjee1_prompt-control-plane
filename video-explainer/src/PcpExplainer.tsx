import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {FPS, SCENE_DURATIONS} from './theme';
import {Hook} from './scenes/Hook';
import {WhatIsPcp} from './scenes/WhatIsPcp';
import {Powerhouses} from './scenes/Powerhouses';
import {CiIntegration} from './scenes/CiIntegration';
import {Adoption} from './scenes/Adoption';
import {Closing} from './scenes/Closing';

export const PcpExplainer: React.FC = () => {
  const d = SCENE_DURATIONS;
  let offset = 0;

  const scenes = [
    {Component: Hook, duration: d.hook},
    {Component: WhatIsPcp, duration: d.whatIsPcp},
    {Component: Powerhouses, duration: d.powerhouses},
    {Component: CiIntegration, duration: d.ciIntegration},
    {Component: Adoption, duration: d.adoption},
    {Component: Closing, duration: d.closing},
  ];

  return (
    <AbsoluteFill>
      {scenes.map(({Component, duration}, i) => {
        const from = offset;
        offset += duration * FPS;
        return (
          <Sequence key={i} from={from} durationInFrames={duration * FPS}>
            <Component />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
