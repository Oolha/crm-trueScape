'use client';

import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Promotion,
  createPromotion,
  getCompany,
  getSummaryStats,
  updateSummaryStats,
} from '@/lib/api';
import Button from '@/app/components/button';
import InputField from '@/app/components/input-field';
import LogoUploader from '@/app/components/logo-uploader';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export type PromotionFieldValues = {
  title: string;
  description: string;
  discount: string | number;
};

const initialValues: PromotionFieldValues = {
  title: '',
  description: '',
  discount: '',
};

export interface PromotionFormProps {
  companyId: string;
  onSubmit?: (values: PromotionFieldValues) => void | Promise<void>;
}

export default function PromotionForm({
  companyId,
  onSubmit,
}: PromotionFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: company } = useQuery({
    queryKey: ['companies', companyId],
    queryFn: () => getCompany(companyId),
    staleTime: 10 * 1000,
    enabled: Boolean(companyId),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPromotion,
    onSuccess: async (data) => {
      try {
        queryClient.setQueryData<Promotion[]>(
          ['promotions', companyId],
          (oldData) => {
            if (!oldData) return [data];
            return [...oldData, data];
          },
        );
        const currentStats = await getSummaryStats();

        await updateSummaryStats({
          ...currentStats,
          promotions: currentStats.promotions + 1,
        });

        queryClient.invalidateQueries({ queryKey: ['promotions'] });
        queryClient.invalidateQueries({ queryKey: ['summary-stats'] });

        toast.success('Promotion successfully created!', {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
        router.refresh();
      } catch (error) {
        console.error('Error updating statistics:', error);
        toast.error('Promotion created but failed to update statistics.');
      }
    },
    onError: (error) => {
      console.error('Error creating promotion:', error);
      toast.error('Failed to create promotion. Please try again.', {
        duration: 3000,
        position: 'top-right',
      });
    },
  });

  const handleSubmit = async (values: PromotionFieldValues) => {
    if (!company) return;

    await mutateAsync({
      ...values,
      discount: Number(values.discount) || 0,
      companyId: company.id,
      companyTitle: company.title,
    });

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-10">
        <p className="mb-0.5 text-xl">Add new promotion</p>
        <div className="flex flex-col gap-5">
          <InputField required label="Title" placeholder="Title" name="title" />
          <InputField
            required
            label="Description"
            placeholder="Description"
            name="description"
          />
          <InputField
            required
            type="number"
            label="Discount"
            placeholder="Discount"
            name="discount"
          />
          <LogoUploader square label="Image" placeholder="Upload photo" />
        </div>
        <Button type="submit" disabled={isPending}>
          Add promotion
        </Button>
      </Form>
    </Formik>
  );
}
