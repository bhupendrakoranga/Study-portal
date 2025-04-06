'use client';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BottomDrawer from '../ui/drawer/BottomDrawer';
import { BLACK_TEXT, DARK_BLUE, GREY, NEUTRALS_GREY8 } from '@/styles/color';
import { mqMax } from '@/styles/base';
import Image from '../ui/Image';
import Button from '../ui/buttons/Button';
import { typographyBody1Bold, typographyH6SemiBold } from '@/styles/typography';
import SearchFieldWithDropdown, {
  Option,
} from '../ui/inputs/SearchFieldWithDropdown';
import { guttersPx } from '@/styles/variables';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const DrawerForm = ({
  pageType = '',
  title = '',
  listOption = [],
  isExpand = true,
  onOpenModal,
  link = '/',
  query,
  isTitle = false,
}: {
  pageType?: string;
  title?: string;
  isExpand?: boolean;
  listOption?: Option[];
  onOpenModal?: (arg?:string) => void;
  link?: string;
  query?: any;
  isTitle?: boolean;
}) => {
  const [isShow, setIsShow] = useState(isExpand);
  const [selectedOption, setSelectedOption] = useState<Option>(listOption[0]);
  const searchParams = useSearchParams();
  const bottomText =
    searchParams.get('title') ?? searchParams.get('school') ?? '';
  useEffect(() => {
    setSelectedOption(listOption[0]);
  }, [listOption.length]);

  const onClose = () => setIsShow(false);
  const onOpen = () => setIsShow(true);
  return (
    <BottomDrawer
      show={isShow}
      onOpen={onOpen}
      title={selectedOption?.label ?? listOption[0]?.label}
      isExpand={isExpand}
      schoolName={bottomText}
    >
      <DrawerContent
        pageType = {pageType}
        onClose={onClose}
        onOpenModal={onOpenModal}
        title={title}
        listOption={listOption}
        link={link}
        query={query}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isTitle={isTitle}
      />
    </BottomDrawer>
  );
};

export default DrawerForm;

export const DrawerContent = ({
  pageType,
  onClose,
  onOpenModal,
  setSelectedOption,
  title,
  listOption,
  link,
  query,
  selectedOption,
  isTitle = false,
}: {
  pageType: string;
  onClose: () => void;
  onOpenModal?: (arg:string) => void;
  title: string;
  listOption: Option[];
  link: string;
  query?: any;
  selectedOption: Option;
  setSelectedOption: (arg: Option) => void;
  val?: Option;
  isTitle?: boolean;
}) => {
  const isOpen = (arge3:string) => {
    if (onOpenModal) {
      onOpenModal(arge3);
    }
  };
  const router = useRouter();

  function paramsData(dataItems: any){
    let qtData:any;
    switch(dataItems){
      case 'school':
        qtData = {
          param1: 'school',
          param2: 'school_id',
        }
      break;
      case 'class':
        qtData = {
          param1: 'class',
          param2: 'class_id',
        }
      break;
      default:
        qtData = {
          param1: 'title',
          param2: 'grade_subject_id',
        }
        break;
    }
    return qtData;
  }

  const qt = paramsData(pageType);
  
  const handleNextClick = () => {
    if (selectedOption) {
      router.push(
        `${link}?${qt?.param1}=${query ?? selectedOption.label?.split(',')[0]}&${qt?.param2}=${selectedOption?.value}`,
      );
    } else {
      toast.error('Please select an option before proceeding.');
    }
  };
  
  return (
    <ContentContainer>
      <ImageContainer>
        <StyledImage
          quality={100}
          priority
          src="/assets/png/sideimg.png"
          alt="bg"
          width={100}
          height={100}
        />
      </ImageContainer>
      <RightContent>
        <StyledIconButton onClick={onClose}>
          <Image
            src="/assets/png/maximize.png"
            alt="maximize"
            width={24}
            height={24}
          />
        </StyledIconButton>

        <FormContainer>
          <AddBtnConatiner style={{gap: '10px'}}>
            {(title === 'Curriculam Builder') && (
              <AddButton onClick={()=>{isOpen("curriculum");}} startIcon={<AddIcon />}>Add Curriculum</AddButton>
            )}
            {(title === 'School Data Setter') && (
              <AddButton onClick={()=>{isOpen("assignCurriculum");}} startIcon={<AddIcon />}>Assign Curriculum</AddButton>
            )}
            <AddButton onClick={() => {isOpen("other");}} startIcon={<AddIcon />}>Add</AddButton>
          </AddBtnConatiner>
          <FormHeader>{title}</FormHeader>
          <SearchFieldWithDropdown
            options={listOption}
            value={selectedOption}
            onChange={(_event: any, value: Option) => setSelectedOption(value)}
          />
        </FormContainer>
        <ButtonContainer>
          <NextButton
            onClick={handleNextClick}
            endIcon={
              <Image
                src="/assets/png/arrow.png"
                width={25}
                height={14}
                alt="next"
              />
            }
          >
            Next
          </NextButton>
        </ButtonContainer>
      </RightContent>
    </ContentContainer>
  );
};

const AddBtnConatiner = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 60px;
`;

const RightContent = styled.div`
  position: relative;
  flex: 1;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
`;

const ContentContainer = styled.div`
  background: #ffffff;
  width: 1004px;
  height: 802px;
  border-radius: 12px;
  display: flex;
  overflow: auto;
  box-shadow: 0px 4px 21px rgba(36, 102, 235, 0.05);
  ${mqMax.max} {
    width: 800px;
    height: 600px;
  }
`;

const ImageContainer = styled.div`
  background-color: ${DARK_BLUE};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.4;
  position: absolute;
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 15%;
  ${mqMax.max} {
    top: 10%;
  }
`;

const FormHeader = styled.h2`
  ${typographyBody1Bold}
  color:${BLACK_TEXT};
  margin-bottom: ${guttersPx.smallHalf};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  right: 0;
  bottom: 40px;
`;

const AddButton = styled(Button)`
  background-color: ${DARK_BLUE};
  min-width: 150px;
  ${typographyH6SemiBold};
`;

export const NextButton = styled(Button)`
  background-color: transparent;
  border: 1.5px solid ${GREY};
  min-width: 150px;
  ${typographyH6SemiBold};
  color: ${NEUTRALS_GREY8};
`;
