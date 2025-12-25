import { DocumentAttributes, LocalStorageKeys, Themes, UIRoutes } from '@/shared/constants';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, DOCUMENT, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public uiRoutes = UIRoutes;
  public theme = signal<Themes>(Themes.LIGHT);
  public isDarkMode = computed<boolean>(() => this.theme() === Themes.DARK);
  public faMoon = faMoon;

  private isBrowser: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const savedTheme = localStorage.getItem(LocalStorageKeys.THEME) as Themes;
      if (savedTheme) {
        this.theme.set(savedTheme);
        this.document.documentElement.setAttribute(DocumentAttributes.DATA_THEME, savedTheme);
      }
    }
  }

  public toggleTheme() {
    const next = this.theme() === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    this.theme.set(next);
    localStorage.setItem(LocalStorageKeys.THEME, next);
    document.documentElement.setAttribute(DocumentAttributes.DATA_THEME, next);
  }
}
