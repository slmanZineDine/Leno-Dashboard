function isRTKError(err: any): err is RTKError {
  return err && typeof err === "object" && "status" in err && "data" in err;
}

export default isRTKError;
