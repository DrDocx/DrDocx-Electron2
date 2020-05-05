import FieldGroupsService from "../services/FieldsService/FieldGroupsService";
import update from "immutability-helper";
import FieldValue from "./FieldValue";

class FieldValueGroup {
    constructor(fieldValueGroup) {
        this.id = fieldValueGroup.id;
        this.fieldGroupId = fieldValueGroup.fieldGroupId;
        this.fieldValues = fieldValueGroup.fieldValues;
    }

    static newFieldValueGroup(fieldGroupId) {
        FieldGroupsService.getFieldGroup(fieldGroupId).then((fieldGroup) => {
            const fieldValues = [];
            for (const field of fieldGroup.fields) {
                fieldValues.push(new FieldValue(field));
            }
            return new FieldValueGroup({
                id: 0,
                fieldGroupId: fieldGroupId,
                fieldValues: fieldValues
            });
        });
        return null;
    }
}

export default FieldValueGroup;
