import * as Calls from "./Api";

const cancelDirectDebit = async (params) => {
  const { id, status, reason } = params;
  return Calls.putCall("DIRECTDEBIT", `/api/v1/direct-debit/${id}`, {
    // /direct-debit-maintenance
    status,
    reason,
  });
};

const pauseDirectDebit = async (params) => {
  const { id, status, pauseDuration, reason } = params;
  return Calls.putCall("DIRECTDEBIT", `/api/v1/direct-debit/${id}`, {
    status, // Paused
    pauseDuration,
    reason,
  });
};

const updateDirectDebit = async (params) => {
  const { id, additionalAmount, fixedAmount, preferredDate, reason } = params;
  return Calls.putCall("DIRECTDEBIT", `/api/v1/direct-debit/${id}`, {
    additionalAmount: Number(additionalAmount),
    fixedAmount: Number(fixedAmount),
    preferredDate: Number(preferredDate),
    reason,
  });
};

export { cancelDirectDebit, pauseDirectDebit, updateDirectDebit };
