/** Keep individual and team briefs in the existing waitlist's free-text role column. */
export function agencyInquiryPayload(form: FormData) {
  const isIndividual = form.get("signupType") === "individual"
  const value = (name: string) => String(form.get(name) ?? "").trim()
  const fields = isIndividual
    ? [["Name", "name"]]
    : [["Agency / team", "agency"], ["Team size", "teamSize"], ["Active clients", "activeClients"]]
  fields.push(["Mac setup", "macSetup"])
  if (value("profileUrl")) fields.push(["Website / LinkedIn", "profileUrl"])
  return {
    email: value("email"),
    name: value(isIndividual ? "name" : "agency"),
    role: [`Signing up as: ${isIndividual ? "Individual" : "Team"}`, ...fields.map(([label, name]) => `${label}: ${value(name)}`)].join("\n"),
    hasMac: form.get("macSetup") === "All Macs" ? true : form.get("macSetup") === "No Macs" ? false : undefined,
    signup_source: "omega_agency_inquiry",
  }
}
