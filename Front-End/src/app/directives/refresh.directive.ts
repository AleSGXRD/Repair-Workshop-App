import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRefresh]'
})
export class RefreshDirective implements OnChanges
{

  @Input() appRefresh! : number;

  constructor(private templeRef : TemplateRef<any>,
      private viewContainerRef : ViewContainerRef)
    {
      this.viewContainerRef.createEmbeddedView(templeRef);
    
    }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appRefresh']&& changes['appRefresh'].previousValue != undefined){
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templeRef);
    }
  }
}
