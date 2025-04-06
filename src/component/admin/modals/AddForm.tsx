import React, { useState } from 'react';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import InputBox from '@/component/ui/inputs/InputBox';
import SelectBox from '@/component/ui/inputs/SelectBox';
import { InputContainer } from '@/styles/globleStyle';
import AdminFormRootModal from '@/component/ui/modals/AdminFormRootModal';
import { Error } from './AddStudentForm';
import { toast } from 'react-toastify';
import Select from 'react-select';

type FieldConfig = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type: string;
  options?: { value: string; label: string }[]; // Only for select type
  defaultValue?: string;
};

type AddFormProps = {
  show: boolean;
  onClose: () => void;
  onAdd: (formValues: any) => any;
  fields: FieldConfig[];
  validationSchema: any;
  title?: string;
  refetch?: any;
};

const AddForm = ({
  show,
  onClose,
  onAdd,
  fields,
  validationSchema,
  title = 'Add New',
  refetch,
}: AddFormProps) => {
  const {
    errors,
    touched,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: fields.reduce(
      (initialValues, field) => {
        initialValues[field.name] = field?.defaultValue || '';
        return initialValues;
      },
      {} as Record<string, string>,
    ),
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (formValues) => {
      try {
        const payLoad: any = selectedOption 
        ? { ...formValues, curriculum_id: selectedOption?.value }
        : formValues;
      
        const response = await onAdd(payLoad);
        if (response) {
          handleClose();
          if (refetch) {
            refetch();
          }
          return toast.success('Data added successfully');
        }
        return toast.error('Something went wrong');
      } catch (err: any) {
        toast.error(err?.response?.data?.error);
      }
    },
  });

  const [selectedOption, setSelectedOption] = useState<any>(null);
  const handleSearchFilterChange = (e:any) => {
    setSelectedOption(e);
  };

  const searchFilterOption = (option:any, inputValue:any) => {
    return option.data.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const renderField = (field) => {
    if (field.type === 'input') {
      return (
        <InputBox
          id={field.id}
          label={field.label}
          name={field.name}
          placeholder={field.placeholder}
          value={values[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
    }
  
    if (field.type === 'select_search') {
      return (
        <div>
          <label className='mui-90itxp-Label'>{field.label}</label>
          <Select
            placeholder={field.placeholder}
            isClearable={true}
            name={field.name}
            id={field.id}
            value={selectedOption}
            options={field.options || []}
            onChange={handleSearchFilterChange}
            getOptionLabel={(e: any) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginLeft: 5 }}>{e.label}</span>
              </div>
            )}
            filterOption={searchFilterOption}
          />
        </div>
      );
    }
  
    return (
      <SelectBox
        id={field.id}
        label={field.label}
        name={field.name}
        options={field.options || []}
        value={values[field.name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  };

  return (
    <AdminFormRootModal
      title={title}
      isOpen={show}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Container>
        {fields.map((field) => (
          <InputContainer key={field.id}>
            {renderField(field)}
            {touched[field.name] && errors[field.name] && <Error>{errors[field.name]}</Error>}
          </InputContainer>
        ))}
      </Container>
    </AdminFormRootModal>
  );
};

export default AddForm;

const Container = styled.div`
  padding-bottom: 0;
`;
