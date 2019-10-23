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
        BAD_REQUEST: "Invalid Fields"
    },
    databaseMessage:{
        INVALID_ID: "Invalid ID"
    },
    userMessage:{
        ADD_USER_SUCCESS: "Added user successfuly",
        USER_EXISTS: "User already exits with given email"
    }
}