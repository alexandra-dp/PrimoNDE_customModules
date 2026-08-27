import { Component, OnDestroy, OnInit } from '@angular/core';

type SupportedLang = 'fr' | 'en' | 'de';

interface BannerLabels {
  intro: string;
  feedbackLinkText: string;
  afterFeedback: string;
  mobileNotice: string;
  goBackPrefix: string;
  catalogLinkText: string;
}

const DEFAULT_LANG: SupportedLang = 'fr';

const CATALOG_BASE_URL = 'https://renouvaud2.primo.exlibrisgroup.com/discovery/search?vid=41BCULAUSA_SCHOOL:BGN_VE';

const BANNER_LABELS: Record<SupportedLang, BannerLabels> = {
  fr: {
    intro: 'Ceci est la nouvelle version bêta du catalogue.',
    feedbackLinkText: 'Vos retours',
    afterFeedback: ' nous aideront à l\'améliorer !',
    mobileNotice: 'Merci de noter que cette interface n\'est pas encore adaptée aux appareils mobiles.',
    goBackPrefix: 'Retour au ',
    catalogLinkText: 'catalogue actuel de la bibliothèque.'
  },
  en: {
    intro: 'This is the new Beta version of your library catalogue.',
    feedbackLinkText: 'Your feedback',
    afterFeedback: ' will help us to improve it!',
    mobileNotice: 'Please note this interface is not yet adapted to mobile devices.',
    goBackPrefix: 'Go back to the ',
    catalogLinkText: 'current catalogue.'
  },
  de: {
    intro: 'Dies ist die neue Beta-Version Ihres Bibliothekskatalogs.',
    feedbackLinkText: 'Ihr Feedback',
    afterFeedback: ' hilft uns, sie zu verbessern!',
    mobileNotice: 'Bitte beachten Sie, dass diese Benutzeroberfläche noch nicht für mobile Geräte optimiert ist.',
    goBackPrefix: 'Zurück zum ',
    catalogLinkText: 'aktuellen Bibliothekskatalog.'
  }
};

@Component({
  selector: 'custom-top-banner',
  standalone: true,
  imports: [],
  templateUrl: './rnv-top-banner.component.html',
  styleUrl: './rnv-top-banner.component.scss'
})
export class RnvTopBannerComponent implements OnInit, OnDestroy {
  labels: BannerLabels = BANNER_LABELS[DEFAULT_LANG];
  catalogUrl = `${CATALOG_BASE_URL}&lang=${DEFAULT_LANG}`;

  private langObserver?: MutationObserver;

  ngOnInit(): void {
    this.applyLang(this.detectLang());

    // Primo updates <html lang="..."> when the user switches language via
    // nde-language-selector-container, without a full page reload. Watching
    // it keeps the banner text (and the catalogue link's lang param) in sync.
    this.langObserver = new MutationObserver(() => this.applyLang(this.detectLang()));
    this.langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  }

  ngOnDestroy(): void {
    this.langObserver?.disconnect();
  }

  private detectLang(): SupportedLang {
    const htmlLang = document.documentElement.lang?.toLowerCase().slice(0, 2);
    if (this.isSupported(htmlLang)) {
      return htmlLang;
    }

    const urlLang = new URLSearchParams(window.location.search).get('lang')?.toLowerCase();
    if (this.isSupported(urlLang)) {
      return urlLang;
    }

    return DEFAULT_LANG;
  }

  private isSupported(lang: string | null | undefined): lang is SupportedLang {
    return lang === 'fr' || lang === 'en' || lang === 'de';
  }

  private applyLang(lang: SupportedLang): void {
    this.labels = BANNER_LABELS[lang];
    this.catalogUrl = `${CATALOG_BASE_URL}&lang=${lang}`;
  }
}
