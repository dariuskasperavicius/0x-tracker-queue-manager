const QUEUE = {
  BULK_INDEXING: 'bulk-indexing',
  FILL_INDEXING: 'fill-indexing',
  FILL_PROCESSING: 'fill-processing',
};

const JOB = {
  BULK_INDEX_FILLS: 'bulk-index-fills',
  CONVERT_PROTOCOL_FEE: 'convert-protocol-fee',
  FETCH_FILL_STATUS: 'fetch-fill-status',
  INDEX_FILL: 'index-fill',
  INDEX_FILL_PROTOCOL_FEE: 'index-fill-protocol-fee',
  INDEX_FILL_STATUS: 'index-fill-status',
  INDEX_FILL_VALUE: 'index-fill-value',
};

module.exports = { JOB, QUEUE };
