// GetList 接口
export interface RequestList {
  mName?: string;
  mTypeID?: number[];
  mCountryID?: number[];
  mLanguageID?: number[];
  mDateYear?: number[];
  mDouBanScore?: number;
  pageNo: number;
  pageSize: number;
}

export interface ResponseListItem {
  mid: number;
  mName: string;
  mPoster: string;
  mTypeName: string;
  mDouBanScore: number;
  mDirector: string;
  mStarring: string;
  mCountryName: string;
  mLanguageName: string;
  mDateYear: number;
  mDate: string;
  mViews: number;
  mLikes: number;
  mCollects: number;
  createTime: string;
  updateTime: string;
}

export interface ResponseList {
  list: ResponseListItem[];
  total: number;
}
