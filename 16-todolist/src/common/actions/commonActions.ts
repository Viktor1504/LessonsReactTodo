export const resetStateAC = () => ({ type: "RESET_STATE" }) as const
export type ResetStateActionType = ReturnType<typeof resetStateAC>
