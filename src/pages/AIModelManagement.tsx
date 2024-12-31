import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { aiModels } from '@/services/aiModelsService';
// import ModelForm from '@/components/ai/ModelForm';
// import ModelList from '@/components/ai/ModelList';

export default function AIModelManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: models, isLoading } = useQuery('ai-models', aiModels.getAll);

  const updateModelMutation = useMutation(aiModels.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('ai-models');
    },
  });

  const trainModelMutation = useMutation(aiModels.train, {
    onSuccess: () => {
      queryClient.invalidateQueries('ai-models');
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">AI Model Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary"
        >
          Configure New Model
        </button>
      </div>

      {/* <div className="grid grid-cols-1 gap-6">
        {models?.map((model) => (
          <ModelList
            key={model.id}
            models={models}
            onTrain={(modelId) => trainModelMutation.mutate(modelId)}
            onUpdate={(modelId, config) => updateModelMutation.mutate({ id: modelId, config })}
          />
        ))}
      </div>

      {isFormOpen && (
        <ModelForm
          onSubmit={(data) => {
            // Handle model configuration
            setIsFormOpen(false);
          }}
          onClose={() => setIsFormOpen(false)}
        />
      )} */}
    </div>
  );
} 