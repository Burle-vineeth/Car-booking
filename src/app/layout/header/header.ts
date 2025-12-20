import { DocumentAttributes, Themes, UIRoutes } from '@/shared/constants';
import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

  public toggleTheme() {
    const next = this.theme() === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    this.theme.set(next);
    document.documentElement.setAttribute(DocumentAttributes.DATA_THEME, next);
  }
}
