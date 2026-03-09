export const getPaginationParams = (req) => {
  const query = req.query;

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  req.body = {...req.body, page, limit, skip}

  return req.body;
};

export const paginationReturn = (data, currentPage, totalItems, totalPages) => {
  return {
    data,
    currentPage,
    totalItems,
    totalPages,
  };
};
