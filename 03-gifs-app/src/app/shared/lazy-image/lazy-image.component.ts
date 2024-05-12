import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit{
  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required')
  }
  @Input()
  public url! : string;

  @Input()
  public alt:string ='';
   hasLoaded : boolean=false;

  onLoad(){
    this.hasLoaded=true;
  }
}
