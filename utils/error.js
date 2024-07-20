export const errorHandler=(code,errMessage)=>{
  const error=new Error();
  error.message=errMessage;
  error.statsCode=code;
  return error;
}