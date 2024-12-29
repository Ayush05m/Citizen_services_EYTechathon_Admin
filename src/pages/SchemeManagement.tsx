import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { schemes } from '@/services/api';
import { Scheme } from '@/types';
import SchemeForm from '@/components/schemes/SchemeForm';
import SchemeList from '@/components/schemes/SchemeList';

export default function SchemeManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const queryClient = useQueryClient();

  const { data: schemeList, isLoading } = useQuery('schemes', schemes.getAll);

  const createMutation = useMutation(schemes.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('schemes');
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation(
    (data: Scheme) => schemes.update(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('schemes');
        setIsFormOpen(false);
        setEditingScheme(null);
      },
    }
  );

  const deleteMutation = useMutation(schemes.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('schemes');
    },
  });

  const handleEdit = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Scheme Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary"
        >
          Add New Scheme
        </button>
      </div>

      <SchemeList
        schemes={schemeList || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <SchemeForm
          scheme={editingScheme}
          onSubmit={(data) => {
            if (editingScheme) {
              updateMutation.mutate({
                ...editingScheme,
                ...data,
              } as Scheme);
            } else {
              createMutation.mutate(data as Omit<Scheme, 'id'>);
            }
          }}
          onClose={() => {
            setIsFormOpen(false);
            setEditingScheme(null);
          }}
        />
      )}
    </div>
  );
} 