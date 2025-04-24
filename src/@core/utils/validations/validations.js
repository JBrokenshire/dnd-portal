import {extend} from 'vee-validate'

// eslint-disable-next-line object-curly-newline
import {validatorIsImageFile} from "./validators";

// ////////////////////////////////////////////////////////
// General
// ////////////////////////////////////////////////////////

export const isImageFile = extend('isImageFile', {
  validate: validatorIsImageFile,
  message: 'Only JPG, JPEG, PNG and WEBP files are supported.'
})