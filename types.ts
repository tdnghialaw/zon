export enum CaseQuality {
  GOOD = 'Tốt',
  FAIR = 'Khá',
}

export interface Case {
  id: string;
  caseName: string;
  fileCode: string;
  legalAidProvider: string;
  successCriterion: string;
  quality: CaseQuality;
  notes?: string;
  submissionDate: Date;
}