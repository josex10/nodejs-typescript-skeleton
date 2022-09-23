/**
 * @description ENUMS USED FOR MESSAGE WHEN THE DATA IS VALIDATED
 */
 export enum EValidationMessage {
    REQUIRED = 'The parameter is required.',
    TYPEINT = 'The parameter should be a INT type.',
    TYPESTRING = 'The parameter should be a string type.',
    EMPTYSTRING = 'The para parameter cannot be empty.',
    INCORRECTUUID = 'The paramater is an incorrect ID.',
    NODOCUMENTS = 'No documents',
    NOTMINSTRINGLENGTH = 'The parameter does not have the minimum length required.',
    EXCEEDSTRINGLENGTH = 'The parameter has exceeded required length.'
  }
  