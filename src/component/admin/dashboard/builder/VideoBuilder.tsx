import React from 'react';
import {
  BuilderApiPrompt,
  BuilderUpload,
  Points,
  Section,
} from './RootBuilder';

const VideoBuilder = ({ id }: { id: string }) => {
  return (
    <Section>
      <BuilderUpload heading="Upload Video" isurl id={id} />
      <BuilderApiPrompt />
      <Points />
    </Section>
  );
};

export default VideoBuilder;
