import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import { Label } from "@/components/ui/shadcn/label";
import { User, Building2 } from "lucide-react";
import { EntityType } from "@/lib/formSchema";

interface EntityTypeSelectionProps {
  value: EntityType;
  onChange: (value: EntityType) => void;
}

export const EntityTypeSelection = ({ value, onChange }: EntityTypeSelectionProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">type de partenaire</h2>
      <RadioGroup value={value} onValueChange={(val: EntityType) => onChange(val)} className="flex flex-col gap-4">
        <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
          value === "PERSON" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
        }`}>
          <RadioGroupItem value="PERSON" id="person" className="mr-2" />
          <Label htmlFor="person" className="flex items-center cursor-pointer">
            <User className="mr-2 h-5 w-5" />
            Personne individuelle
          </Label>
        </div>
         <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
          value === "COMPANY" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
        }`}>
          <RadioGroupItem value="COMPANY" id="company" className="mr-2" />
          <Label htmlFor="company" className="flex items-center cursor-pointer">
            <Building2 className="mr-2 h-5 w-5" />
            Entreprise
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default EntityTypeSelection;