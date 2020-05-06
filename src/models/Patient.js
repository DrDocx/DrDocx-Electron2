import FieldValueGroup from "./FieldValueGroup";

class Patient {
    constructor(patient) {
        this.id = patient.id;
        this.name = patient.name;
        this.fieldValueGroups = patient.fieldValueGroups;
        this.testResultGroups = patient.resultGroups;
    }
    static async newPatient() {
        const fieldValueGroups = await FieldValueGroup.defaultFieldValueGroups();
        return new Patient({id: 0, name: "", fieldValueGroups: fieldValueGroups, testResultGroups: []});
    }
}

export default Patient;
