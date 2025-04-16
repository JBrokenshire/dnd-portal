export default {
  /**
     * Build a query string from a filters object using key value pairs
     * */
  buildSearchQueryString(filters) {
    let query = '?';
    for (const key in filters) {
      if (!filters[key]) {
        continue
      }
      if (query.length > 1) {
        query += "&"
      }
      query += `${key}=${filters[key]}`;
    }
    return query;
  },

  getErrorInfo(error) {
    const statusCode = error?.response?.status;
    const msg = error?.response?.data?.error;
    return {
      statusCode,
      msg,
    }
  },

  errorToast(toast, error, customMessage) {
    const {msg} = this.getErrorInfo(error)
    if (msg) {
      toast.error(msg, {
        toastClassName: ['toast-std', 'warning-toast'],
      })
      return msg;
    }

    toast.error(customMessage, {
      toastClassName: ['toast-std', 'warning-toast'],
    })
    return customMessage;
  },

  successToast(toast, customMessage) {
    toast.success(customMessage, {
      toastClassName: ['toast-std', 'success-toast'],
    })
    return customMessage;
  },

};
