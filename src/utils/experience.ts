/**
 * Calculates the number of years of experience from a given start date
 * @param startDate - The date when the experience started
 * @returns The number of years of experience
 */
export const calculateYearsOfExperience = (
  startDate: Date = new Date("2018-08-01")
): number => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  return diffYears;
};
