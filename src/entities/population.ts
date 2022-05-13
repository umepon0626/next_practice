export type PerYearPopulation = {
  year: Number;
  value: Number;
};

export type PerYearPopulationRequestParam = {
  prefCode: Number;
  addArea?: string;
  cityCode: string | Number;
};

export type PerYearPopulationResponse = {
  message: string;
  result: {
    boundaryYear: Number;
    data: PerYearPopulation[];
  };
};
