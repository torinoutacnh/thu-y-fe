import { pdf } from "@react-pdf/renderer";
import { ReportModel } from "Components/Shared/Models/Form";

const MapAnimal = (report: ReportModel) => {
  const animals: {
    id: string;
    animalId: string;
    name: string;
    amount: number;
  }[] = report.listAnimals.map((x) => {
    return {
      id: x.id,
      animalId: x.animalId,
      name: x.animalName,
      amount: x.amount,
    };
  });
  return animals;
};

const MapSeal = (report: ReportModel) => {
  const seals: { sealName: string; sealCode: string }[] = report.sealTabs.map(
    (x) => {
      return { sealCode: x.sealCode, sealName: x.sealName };
    }
  );

  return seals;
};

const MapValue = (report: ReportModel) => {
  const values: {
    sort: number;
    attributeId: string;
    attributeName: string;
    value: any;
  }[] = report.values
    .sort((a, b) => a.sort - b.sort)
    .map((x) => {
      return {
        sort: x.sort,
        attributeId: x.attributeId,
        attributeName: x.attributeName,
        value: x.value,
      };
    });

  return values;
};

const PDFModel = (report: ReportModel) => {
  const PDF = {
    animals: MapAnimal(report),
    seals: MapSeal(report),
    attrs: MapValue(report),
  };

  return PDF;
};

export { PDFModel };
