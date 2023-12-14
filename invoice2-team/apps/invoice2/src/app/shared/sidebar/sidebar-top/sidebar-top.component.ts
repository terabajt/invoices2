import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'invoice2-team-sidebar-top',
    templateUrl: './sidebar-top.component.html',
    styles: []
})
export class SidebarTopComponent {
    @Output() toggleSidenavEvent = new EventEmitter<void>();

    toggleSidenav() {
        this.toggleSidenavEvent.emit();
    }
}
