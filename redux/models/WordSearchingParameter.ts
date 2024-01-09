export interface WordSearchingParameter {
  dict: string = "devi";
  lang: string = "vi";
  keyword: string;
}

export interface WordSearchingResult {
  result: Array<WordSearchingDetailResult>;
  key: string;
  found: boolean;
}

export interface WordSearchingDetailResult {
  conjugation: ConjugationResult;
  content: Array<ContentResult>;
  freq: number;
  id: number;
  keyword: string;
  language: string;
  pronounce: PronounceResult;
  snym: Array<SnymResult>;
  topic: string;
  type: string;
  word: string;
  word_family: Array<WordFamilyResult>;
  word_grammar: any;
  _id: string;
}

//conjugation
export interface ConjugationResult {
  gt: ConjugationParamResult;
  si: ConjugationParamResult;
  sn: ConjugationParamResult;
}
export interface ConjugationParamResult {
  p: string;
  w: string;
}

//content
export interface ContentResult {
  kind: string;
  means: Array<ContentMeanResult>;
}
export interface ContentMeanResult {
  mean: string;
  examples: Array<ContentMeanExampleResult>;
}

export interface ContentMeanExampleResult {
  e: string;
  id: number;
  language: string;
  m: string; // meaning
  p: any;
  type: string;
  _id: string;
}

//pronounce

export interface PronounceResult {
  de: string;
}

//snym
export interface SnymResult {
  kind: string;
  content: Array<SnymContentResult>;
}

export interface SnymContentResult {
  syno: Array<string>;
}

//word_family
export interface WordFamilyResult {
  content: Array<string>;
  field: string;
}

//----------------------------------------------------------------
export interface WordConjugationSearchingResult {
  content: WordConjugationDetailSearchingResult;
  type: string;
  word: string;
  _id: string;
}

export interface WordConjugationDetailSearchingResult {
  indikativ: Array<WordConjugationContentDetailSearchingResult>;
  konjunktiv_1: Array<WordConjugationContentDetailSearchingResult>;
  konjunktiv_2: Array<WordConjugationContentDetailSearchingResult>;
}

export interface WordConjugationContentDetailSearchingResult {
  conjugation: Array<TenseConjugationResult>;
  tense: string;
}

export interface TenseConjugationResult {
  c: Array<TenseConjugationDetailsResult>;
  pr: string;
}
export interface TenseConjugationDetailsResult {
  p: string;
  t1: string;
  t2: string;
  t3: string;
  v: string;
}
