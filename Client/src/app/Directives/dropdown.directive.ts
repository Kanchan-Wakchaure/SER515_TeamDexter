import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen: boolean = false;
    

    @HostListener('click') toogleOpen() {
        console.log("herre");
        this.isOpen = !this.isOpen;
    }
}