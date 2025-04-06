import Button from '@/component/ui/buttons/Button';
import HorizontalLineWithText from '@/component/ui/HorizontalLineWithText';
import DropzoneComponent from '@/component/ui/inputs/DropzoneComponent';
import InputBox from '@/component/ui/inputs/InputBox';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { BLACK_TEXT, WHITE } from '@/styles/color';
import { StyledTextarea } from '@/styles/globleStyle';
import {
  typographyBody1Bold,
  typographyCaption,
  typographyH6SemiBold,
} from '@/styles/typography';
import { guttersPx } from '@/styles/variables';
import styled from '@emotion/styled';
import React from 'react';
import TestBuilder from './TestBuilder';
import VideoBuilder from './VideoBuilder';
import { useFormik } from 'formik';
import { validationVideoSchema } from '@/utils/form/ValidationSchema';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { uploadUrlVideo, uploadVideo } from '@/lib/api/api';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const RootBuilder = ({ id }: { id: string }) => {
  const { activeTab } = useGlobalContext();

  return (
    <>
      {activeTab === 1 && <VideoBuilder id={id} />}
      {(activeTab === 2 || activeTab === 3) && <TestBuilder id={id} />}
    </>
  );
};

export default RootBuilder;

interface BuilderUploadProps {
  heading: string;
  isurl?: boolean;
  id?: string;
}

export const BuilderUpload: React.FC<BuilderUploadProps> = ({
  heading,
  isurl,
  id,
}) => {
  const { mutateAsync } = useCustomMutation(uploadVideo, ['videoupload']);

  const params = useSearchParams();
  const pid = params.get('pid');
  const formik = useFormik({
    initialValues: {
      video_file: null,
      video_url: '',
    },
    validationSchema: validationVideoSchema,
    onSubmit: async (values) => {
      try {
        if (pid && id && values?.video_file) {
          const response = await mutateAsync({
            video_file: values?.video_file,
            unitbuilder_id: pid,
            id: id,
          });
          if (response) {
            toast.success('Uploaded successfully');
            formik.resetForm();
          }
        }
      } catch (err) {
        toast.error("Something went's wrong");
        console.log(err);
      }
    },
  });

  const uploadUrl = async () => {
    try {
      const response = await uploadUrlVideo({
        video_url: formik?.values?.video_url,
        unitbuilder_id: pid,
        id: id,
      });
      if (response) {
        toast.success('Uploaded successfully');
        formik.resetForm();
      }
    } catch (err) {
      toast.error("Something went's wrong");
    }
  };

  return (
    <BuilderContainer>
      <Heading>{heading}</Heading>
      <form onSubmit={formik.handleSubmit}>
        <DropzoneComponent
          text="Drag and drop a video file"
          fileTypes="MP4, WEBM, OGG (Max. 800x400px)"
          onFileSelect={(file) => formik.setFieldValue('video_file', file)}
          acceptedFormats={['video/mp4', 'video/webm', 'video/ogg']}
          error={
            formik.errors.video_file && formik.touched.video_file
              ? formik.errors.video_file
              : undefined
          }
        />
        <BtnContainer>
          <VideoUplaod type="submit">Upload</VideoUplaod>
        </BtnContainer>
      </form>
      {isurl && (
        <>
          <HorizontalLineWithText />
          <Heading>Import from URL</Heading>
          <UrlImportContainer>
            <InputBox
              onChange={formik.handleChange}
              value={formik.values?.video_url}
              id="video_url"
              name="video_url"
              placeholder="Add file URL"
              required
            />
            <UploadBtn type="button" onClick={uploadUrl}>
              Upload
            </UploadBtn>
          </UrlImportContainer>
        </>
      )}
    </BuilderContainer>
  );
};

export const BuilderApiPrompt: React.FC = () => (
  <BuilderContainer>
    <Heading>API prompt</Heading>
    <StyledTextarea rows={10} />
  </BuilderContainer>
);

export const Points: React.FC = () => (
  <PointsContainer>
    <Heading marginBottom="0px">Points Achieved</Heading>
    <PointsBtn>20</PointsBtn>
  </PointsContainer>
);

export const Section = styled.section`
  display: block;
  max-width: 912px;
  margin: auto;
`;

export const BuilderContainer = styled.div`
  box-shadow: 0px 4px 21px 1px #2463eb0d;
  background: ${WHITE};
  padding: 40px 60px;
  border-radius: 12px;
  margin-bottom: ${guttersPx.extraLarge};
`;

export const PointsContainer = styled(BuilderContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
`;

interface HeadingProps {
  marginBottom?: string;
}

export const Heading = styled.p<HeadingProps>`
  ${typographyBody1Bold};
  color: ${BLACK_TEXT};
  margin-bottom: ${({ marginBottom = guttersPx.mediumHalf }) => marginBottom};
`;

const UrlImportContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & > div {
    width: 100%;
  }

  input {
    width: 100%;
    border-radius: 0;
    height: 40px;
    border-top-left-radius: ${guttersPx.smallHalf};
    border-bottom-left-radius: ${guttersPx.smallHalf};
    background: #f1f4f9;
    ${typographyCaption}
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${guttersPx.medium};
`;

const UploadBtn = styled(Button)`
  min-width: 117px;
  min-height: auto;
  border-radius: 0;
  height: 40px;
  border-top-right-radius: ${guttersPx.smallHalf};
  border-bottom-right-radius: ${guttersPx.smallHalf};
`;

const VideoUplaod = styled(UploadBtn)`
  border-radius: ${guttersPx.smallHalf};
`;

const PointsBtn = styled(UploadBtn)`
  border-radius: ${guttersPx.smallHalf};
  min-width: 240px;
  min-height: 56px;
  ${typographyH6SemiBold}
`;
