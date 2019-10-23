module.exports = {
    defaultServerResponse : {
        status : 400,
        message: '',
        body: {}
    },
    rawMaterial:{
        RAW_MATERIAL_CREATED: "Raw Material Created",
        RAW_MATERIAL_FETCHED: "Material Fetched",
        RAW_MATERIAL_UPDATED: "Raw material updated",
        RAW_MATERIAL_DELETED: "Raw material deleted successfuly",
        RAW_MATERIAL_NOT_FOUND: "Raw material not found"
    },
    supplier:{
        SUPPLIER_CREATED: "Supplier Created",
        SUPPLIER_FETCHED: "Supplier Fetched",
        SUPPLIER_NOT_FOUND: "Supplier not found"
    },
    requestValidationMessage:{
        BAD_REQUEST: "Invalid Fields",
        TOKEN_MISSING: "Missing Token"
    },
    databaseMessage:{
        INVALID_ID: "Invalid ID"
    },
    userMessage:{
        ADD_USER_SUCCESS: "Added user successfuly",
        USER_EXISTS: "User already exits with given email",
        LOGIN_SUCCESS: "Login Success",
        USER_NOT_FOUND: "User Not found",
        INVALID_PASSWORD: "Incorrect Password"
    },
    unitMessage:{
        UNIT_CREATED: "Unit created successsfuly",
        UNIT_EXISTS: "Unit with a similar name already exists",
        UNIT_FETCHED: "Units Fetched Successfuly"
    }
}