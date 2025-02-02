'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CompanyStatus,
  createCompany,
  getCategories,
  getCountries,
  Category,
  Country,
} from '@/lib/api';
import Button from '@/app/components/button';
import InputField from '@/app/components/input-field';
import LogoUploader from '@/app/components/logo-uploader';
import StatusLabel from '@/app/components/status-label';
import { getSummaryStats, updateSummaryStats } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export type CompanyFieldValues = {
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  categoryId: string;
  countryId: string;
};

const initialValues: CompanyFieldValues = {
  title: '',
  description: '',
  status: CompanyStatus.Active,
  joinedDate: '',
  categoryId: '',
  countryId: '',
};

export interface CompanyFormProps {
  onSubmit?: (values: CompanyFieldValues) => void | Promise<void>;
}

export default function CompanyForm({ onSubmit }: CompanyFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 10 * 1000,
  });

  const { data: countries } = useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 10 * 1000,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCompany,
    onSuccess: async (newCompany) => {
      try {
        const currentStats = await getSummaryStats();
        await updateSummaryStats({
          ...currentStats,
          newCompanies: currentStats.newCompanies + 1,
          activeCompanies:
            newCompany.status === CompanyStatus.Active
              ? currentStats.activeCompanies + 1
              : currentStats.activeCompanies,
        });

        queryClient.invalidateQueries({ queryKey: ['companies'] });
        queryClient.invalidateQueries({ queryKey: ['summary-stats'] });

        toast.success('Company successfully created!', {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });

        router.push('/companies');
        router.refresh();
      } catch (error) {
        console.error('Error updating statistics:', error);
        toast.error('Company created but failed to update statistics.');
      }
    },
    onError: (error) => {
      console.error('Error creating company:', error);
      toast.error('Failed to create company. Please try again.', {
        duration: 3000,
        position: 'top-right',
      });
    },
  });
  const handleSubmit = async (values: CompanyFieldValues) => {
    if (!categories || !countries) return;

    await mutateAsync({
      ...values,
      categoryTitle:
        categories.find(({ id }) => id === values.categoryId)?.title ?? '',
      countryTitle:
        countries.find(({ id }) => id === values.countryId)?.title ?? '',
    });
    if (onSubmit) {
      onSubmit(values);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-10">
        <p className="mb-0.5 text-xl">Add new company</p>
        <div className="flex gap-6">
          <div className="flex flex-col flex-1 gap-5">
            <LogoUploader label="Logo" placeholder="Upload photo" />
            <InputField
              required
              label="Status"
              placeholder="Status"
              name="status"
              as="select"
            >
              {(Object.values(CompanyStatus) as CompanyStatus[]).map(
                (status) => (
                  <option key={status} value={status}>
                    <StatusLabel status={status} styled={false} />
                  </option>
                ),
              )}
            </InputField>
            <InputField
              required
              label="Country"
              placeholder="Country"
              name="countryId"
              as="select"
            >
              {countries?.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.title}
                </option>
              ))}
            </InputField>
          </div>
          <div className="flex flex-col flex-1 gap-5">
            <InputField required label="Name" placeholder="Name" name="title" />
            <InputField
              required
              label="Category"
              placeholder="Category"
              name="categoryId"
              as="select"
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              )) ?? null}
            </InputField>
            <InputField
              required
              label="Joined date"
              type="date"
              name="joinedDate"
            />
            <InputField
              required
              label="Description"
              placeholder="Description"
              name="description"
            />
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          Add company
        </Button>
      </Form>
    </Formik>
  );
}
