import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useGetAllStatistics } from "@/services/GeneralHooks/useGetAllStatistics";
import { Users, Wrench, Monitor } from "lucide-react";

const Statistics = () => {
  const { data: statistics, isPending } = useGetAllStatistics();

  // Transformation des données en format utilisable pour les cartes
  const transformedData = [
    {
      title: "Nombre de réparations",
      value: statistics?.reparationCount || 0,
      description: "Total des réparations",
      changeType: "neutral",
      icon: Wrench
    },
    {
      title: "Nombre de machines",
      value: statistics?.machineCount || 0,
      description: "Total des machines",
      changeType: "neutral",
      icon: Monitor
    },
    {
      title: "Nombre de clients",
      value: statistics?.partnerCount || 0,
      description: "Total des clients",
      changeType: "neutral",
      icon: Users
    }
  ];

  const getCardStyle = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return "!bg-green-50 !border-green-300";
      case "warning":
        return "!bg-yellow-50 !border-yellow-300";
      case "negative":
        return "!bg-red-50 !border-red-300";
      default:
        return "!bg-blue-50 !border-blue-300";
    }
  };

  // Fonction pour définir la couleur du texte selon le type
  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return "text-green-700";
      case "warning":
        return "text-yellow-700";
      case "negative":
        return "text-red-700";
      default:
        return "text-blue-700";
    }
  };

  // Fonction pour définir la couleur de l'icône selon le type
  const getIconColor = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  // Affichage du loading si les données sont en cours de chargement
  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card 
            key={index}
            className="!bg-blue-200 !border-blue-300 animate-pulse"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {transformedData.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Card 
            key={index}
            className={`border-2 ${getCardStyle(item.changeType)}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <IconComponent 
                  className={`h-8 w-8 ${getIconColor(item.changeType)}`}
                />
                <div className="text-2xl font-bold text-gray-900">
                  {item.value}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-800 mb-1">
                {item.title}
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs font-medium ${getChangeColor(item.changeType)}`}>
                  {item.description}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Statistics;