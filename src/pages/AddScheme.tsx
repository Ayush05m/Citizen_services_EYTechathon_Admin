import React, { useRef, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AutoExpandingTextarea from "@/components/AutoExpandingTextArea";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import api from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import FieldList from "@/components/schemes/FieldList";

interface AddSchemeProps {
  mode: string; // Define the type for mode
}

export const AddScheme = ({ mode }: AddSchemeProps) => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    category: "",
    applicationDeadline: "",
    benefits: "",
  });
  const [eligibilityFields, setEligibilityFields] = useState<string[]>([]);
  const [applicationProcessSteps, setApplicationProcessSteps] = useState<
    string[]
  >([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>([]);
  const [exclusionBool, setExclusionBool] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  // Generic handlers for array fields
  const handleAddField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    fields: string[]
  ) => {
    setter([...fields, ""]);
  };

  const handleChangeField = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    fields: string[]
  ) => {
    const newFields = [...fields];
    newFields[index] = value;
    setter(newFields);
  };

  const handleRemoveField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    fields: string[]
  ) => {
    const newFields = [...fields];
    if (newFields.length === 1) {
      newFields[index] = "";
    } else {
      newFields.splice(index, 1);
    }
    setter(newFields);
  };

  const handleSubmit = async () => {
    try {
      const schemeData = {
        ...formData,
        eligibilityCriteria: eligibilityFields.filter((field) => field.trim()),
        requiredDocuments: requiredDocuments.filter((field) => field.trim()),
        applicationProcess: applicationProcessSteps.filter((field) =>
          field.trim()
        ),
        exclusions: exclusionBool
          ? exclusions.filter((field) => field.trim())
          : [],
      };

      console.log(schemeData);

      const response = await api.post("/schemes", schemeData);
      console.log(response);

      // Navigate back to schemes list or show success message
      navigate("/schemes");
    } catch (error) {
      console.error("Error creating scheme:", error);
      // Add error handling (e.g., show error toast)
    }
  };

  useEffect(() => {
    if (id) {
      api
        .get(`/schemes/${id}`)
        .then((response) => {
          const data = response.data.data.scheme;
          setFormData({
            name: data.name,
            details: data.details || "",
            category: data.category || "",
            applicationDeadline: data.applicationDeadline || "",
            benefits: data.benefits || "",
          });
          // console.log(formData);
          setEligibilityFields(data.eligibilityCriteria);
          setRequiredDocuments(data.requiredDocuments);
          setApplicationProcessSteps(data.applicationProcess);
          setExclusions(data.exclusions);
          console.log(exclusions);

          if (exclusions?.length != 0) setExclusionBool(true);

          setLoading(false); // Set loading to false after data is fetched
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching scheme data:", error);
          setLoading(false); // Ensure loading is false even on error
        });
    } else {
      setLoading(false); // If no id, set loading to false immediately
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Add New Scheme</h1>
      <p></p>

      <Card>
        <CardHeader>
          <CardTitle>Basic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Scheme Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="social-welfare">Social Welfare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationDeadline">Application Deadline</Label>
            <Input
              id="applicationDeadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  applicationDeadline: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Scheme Details</Label>
            <AutoExpandingTextarea
              id="details"
              value={formData.details}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, details: e.target.value })
              }
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <JoditEditor
            ref={editor}
            value={formData.benefits}
            config={config}
            onBlur={(content) =>
              setFormData({ ...formData, benefits: content })
            }
          />
        </CardContent>
      </Card>

      <FieldList
        title="Eligibility Criteria"
        fields={eligibilityFields}
        setFields={setEligibilityFields}
        id="eligibility"
        addButtonText="Add Criteria"
      />

      <FieldList
        title="Required Documents"
        fields={requiredDocuments}
        setFields={setRequiredDocuments}
        id="documents"
        addButtonText="Add Document"
      />

      <FieldList
        title="Application Process"
        fields={applicationProcessSteps}
        setFields={setApplicationProcessSteps}
        id="application-process"
        addButtonText="Add Step"
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            Exclusions
            <input
              type="checkbox"
              checked={exclusionBool}
              onChange={() => setExclusionBool(!exclusionBool)}
              className="w-4 h-4"
            />
          </CardTitle>
          {exclusionBool && (
            <Button
              onClick={() => handleAddField(setExclusions, exclusions)}
              variant="outline"
            >
              Add Exclusion
            </Button>
          )}
        </CardHeader>
        {exclusionBool && (
          <CardContent className="space-y-4">
            {exclusions?.map((field, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="mt-2 w-8 text-sm text-gray-500">
                  {idx + 1}.
                </span>
                <AutoExpandingTextarea
                  value={field}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleChangeField(
                      idx,
                      e.target.value,
                      setExclusions,
                      exclusions
                    )
                  }
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() =>
                    handleRemoveField(idx, setExclusions, exclusions)
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/schemes")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {mode == "add" ? "Save" : "Update"} Scheme
        </Button>
      </div>
    </div>
  );
};
