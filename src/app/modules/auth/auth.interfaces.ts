export interface IGeneralResponse {
    message: string;
    pagingDetails: {
        pageNumber: number;
        pageSize: number;
        totalCount: number;
    };
    status: string;
}

export interface IPaginationConfig {
    page: number;
    pageSize: number;
    collectionSize: number;
    maxSize: number;
}

export interface IGeneralAutoSuggest {
    currentPage: number;
    records?: any[];
    displayMoreLink?: boolean;
    fieldName?: string;
}

export interface IAutoSuggestionPayload {
    pagingParameters: {
        pageNumber: number;
        pageSize: number;
    };
    searchString?: string
}


//======================  Login ================================

export interface ILoginItem {
    userId: number,
    sesbfMasterSubUnitId: number,
    sesbfMasterUnitId: number,
    userType: string,
    userGrpId: number,
    userName: string,
    userEmail: string,
    
}

export interface ILoginPayload {
    userName: string;
    userPW: string;
}

export interface ILoginResponse extends IGeneralResponse {
    result: ILoginItem;
}


//========================== Change Password =======================
export interface IResetItem {
    userId: number;
    uGrp_Id: number;
    uGrp_Name: string;
    user_Name: string;
    user_Email: string;
    isSuperUser: boolean;
}

export interface IResetResponse extends IGeneralResponse {
    result: IResetItem;
}

//=========================== Reset Forgot Password ==================

export interface IResetForgotPassItem {
    userId: number;
    uGrp_Id: number;
    uGrp_Name: string;
    user_Name: string;
    user_Email: string;
    isSuperUser: boolean;
}

export interface IResetForgotPassResponse extends IGeneralResponse {
    result: IResetForgotPassItem;
}

//=========================== Financial Year Change ===============

export class Fin_year_Change {
    userId: number = 0
    finYear: string = ''
}


//========================== Permisson ===================
export class PermissionReqApi {
    public isDelete: boolean = false
    public isEdit: boolean = false
    public isAdd: boolean = false
}