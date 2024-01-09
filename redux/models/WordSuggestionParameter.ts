export interface WordSuggestionParameter {
  dict: string = "devi";
  keyword: string;
}

export interface WordSuggestionResult {
  data: Array<string>;
  status: number;
}
