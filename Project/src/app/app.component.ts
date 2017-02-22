import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { PhonemeList } from '../pages/PhonemeList/PhonemeList';
import { ProfileSetup } from '../pages/ProfileSetup/ProfileSetup';
import { Goals } from '../pages/Goals/Goals';
import { ListeningMode } from '../pages/ListeningMode/ListeningMode';

@Component({
  templateUrl: 'app.html'
})
export class Phonetics {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = this.selectRoot();

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Lessons', component: PhonemeList },
      { title: 'Edit Profile', component: ProfileSetup},
      { title: 'Practice Goals', component: Goals },
      { title: 'Listening Mode', component: ListeningMode}
    ];

  }

  selectRoot() {
    //testing for now, this should check if profile has been setup 
    //and return ProfileSetup if it has not
    return ProfileSetup;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let params;
    if(page.component == ProfileSetup) {
      let userObj = {
        name: 'Test Name',
        img: '../../assets/images/defaultprofile.png',
        nativeLang: 'Japanese'
      };
      
      params = {
        user: userObj
      };
    } else if(page.component == ListeningMode) {
      let screenUnitsObj: {id: number, word: string, wordOptions: string[], audioPaths: string[]}[] = [
        { id : 0, word: 'rock', wordOptions: ['rock', 'lock'],  audioPaths: ['../../assets/audio/rock.mp3']},
        { id : 0, word: 'lock', wordOptions: ['rock', 'lock'],  audioPaths: ['../../assets/audio/lock.mp3']},
        { id : 0, word: 'rare', wordOptions: ['rare', 'lair'],  audioPaths: ['../../assets/audio/rare.mp3']},
        { id : 0, word: 'lair', wordOptions: ['rare', 'lair'],  audioPaths: ['../../assets/audio/lair.mp3']}
      ];

      params = {
        screenUnits: screenUnitsObj
      };
    }
    this.nav.setRoot(page.component, params);

  }
}
