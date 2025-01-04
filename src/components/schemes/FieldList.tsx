import React, { useCallback } from "react";
import AutoExpandingTextarea from "@/components/AutoExpandingTextArea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

const FieldList = React.memo(
  ({ title, fields, setFields, id, addButtonText }: any) => {
    const handleAddField = useCallback(() => {
      setFields((prevFields: string[]) => [...prevFields, ""]);
    }, [setFields]);

    const handleChangeField = useCallback(
      (index: number, value: string) => {
        setFields((prevFields: string[]) => {
          const newFields = [...prevFields];
          newFields[index] = value;
          return newFields;
        });
      },
      [setFields]
    );

    const handleRemoveField = useCallback(
      (index: number) => {
        setFields((prevFields: string[]) => {
          const newFields = [...prevFields];
          if (newFields.length === 1) {
            newFields[index] = "";
          } else {
            newFields.splice(index, 1);
          }
          return newFields;
        });
      },
      [setFields]
    );

    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Button onClick={handleAddField} variant="outline">
            {addButtonText}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field: string, idx: number) => (
            <div key={`${id}-${idx}`} className="flex gap-2 items-start">
              <span className="mt-2 w-8 text-sm text-gray-500">{idx + 1}.</span>
              <AutoExpandingTextarea
                id={`${id}-${idx}`}
                value={field}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChangeField(idx, e.target.value)
                }
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveField(idx)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
);

export default FieldList;
