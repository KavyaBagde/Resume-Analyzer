import api from "./api";

export const addCredits = (planId) => {
  return api.post("/billing/add-credits", {
    plan_id: planId,
  });
};
