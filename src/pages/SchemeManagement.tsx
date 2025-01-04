import { useQuery, useMutation, useQueryClient } from "react-query";
import { schemes } from "@/services/schemesService";
import { Scheme } from "@/types";
import SchemeList from "@/components/schemes/SchemeList";
import { useNavigate } from "react-router-dom";

export default function SchemeManagement() {
  const { data: schemeList, isLoading } = useQuery("schemes", schemes.getAll);
  const navigate = useNavigate();

  const handleEdit = (scheme: Scheme) => {};

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this scheme?")) {
      // deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Scheme Management</h1>
        <button onClick={() => navigate("/add-scheme")} className="btn-primary">
          Add New Scheme
        </button>
      </div>

      {schemeList?.length ? (
        <SchemeList
          schemes={schemeList || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ): (
        <p>No Schemes Available</p>
      )}
    </div>
  );
}
