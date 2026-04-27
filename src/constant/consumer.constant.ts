export const ConsumerGroup = {
  purchasedRequest: 'purchased-request-service',
};

export const ConsumerName = {
  purchasedRequestImport: {
    processor: `${ConsumerGroup.purchasedRequest}.import.processor`,
    handleProcessMaterial: `${ConsumerGroup.purchasedRequest}.import.handle-process-material`,
    handleProcessItemLine: `${ConsumerGroup.purchasedRequest}.import.handle-process-item-line`,
  },
};

export const JobName = {
  purchasedRequestImport: {
    processMaterial: `${ConsumerName.purchasedRequestImport.handleProcessMaterial}.job`,
    processItemLine: `${ConsumerName.purchasedRequestImport.handleProcessItemLine}.job`,
  },
};
