export type PerYearPopulation = {
  year: Number;
  value: Number;
};

export type PerYearPopulationResponse = {
  message: string;
  result: {
    boundaryYear: Number;
    data: PerYearPopulation[];
  };
};
