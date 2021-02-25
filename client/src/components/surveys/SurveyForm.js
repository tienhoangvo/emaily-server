import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import { useSurveyFormState } from '../../contexts/SurveyForm';
import FIELDS from './formFields';
const schema = yup.object().shape({
  title: yup.string().required().trim(),
  subject: yup.string().required().trim(),
  body: yup.string().required().trim(),
  recipients: yup
    .array()
    .transform(function (value, originalValue) {
      if (this.isType(value) && value !== null) {
        return value;
      }
      return originalValue
        ? originalValue.split(/[\s,]+/)
        : [];
    })
    .min(1)
    .of(
      yup
        .string()
        .trim()
        .email(
          ({ value }) =>
            `${value} is not a valid email`
        )
    ),
});

const SurveyForm = () => {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const {
    surveyData,
    setSurveyData,
    toggleIsON,
  } = useSurveyFormState();
  console.log({ surveyData, setSurveyData });
  const onSubmit = (data) => {
    setSurveyData(data);
    toggleIsON();
  };

  console.log('--RENDER');

  useEffect(() => {
    console.log('-- Touched', formState.touched);
    console.log('-- Errors', formState.errors);
    console.log('-- Is valid', formState.isValid);
    console.log('-- Is Dirty', formState.isDirty);
  }, [formState]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {FIELDS.map((field) => (
        <SurveyField
          {...field}
          error={
            formState.errors[field.inputName]
          }
          register={register}
        />
      ))}

      <Link
        to="/surveys"
        className="btn-flat red white-text left"
      >
        Cancel
      </Link>

      <button
        type="submit"
        disabled={!formState.isValid}
        className="btn-flat teal white-text right"
      >
        Next
        <i className="material-icons right">
          navigate_next
        </i>
      </button>
    </form>
  );
};

export default SurveyForm;
