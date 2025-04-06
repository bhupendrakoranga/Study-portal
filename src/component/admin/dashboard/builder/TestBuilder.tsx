import Checkbox from '@/component/ui/inputs/Checkbox';
import React, { useState } from 'react';
import {
  BuilderApiPrompt,
  PointsContainer,
  BuilderUpload,
  Points,
  Section,
  Heading,
} from './RootBuilder';

const TestBuilder = ({ id }: { id: string }) => {
  const [checked, setChecked] = useState<boolean>(true);
  const oncheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <Section>
      <BuilderUpload heading="Visual Aids Upload" isurl id={id} />
      <BuilderUpload heading="Whiteboard Canvas Set" />
      <PointsContainer>
        <Heading>Summary</Heading>
        <Checkbox label={''} checked={checked} onChange={oncheckBox} />
      </PointsContainer>
      <BuilderApiPrompt />
      <Points />
    </Section>
  );
};

export default TestBuilder;
