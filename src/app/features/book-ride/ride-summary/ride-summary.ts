import { GeoapifyService } from '@/core/services/geoapify.service';
import { GeoPlace, Route } from '@/core/types';
import { Button } from '@/shared/components/button/button';
import { Divider } from '@/shared/directives/divider';
import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ride-summary',
  imports: [FontAwesomeModule, Divider, CurrencyPipe, Button],
  templateUrl: './ride-summary.html',
  styleUrl: './ride-summary.css',
})
export class RideSummary implements OnInit {
  public pickup = signal<GeoPlace | null>(null);
  public drop = signal<GeoPlace | null>(null);
  public rideSummary = signal<Route | null>(null);
  public readonly faLocationDot = faLocationDot;
  public readonly faMapPin = faMapPin;

  public pickupAddress = computed(() => this.pickup()?.formatted ?? '—');
  public dropAddress = computed(() => this.drop()?.formatted ?? '—');
  public distanceKm = computed(() => this.rideSummary()?.summary?.distance_km ?? null);
  public durationMin = computed(() => this.rideSummary()?.summary?.duration_min ?? null);
  public fareAmount = computed(() => {
    const km = this.distanceKm() ?? 0;
    const base = 2.5; // base fare
    const perKm = 1.25; // per km rate
    return km ? (base + km * perKm).toFixed(2) : 0;
  });

  private route = inject(ActivatedRoute);
  private geoapifyService = inject(GeoapifyService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      if (params['pickup']) {
        this.pickup.set(JSON.parse(params['pickup']));
      }

      if (params['drop']) {
        this.drop.set(JSON.parse(params['drop']));
      }

      if (this.pickup() && this.drop()) {
        const route = await this.geoapifyService.getRouteDistance(
          this.pickup() as GeoPlace,
          this.drop() as GeoPlace,
        );

        this.rideSummary.set(route);
      }
    });
  }
}
