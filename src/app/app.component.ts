import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from './selector/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TestNgModel';
  public dataModel: string = '';
  public nom: string = '';
  public lstUsers: User[] = [];
  formGroup: FormGroup;
  public lstValues: User[] = [];

  ngOnInit(): void {
    console.log('init app');
    this.lstValues.push(new User({id: '0', nom: 'polo', admin: true}));
    this.lstValues.push(new User({id: '1', nom: 'marco', admin: false}));
    this.lstValues.push(new User({id: '2', nom: 'titi', admin: false}));
    this.lstValues.push(new User({id: '3', nom: 'toto', admin: false}));
    this.lstValues.push(new User({id: '4', nom: 'alpha', admin: false}));
    this.lstValues.push(new User({id: '5', nom: 'bravo', admin: false}));
    this.lstValues.push(new User({id: '6', nom: 'charlie', admin: false}));
    this.lstValues.push(new User({id: '7', nom: 'echo', admin: false}));
    this.lstValues.push(new User({id: '8', nom: 'delta', admin: false}));
    this.formGroup = new FormGroup({
      nom: new FormControl(null, Validators.required),
      lstUser: new FormControl(null, Validators.required),
    });
  }

  public changes() {
    console.log('passe pour changes : ' + this.lstUsers);
  }
}
