import { SearchResultItem } from './search-result-item';

export interface SearchResult {
  count: number;
  items: SearchResultItem[];
}
