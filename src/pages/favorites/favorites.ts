import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Quote } from '../../data/quote.interface';
import { QuoteService } from '../../services/quotes';
import { SettingsService } from '../../services/settings';
import { QuotePage } from '../quote/quote';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})

export class FavoritesPage {
  quotes: Quote[];

  constructor(private quoteService: QuoteService, private modalCtrl: ModalController, private settingsService: SettingsService)
  {

  }

  ionViewWillEnter()
  {
    this.quotes = this.quoteService.getFavoritesQuotes();
  }

  onViewQuote(quote: Quote)
  {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove)
        this.quoteService.removeQuoteFromFavorites(quote);

      this.quotes = this.quoteService.getFavoritesQuotes();
    });
  }

  onRemoveFromFavorites(selectedQuote: Quote)
  {
    this.quoteService.removeQuoteFromFavorites(selectedQuote);
    this.quotes = this.quoteService.getFavoritesQuotes();
  }

  getBackgroundColor()
  {
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

}
