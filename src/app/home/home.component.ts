import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginSignUpComponent } from '@app/modules/auth/login-sign-up/login-sign-up.component';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isPlaceholder?: boolean;
  placeholderIcon?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(private dialog: MatDialog) { }

  products: Product[] = [
    { id: 1, name: 'Crystal Ball Lamp', price: 799, image: 'assets/images/crystal-ball-lamp.jpg' },
    { id: 2, name: 'Premium Gift Hamper', price: 1199, image: 'assets/images/premium-gift-hamper.jpg' },
    { id: 3, name: 'Personalized Photo Frame', price: 599, image: 'assets/images/personalized-photo-frame.jpg' },
    { id: 4, name: 'Colour Copper Bottle', price: 999, image: 'assets/images/colour-copper-bottle.jpg' },
    { id: 5, name: 'Custom Printed Mug', price: 349, image: 'assets/images/custom-printed-mug.jpg' },
    { id: 6, name: 'Customized Key Chain', price: 199, image: '', isPlaceholder: true, placeholderIcon: '🔑' },
    { id: 7, name: 'Milton Coffee Mug', price: 499, image: '', isPlaceholder: true, placeholderIcon: '☕' },
    { id: 8, name: 'Milton Steel Bottle', price: 649, image: '', isPlaceholder: true, placeholderIcon: '🧪' },
    { id: 9, name: 'Custom Printed T-Shirt', price: 499, image: '', isPlaceholder: true, placeholderIcon: '🎽' },
    { id: 10, name: 'Cello Premium Flask', price: 899, image: '', isPlaceholder: true, placeholderIcon: '🏺' },
    { id: 11, name: 'Copper Bottle (1L)', price: 849, image: '', isPlaceholder: true, placeholderIcon: '🫙' },
    { id: 12, name: 'Coffee Mug', price: 249, image: '', isPlaceholder: true, placeholderIcon: '🥛' },
    { id: 13, name: 'Water Jug', price: 549, image: '', isPlaceholder: true, placeholderIcon: '🫖' }
  ];


openLoginDialog() {
  this.dialog.open(LoginSignUpComponent, {
    width: '95vw',
    maxWidth: '550px',
    panelClass: 'auth-dialog-modal',
    backdropClass: 'custom-blur-backdrop' // This class is critical
  });
}

}