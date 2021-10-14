"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Program_1 = require("./Program");
/**
 * Typescript enum from the Java enum of the same name
 * Generated by Maven. See Java class GenerateTypeScript.
 */
var SummaryType;
(function (SummaryType) {
    SummaryType["CysticFibrosis"] = "CysticFibrosis";
    SummaryType["Renal"] = "Renal";
    SummaryType["Haemodialysis"] = "Haemodialysis";
    SummaryType["PeritonealDialysis"] = "PeritonealDialysis";
    SummaryType["RenalTransplant"] = "RenalTransplant";
    SummaryType["HIV"] = "HIV";
    SummaryType["Hepatitis"] = "Hepatitis";
    SummaryType["ImmunologyA"] = "ImmunologyA";
    SummaryType["InfectiousDiseases"] = "InfectiousDiseases";
    SummaryType["PEP"] = "PEP";
    SummaryType["PatientWatch"] = "PatientWatch";
})(SummaryType || (SummaryType = {}));
exports.summaryTypeTitle = {
    CysticFibrosis: 'Cystic Fibrosis Summary',
    Renal: 'Renal Summary',
    Haemodialysis: 'Haemodialysis Summary',
    PeritonealDialysis: 'Peritoneal Dialysis Summary',
    RenalTransplant: 'Renal Transplant Summary',
    HIV: 'HIV Summary',
    Hepatitis: 'Hepatitis Summary',
    ImmunologyA: 'Immunology A Summary',
    InfectiousDiseases: 'Infectious Diseases Summary',
    PEP: 'PEP Summary',
    PatientWatch: 'Patient Watch Summary',
};
exports.summaryTypeProgram = {
    CysticFibrosis: Program_1.default.CYSTIC_FIBROSIS,
    Renal: Program_1.default.RENAL_DISEASE,
    Haemodialysis: Program_1.default.RENAL_DISEASE,
    PeritonealDialysis: Program_1.default.RENAL_DISEASE,
    RenalTransplant: Program_1.default.RENAL_DISEASE,
    HIV: Program_1.default.IMMUNOLOGY,
    Hepatitis: Program_1.default.IMMUNOLOGY,
    ImmunologyA: Program_1.default.IMMUNOLOGY,
    InfectiousDiseases: Program_1.default.IMMUNOLOGY,
    PEP: Program_1.default.IMMUNOLOGY,
    PatientWatch: Program_1.default.PATIENT_WATCH,
};
exports.summaryTypeFormDescID = {
    CysticFibrosis: 'Summary.CysticFibrosisSummary',
    Renal: 'Summary.RenalSummary',
    Haemodialysis: 'Summary.HaemodialysisSummary',
    PeritonealDialysis: 'Summary.PeritonealSummary',
    RenalTransplant: 'Summary.RenalTransplantSummary',
    HIV: 'Summary.HIVSummary',
    Hepatitis: 'Summary.HepatitisSummary',
    ImmunologyA: 'Summary.ImmunologyASummary',
    InfectiousDiseases: 'Summary.InfectiousDiseasesSummary',
    PEP: 'Summary.PEPSummary',
    PatientWatch: 'Summary.PatientWatch',
};
exports.summaryTypeSortOrder = {
    CysticFibrosis: 0,
    Renal: 1,
    Haemodialysis: 2,
    PeritonealDialysis: 3,
    RenalTransplant: 4,
    HIV: 5,
    Hepatitis: 6,
    ImmunologyA: 7,
    InfectiousDiseases: 8,
    PEP: 9,
    PatientWatch: 10,
};
exports.default = SummaryType;
//# sourceMappingURL=SummaryType.js.map