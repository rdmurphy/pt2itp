module.exports.bigram = [
  { w1: 'akoko', w2: 'street', frequency: 1, likelihoodRatio: 6.701994141683237 },
  { w1: 'wong', w2: 'ho', frequency: 1, likelihoodRatio: 6.701994141683237 },
  { w1: 'ho', w2: 'lane', frequency: 1, likelihoodRatio: 6.701994141683237 },
  { w1: 'pier', w2: '1', frequency: 1, likelihoodRatio: 6.701994141683237 },
  { w1: 'main', w2: 'st', frequency:1, likelihoodRatio: 3.9294054194434587 },
  { w1: 'fake', w2: 'st', frequency: 1, likelihoodRatio: 3.9294054194434587 }
];

module.exports.bigram_sql = [
  { w1: 'akoko', w2: 'street', frequency: 1, likelihoodRatio: 6.70199414168324 },
  { w1: 'wong', w2: 'ho', frequency: 1, likelihoodRatio: 6.70199414168324 },
  { w1: 'ho', w2: 'lane', frequency: 1, likelihoodRatio: 6.70199414168324 },
  { w1: 'pier', w2: '1', frequency: 1, likelihoodRatio: 6.70199414168324 },
  { w1: 'main', w2: 'st', frequency:1, likelihoodRatio: 3.92940541944346 },
  { w1: 'fake', w2: 'st', frequency: 1, likelihoodRatio: 3.92940541944346 }
];

module.exports.unigram = module.exports.unigram_sql = [
  { word: 'akoko', frequency: 1 },
  { word: 'street',   frequency: 1 },
  { word: 'wong',       frequency: 1 },
  { word: 'ho',   frequency: 1 },
  { word: 'lane',   frequency: 1 },
  { word: 'pier',   frequency: 1 },
  { word: '1',   frequency: 1 },
  { word: 'main',   frequency: 1 },
  { word: 'st',   frequency: 2 },
  { word: 'fake',   frequency: 1  }
];
