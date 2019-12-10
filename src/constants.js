const QUEUE = {
  BULK_INDEXING: 'bulk-indexing',
  FILL_INDEXING: 'fill-indexing',
  FILL_PROCESSING: 'fill-processing',
};

const JOB = {
  BULK_INDEX_FILLS: 'bulk-index-fills',
  FETCH_FILL_STATUS: 'fetch-fill-status',
  INDEX_FILL: 'index-fill',
};

module.exports = { JOB, QUEUE };
