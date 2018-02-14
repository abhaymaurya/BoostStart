import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

    breadcrumbs: Array<string>; //the path parts
    breadcrumbsLabels: Array<string>; //the formatted path parts
    breadcrumbsLinks: Array<string>; //dynamically generated links from path parts/components
    lastLinkAt: number; //last link is at position length - 1
    constructor(private router:Router) {
        this.breadcrumbs = router.url.split('/');
        this.breadcrumbsLabels = this.breadcrumbs.map(function(breadcrumb){
            return breadcrumb.charAt(0).toUpperCase() + breadcrumb.substring(1).toLowerCase();
        });
        this.lastLinkAt = this.breadcrumbs.length-1;
        for (let i = 0; i < this.lastLinkAt; i++) {
            if (i==0) {
                this.breadcrumbsLinks = [this.breadcrumbs[i]];
            } else {
                this.breadcrumbsLinks.push( this.breadcrumbsLinks[i-1] + '/' + this.breadcrumbs[i]);
            }
        }
    }

    ngOnInit() {
    }
}
