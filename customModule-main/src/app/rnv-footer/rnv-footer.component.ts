import { Component, OnDestroy, OnInit } from '@angular/core';

type SupportedLang = 'fr' | 'en' | 'de';

interface FooterLabels {
  networkTitle: string;
  aboutRenouvaud: string;
  mapOfLibraries: string;
  catalogsTitle: string;
  researchHeritageCatalog: string;
  higherEducationLibraries: string;
  copyright: string;
}

const DEFAULT_LANG: SupportedLang = 'fr';

const FOOTER_LABELS: Record<SupportedLang, FooterLabels> = {
  fr: {
    networkTitle: 'Réseau de bibliothèques Renouvaud',
    aboutRenouvaud: 'À propos de Renouvaud',
    mapOfLibraries: 'Carte des bibliothèques Renouvaud',
    catalogsTitle: 'Liens vers d\'autres catalogues',
    researchHeritageCatalog: 'Bibliothèques Sciences et Patrimoines',
    higherEducationLibraries: 'Bibliothèques Gymnases et Ecoles Professionnelles',
    copyright: '© 2026 Renouvaud'
  },
  en: {
    networkTitle: 'Renouvaud libraries network',
    aboutRenouvaud: 'About Renouvaud',
    mapOfLibraries: 'Map of the Renouvaud libraries',
    catalogsTitle: 'Links to other catalogues',
    researchHeritageCatalog: 'Research and Heritage libraries',
    higherEducationLibraries: 'Higher education libraries',
    copyright: '© 2026 Renouvaud'
  },
  de: {
    networkTitle: 'Renouvaud-Bibliotheksnetzwerk',
    aboutRenouvaud: 'Über Renouvaud',
    mapOfLibraries: 'Karte der Renouvaud-Bibliotheken',
    catalogsTitle: 'Links zu anderen Katalogen',
    researchHeritageCatalog: 'Forschungs- und Kulturerbebibliotheken',
    higherEducationLibraries: 'Bibliotheken der Hochschulen',
    copyright: '© 2026 Renouvaud'
  }
};

@Component({
  selector: 'custom-rnv-footer',
  standalone: true,
  imports: [],
  templateUrl: './rnv-footer.component.html'
})
export class RnvFooterComponent implements OnInit, OnDestroy {
  labels: FooterLabels = FOOTER_LABELS[DEFAULT_LANG];

  private langObserver?: MutationObserver;

  ngOnInit(): void {
    this.applyLang(this.detectLang());

    // Primo updates <html lang="..."> when the user switches language via
    // nde-language-selector-container, without a full page reload. Watching
    // it keeps the footer text in sync without polling.
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
    this.labels = FOOTER_LABELS[lang];
  }
}
