// import {makeStyles} from "@material-ui/core/styles";

export const patientFormStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxHeight: 40,
        marginTop: 0,
        marginLeft: 0,
        paddingLeft: -2,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    fieldGroupButton: {
        maxHeight: 40
    },
    fieldGroupCard: {
        minWidth: 400,
        width: 600
    },
    fieldGroupName: {
        textAlign: 'left'
    },
    fieldGroupDescription: {
        fontSize: 14,
        textAlign: 'left'
    },
    paragraphFieldValue: {
        minWidth: 300,
        width: 500
    }
});
