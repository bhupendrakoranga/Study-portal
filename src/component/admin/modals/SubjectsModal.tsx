import React, { useEffect, useState } from 'react';
import { Dialog, IconButton, Box, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import styled from '@emotion/styled';
import { typographyBody1Bold } from '@/styles/typography';
import Checkbox from '@/component/ui/inputs/Checkbox';
import { PlusIcon } from '@/utils/constant/SVG';
import { LIGHT_STEEL_BLUE, WHITE } from '@/styles/color';
import Button from '@/component/ui/buttons/Button';
import { useGlobalContext } from '@/context/globalcontext/GlobalContext';
import { guttersPx } from '@/styles/variables';
import InputBox from '@/component/ui/inputs/InputBox';
import AdminFormRootModal from '@/component/ui/modals/AdminFormRootModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ErrorMessage,
  IconWrapper,
  InputContainer,
} from '@/styles/globleStyle';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { addUnitBuilderKey, addUnitBuilderList } from '@/lib/api/api';
import { toast } from 'react-toastify';
import AddForm from './AddForm';
import {
  addDetailToId,
  convertDetailsToSectionsData,
  findDetailsById,
} from '@/utils/constant';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: ${guttersPx.small};
  }
`;

const HeaderText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & p {
    ${typographyBody1Bold}
  }
`;

const Header = styled(Box)`
  background-color: #4a0072;
  background-image: url('/assets/png/ScientificNotation.png');
  color: white;
  display: flex;
  justify-content: space-between;
  height: 154px;
  align-items: center;
  padding: ${guttersPx.small};
  border-top-left-radius: ${guttersPx.small};
  border-top-right-radius: ${guttersPx.small};
  & h6 {
    font-size: 26px;
    font-weight: 700;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  gap: ${guttersPx.medium};
  padding: 30px;
  & .relative {
    width: 100%;
  }
`;

const Section = styled(Box)`
  width: 186px;
  border-radius: ${guttersPx.small};
  background: ${WHITE};
  padding: ${guttersPx.small};
  text-align: center;
  border: 1px solid ${LIGHT_STEEL_BLUE};
`;

const Item = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SectionItem = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: column;
  padding: ${guttersPx.mediumHalf} 0;
`;
const AddBtn = styled(Button)`
  min-width: 122px;
`;

interface ScientificNotationModalProps {
  onClose: () => void;
  isOpen: boolean;
  refetch: () => void;
  data?: any;
}

export const ScientificNotationModal: React.FC<
  ScientificNotationModalProps
> = ({ refetch, onClose, isOpen, data }) => {
  const [inputCheck, setInputCheck] = useState<Record<string, boolean>>({
    Video: false,
    Learn: false,
    Test: false,
  });

  const { mutateAsync } = useCustomMutation(addUnitBuilderList, [
    'unit-builder',
  ]);

  const [open, setOpen] = useState<boolean>(false);
  const [listTitle, setListTitle] = useState('');
  const onOpen = (title: any) => {
    setListTitle(title);
    setOpen(true);
  };
  const handleChange = (e: { target: { name: string; checked: boolean } }) => {
    const { name, checked } = e.target;
    setInputCheck({ ...inputCheck, [name]: checked });
  };
  const qname = useSearchParams()?.get('title');
  const router = useRouter();
  const navigateTo = () => {
    const isChecked = Object.values(inputCheck).some((value) => value);
    if (!isChecked) {
      toast.error('Please select at least one option.');
      return;
    }

    let query = '';
    for (const i in inputCheck) {
      if (inputCheck[i]) {
        query += `${i},`;
      }
    }
    query = query.slice(0, query.length - 1);
    router.push(
      `/admin/curriculumbuilder/${data?.title}?query=${query}&pid=${data?.pid}&title=${qname}`,
    );
  };

  const [sectiondata, setSectonData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const databyid = findDetailsById(data?.filterlists, data?.id);
      const generateData = convertDetailsToSectionsData(databyid);
      setSectonData(generateData);
    }
  }, [data]);

  const handleAddLists = async (inputVal: any) => {
    let updatedData = data?.filterlists; // Initialize with the original data
    updatedData = addDetailToId(
      updatedData,
      data?.id,
      listTitle,
      inputVal?.name || 'Default Learn Title',
    );
    return await mutateAsync({ id: data?.pid, data: updatedData?.children });
  };

  async function removeItemFromDetails(
    itemId: string | number,
    sectionTitle: string,
  ) {
    // Helper function to find the object by parentId
    function findAndRemove(currentObj: any): boolean {
      // If the current object's id matches the parentId
      if (currentObj.id === data?.id) {
        // Check if the section exists in the details object
        if (currentObj.details && currentObj.details[sectionTitle]) {
          // Filter out the item with the specified id
          currentObj.details[sectionTitle] = currentObj.details[
            sectionTitle
          ].filter((item: any) => item.id !== itemId);
        }
        return true; // Stop further searching
      }

      // If the current object has children, search recursively in each child
      if (Array.isArray(currentObj.children)) {
        for (const child of currentObj.children) {
          if (findAndRemove(child)) {
            return true; // Stop searching once the parentId is found and updated
          }
        }
      }

      return false; // Continue searching
    }

    // Create a deep copy of the data to avoid mutating the original
    const updatedData = JSON.parse(JSON.stringify(data?.filterlists));

    // Find the object and remove the item
    findAndRemove(updatedData);
    try {
      const response = await mutateAsync({
        id: data?.pid,
        data: updatedData?.children,
      });
      if (response) {
        toast.success('Deleted succesfully');
        refetch();
      }
    } catch (err) {
      toast.error("Something went's wrong");
    }
  }

  return (
    <>
      <StyledDialog open={isOpen} onClose={onClose} maxWidth={false}>
        <Header>
          <Typography variant="h6">{data?.title}</Typography>
          <IconButton onClick={onClose} style={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Header>
        <Content>
          {sectiondata?.map((section, index) => (
            <Section key={index}>
              <HeaderText>
                <Typography>{section.title}</Typography>
                <Checkbox
                  color="secondary"
                  label={''}
                  name={section.title}
                  checked={inputCheck?.[section.title]}
                  onChange={handleChange}
                />
              </HeaderText>
              <IconWrapper onClick={() => onOpen(section?.title)}>
                <PlusIcon color={WHITE} width={12} height={12} />
              </IconWrapper>
              <SectionItem>
                {section.items.map(
                  (
                    item: {
                      id: string | number;
                      name: string;
                    },
                    idx: React.Key | null | undefined,
                  ) => (
                    <Item key={idx}>
                      <Typography sx={{ wordBreak: 'break-all' }}>
                        {item.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          removeItemFromDetails(item.id, section.title)
                        }
                      >
                        <RemoveCircleOutlineOutlinedIcon
                          style={{ cursor: 'pointer', fill: '#7A94B8' }}
                        />
                      </IconButton>
                    </Item>
                  ),
                )}
              </SectionItem>
            </Section>
          ))}
        </Content>
        <Box display="flex" justifyContent="center" mb={2}>
          <AddBtn variant="contained" onClick={navigateTo}>
            ADD
          </AddBtn>
        </Box>
      </StyledDialog>
      <AddForm
        show={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddLists}
        fields={fields}
        refetch={refetch}
        validationSchema={validationSchema}
      />
    </>
  );
};
const fields = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    placeholder: 'Enter name',
    type: 'input', // Specifies that this field should be rendered as an InputBox
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

export const AddSubjects = ({ refetch }: { refetch: () => void }) => {
  const { admintopicmodal, setAadmintopicModal } = useGlobalContext();
  const onClose = () => setAadmintopicModal(false);
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const grade_subject_id = searchParams.get('grade_subject_id');

  const { mutateAsync } = useCustomMutation(addUnitBuilderKey, ['builder']);

  const { values, handleChange, errors, handleSubmit, resetForm } = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: async () => {
      if (!title) {
        return;
      }
      try {
        await mutateAsync({ ...values, ['grade_subject_id']: grade_subject_id, ['parent_id']: null });
        toast.success('Successfully created');
        refetch();
        resetForm(); // Reset form values on successful submission
        onClose();
      } catch (error: any) {
        toast.error(error?.response?.data?.detail);
      }
    },
  });

  return (
    <AdminFormRootModal
      isOpen={admintopicmodal?.isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="ADD"
    >
      <InputContainer>
        <InputBox
          id="name"
          name="name"
          label=""
          value={values.name}
          onChange={handleChange}
        />
        {errors?.name && <ErrorMessage>{errors?.name}</ErrorMessage>}
      </InputContainer>
    </AdminFormRootModal>
  );
};
