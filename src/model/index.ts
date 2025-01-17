import {
  HeroProps,
  HorizontalNavProps,
  InfoblockProps,
  ShowcaseProps,
  WalkthroughProps,
} from "@pagopa/mui-italia";

import {langCodes} from '../utils/constants';

export interface ILinkData {
  label: string;
  ariaLabel: string;
  href?: string;
}

export interface ILandingComponents {
  hero: HeroProps;
  infoblocks: Array<IInfoblockData>;
  showcases: Array<IShowcaseData>;
  walkthrough: WalkthroughProps;
  horizontalNav?: HorizontalNavProps;
}

export interface IInfoblockData {
  name: string;
  data: InfoblockProps;
}

export interface IShowcaseData {
  name: string;
  data: ShowcaseProps;
}

export interface INavigationBarProps {
  title: string;
  chip: string;
  pf: string;
  pa: string;
  faq: string;
  image: string;
  pi: string;
  numeri: string;
  ritiro: string;
}

/**
 * The description for a FAQ item can be specified by either: a string, an array of strings, or a JSX element.
 * If string, then it will be wrapped into a conveniently styled Box when rendered.
 * If array of strings, each element of the array will be analogously wrapped.
 * If JSX element, then it's rendered without any wrapper.
 *
 * The intent is to simplify the specification of the FAQ content for texts which do not need special styling
 * inside them. E.g. texts including links must be specified as JSX elements. But for straight texts or
 * array of paragraph, a string / array of strings will do.
 *
 * Cfr. the implementation of the FAQ page
 * ----------------------------------------
 * Carlos Lombardi, 2023.04.06
 */
export type FaqDescription = string | Array<string> | JSX.Element;

// An Item is part ...
export interface IFaqDataItem {
  id: string;
  title: string;
  description: FaqDescription;
}

// ... of a Section, which is in turn part ...
export interface IFaqDataSection {
  title: string;
  items: Array<IFaqDataItem>;
}

// ... of the FAQ data structure
export interface IFaqData {
  title: string;
  sections: Array<IFaqDataSection>;
}

export interface IHeadingTitlesData {
  name: string;
  data: IHeadingTitleProps;
}

export interface IHeadingTitleProps {
  title?: string;
  subtitle?: string | JSX.Element;
}

export interface ITabsData {
  name: string;
  data: ITabsProps;
}

export interface ITabsProps {
  tabs: Array<string>;
}

export interface RaddOperator {
  denomination: string;
  city: string;
  address: string;
  province: string;
  cap: string;
  contacts: string;
}

export interface Point {
  descrizione: string;
  città: string;
  via: string;
  provincia: string;
  cap: string;
  telefono: string;
}

export type PaginationData = {
  size: number;
  totalElements: number;
  numOfDisplayedPages: number;
  currentPage: number;
};

export interface MenuItem {
  label: string;
  path: string;
  subMenu?: MenuItem[];
}

// localization //
export type LangCode = typeof langCodes[number];
export interface I18n {
  [key: string]: I18n | string;
}
// ------------ //