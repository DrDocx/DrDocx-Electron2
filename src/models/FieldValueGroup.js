import FieldGroupsService from "../services/FieldGroupsService";
import update from "immutability-helper";
import FieldValue from "./FieldValue";

class FieldValueGroup {
    constructor(fieldValueGroup) {
        this.id = fieldValueGroup.id;
        this.fieldGroup = fieldValueGroup.fieldGroup;
        this.fieldGroupId = fieldValueGroup.fieldGroupId;
        this.fieldValues = fieldValueGroup.fieldValues;
    }

    static defaultFieldValueGroups() {
        const fieldValueGroups = [];
        return FieldGroupsService.getDefaultFieldGroups().then((fieldGroups) => {
            for (const fieldGroup of fieldGroups) {
                fieldValueGroups.push(this.constructFieldValueGroup(fieldGroup));
            }
            return fieldValueGroups;
        });
    }

    static newFieldValueGroup(fieldGroupId) {
        return FieldGroupsService.getFieldGroup(fieldGroupId).then((fieldGroup) => {
            return this.constructFieldValueGroup(fieldGroup);
        });
    }

    static constructFieldValueGroup(fieldGroup) {
        const fieldValues = [];
        for (const field of fieldGroup.fields) {
            fieldValues.push(new FieldValue(field));
        }
        return new FieldValueGroup({
            id: 0,
            fieldGroup: fieldGroup,
            fieldGroupId: fieldGroup.id,
            fieldValues: fieldValues
        });
    }
}

export default FieldValueGroup;
