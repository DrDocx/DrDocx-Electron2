class Patient {
    constructor(patient) {
        this.id = patient.id;
        this.name = patient.name;
        this.fieldValueGroups = patient.fieldValueGroups;
        this.testResultGroups = patient.field
    }
    static newPatient() {
        return new Patient({id: 0, name: "", fieldValueGroups: [], testResultGroups: []});
    }
}

export default Patient;
