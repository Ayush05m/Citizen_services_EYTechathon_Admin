import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Scheme } from '@/types';

interface SchemeFormProps {
  scheme?: Scheme | null;
  onSubmit: (values: Partial<Scheme>) => void;
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  eligibilityCriteria: Yup.array().of(Yup.string()).min(1, 'At least one eligibility criteria is required'),
  requiredDocuments: Yup.array().of(Yup.string()).min(1, 'At least one required document is required'),
  benefits: Yup.array().of(Yup.string()).min(1, 'At least one benefit is required'),
  applicationDeadline: Yup.date().nullable(),
});

export default function SchemeForm({ scheme, onSubmit, onClose }: SchemeFormProps) {
  const formik = useFormik({
    initialValues: {
      title: scheme?.title || '',
      description: scheme?.description || '',
      category: scheme?.category || 'other',
      eligibilityCriteria: scheme?.eligibilityCriteria || [''],
      requiredDocuments: scheme?.requiredDocuments || [''],
      benefits: scheme?.benefits || [''],
      applicationDeadline: scheme?.applicationDeadline || '',
    },
    validationSchema,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          {scheme ? 'Edit Scheme' : 'Create New Scheme'}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...formik.getFieldProps('title')}
              className="input-field"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            )}
          </div>
          

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {scheme ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 