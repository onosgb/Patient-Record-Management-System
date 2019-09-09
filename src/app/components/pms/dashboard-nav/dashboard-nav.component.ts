
// import { LoginService } from './../registration/services/login.service';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
// import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { MatSidenav } from '@angular/material';
// import { SubscriberService } from '../registration/services/subscriber.service';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent {
  userid: any;
  constructor(
    mediaObserver: MediaObserver,
    //  private _loadingBar: NgxSpinnerService,
// tslint:disable-next-line: variable-name
    private _router: Router,
    // private loginservice: LoginService,
    // private spinner: NgxSpinnerService,
    // private subscriberservice: SubscriberService,
   // private _auth: AuthService
  ) {
// tslint:disable-next-line: deprecation
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias === 'sm' || change.mqAlias === 'xs') {

        this.opened = false;
        this.over = 'over';

        this._router.events.subscribe((event: Event) => {
          this.navigationInterceptor(event);
        });
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });


  }
  SubscriberId = '';
  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  subscriber: any;
  subscribers: any;
  // overlap = false;
  watcher: Subscription;
  activeMediaQuery = '';
  title = 'app';
  menus: Array<any> = [];
  subMenus: Array<any> = [];
  collapseTwo = false;
 // @Input() sidenav: MatSidenav;
 @ViewChild('sideNav') sidenav: MatSidenav;
// tslint:disable-next-line: no-output-on-prefix
  @Output() onClose = new EventEmitter<any>();
  payload: any;

  appitems = [

    {
        label: 'Item 2',
        icon: 'alarm',
        role: 'Staff',
        items: [
        {
            label: 'Item 2.1',
            link: '/item-2-1',
            icon: 'favorite'
        },
        {
            label: 'Item 2.2',
            link: '/item-2-2',
            icon: 'favorite_border'
        }
        ]
    },
    {
        label: 'Item 3',
        icon: 'offline_pin',
        role: 'Staff',
        onSelected() {
            // console.log('Item 3');
        }
    },
    {
        label: 'Item 4',
        link: '/item-4',
        icon: 'star_rate',
        role: 'Staff',
        hidden: false
    }
];


  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: 'my-custom-class',
    // listBackgroundColor: `#141E30`,
     fontColor: `rgb(170, 170, 170)`,
   // backgroundColor: `#141E30`,
    selectedListFontColor: `white`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    rtlLayout: false
};

menu1() {
  this.collapseTwo = true;
}

  logOut(data) {
    localStorage.clear();
    this._router.navigate(['/pms/login']);
  }


  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      // this._loadingBar.show();
    }
    if (event instanceof NavigationEnd) {
      // this._loadingBar.show();
    }
    if (event instanceof NavigationCancel) {
      // this._loadingBar.hide();
    }
    if (event instanceof NavigationError) {
      // this._loadingBar.hide();
    }
  }

  getuser() {
  this.userid = localStorage.getItem('userid');
  if (!this.userid) {
    this._router.navigate(['/']);
  }

  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    // this.spinner.show();
    this.getuser();
    // this.getSubscriber();
  }

}
