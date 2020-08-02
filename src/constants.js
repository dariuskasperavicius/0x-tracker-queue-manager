const QUEUE = {
  BULK_INDEXING: 'bulk-indexing',
  FILL_INDEXING: 'fill-indexing',
  FILL_PROCESSING: 'fill-processing',
  INDEXING: 'indexing',
  TOKEN_PROCESSING: 'token-processing',
  TRADED_TOKEN_INDEXING: 'traded-token-indexing',
};

const JOB = {
  BULK_INDEX_FILLS: 'bulk-index-fills',
  BULK_INDEX_TRADED_TOKENS: 'bulk-index-traded-tokens',
  BULK_UPDATE_TOKEN_METADATA: 'bulk-update-token-metadata',
  CONVERT_PROTOCOL_FEE: 'convert-protocol-fee',
  FETCH_FILL_STATUS: 'fetch-fill-status',
  FETCH_TOKEN_METADATA: 'fetch-token-metadata',
  INDEX_FILL: 'index-fill',
  INDEX_FILL_PROTOCOL_FEE: 'index-fill-protocol-fee',
  INDEX_FILL_STATUS: 'index-fill-status',
  INDEX_FILL_VALUE: 'index-fill-value',
  INDEX_TRADED_TOKENS: 'index-traded-tokens',
  SCHEDULE_TRADED_TOKENS_BULK_INDEXING: 'schedule-traded-tokens-bulk-indexing',
};

module.exports = { JOB, QUEUE };
