class FieldValue {
    constructor(field) {
        this.fieldTextValue = field.defaultValue;
        this.fieldId = field.id;
        this.field = field;
    }
}

export default FieldValue;
