export interface RipsIncentives {
  capitalSubsidy: number;
  notes: {
    stampDuty: string;
    sgstReimbursement: string;
  };
}

/**
 * Calculates RIPS 2024 incentives for a given investment amount.
 * @param investmentAmount - The fixed capital investment amount.
 * @returns An object containing the calculated incentives and policy notes.
 */
export function calculateIncentives(investmentAmount: number): RipsIncentives {
  const capitalSubsidy = investmentAmount * 0.23; // 23% of the fixed capital investment

  const notes = {
    stampDuty: '100% Stamp Duty exemption on land purchase or lease.',
    sgstReimbursement: '75% reimbursement of SGST for a period of 7 years.',
  };

  return {
    capitalSubsidy,
    notes,
  };
}
