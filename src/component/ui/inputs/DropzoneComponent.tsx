import React from 'react';
import styled from '@emotion/styled';
import { WHITE } from '@/styles/color';
import { typographyBody2 } from '@/styles/typography';
import Image from '../Image';

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DropzoneLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: ${WHITE};
  &:hover {
    background-color: #f3f4f6;
  }
  &.dark {
    background-color: ${WHITE};
    border-color: #b1bfd0;
  }
`;

const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1.25rem; /* pt-5 */
  padding-bottom: 1.5rem; /* pb-6 */
`;

const UploadText = styled.p`
  margin: 8px 0;
  ${typographyBody2};
  color: #132a00;
  span {
    color: #1f4690;
    font-weight: 500;
  }
`;

const FileTypesText = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  &.dark {
    color: ${WHITE};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

interface DropzoneComponentProps {
  text: string;
  fileTypes: string;
  onFileSelect: (file: File | null) => void;
  acceptedFormats: string[];
  error?: string;
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({
  text,
  fileTypes,
  onFileSelect,
  acceptedFormats,
  error,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    if (file && acceptedFormats.includes(file.type)) {
      onFileSelect(file);
    } else {
      onFileSelect(null);
    }
  };

  return (
    <FlexCenter>
      <DropzoneLabel htmlFor="dropzone-file" className="dark">
        <DropzoneContent>
          <Image
            src="/assets/png/upload.png"
            alt="upload"
            width={80}
            height={60}
          />
          <UploadText>
            {text}, or <span className="dark">browse</span>
          </UploadText>
          <FileTypesText className="dark">{fileTypes}</FileTypesText>
        </DropzoneContent>
        <HiddenInput
          id="dropzone-file"
          type="file"
          name="video_file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileChange}
        />
      </DropzoneLabel>
      {error && (
        <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
      )}
    </FlexCenter>
  );
};

export default DropzoneComponent;
