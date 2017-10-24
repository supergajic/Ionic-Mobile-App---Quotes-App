import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Quote } from "../../data/quote.interface";
import { QuoteService } from '../../services/quotes';
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit{

  quoteGroup: {category: string, quotes: Quote[], icon: string}; 
  
  constructor(private navParams: NavParams, private alertCtrl: AlertController, private quoteService: QuoteService)
  {

  }

  ngOnInit()
  {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorites(selectedQuote: Quote)
  {
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quoteService.addQuoteToFavorites(selectedQuote);
            console.log('Ok');
          }
        },
        {
          text: 'No, I changed my mind',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });

    alert.present();
  }

  onRemoveFromFavorites(selectedQuote: Quote)
  {
    this.quoteService.removeQuoteFromFavorites(selectedQuote);
  }

  isFavorite(quote: Quote)
  {
    return this.quoteService.isQuoteFavorite(quote);
  }

}
